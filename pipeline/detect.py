"""
PhinAccords Full Chord Detection Pipeline
==========================================
GPU-accelerated multi-model chord detection on RTX 3060.

Pipeline:
1. Download audio (yt-dlp)
2. Demucs stem separation (GPU ~20-30s)
3. madmom CNN chord detection on clean stem
4. CREMA chord detection (second opinion)
5. Ensemble merge (majority vote where models agree)
6. Music theory post-processing (key correction, voice leading)
7. Beat/tempo/key detection
8. Push to MongoDB
9. Output JSON for Nuxt frontend

Usage:
  python pipeline/detect.py --url "Sc6SSHuZvQE" --title "Reckless Love" --artist "Cory Asbury"
  python pipeline/detect.py --batch pipeline/songs.json
  python pipeline/detect.py --serve  (start FastAPI server for Nuxt)
"""

import argparse
import json
import os
import sys
import time
import shutil
import subprocess
import traceback
import re
from pathlib import Path
from typing import Optional

import numpy as np
# Fix madmom numpy compatibility (np.int removed in numpy 1.24+)
if not hasattr(np, 'int'):
    np.int = int
    np.float = float
    np.complex = complex
    np.bool = bool

import librosa

SCRIPT_DIR = Path(__file__).parent
TEMP_DIR = SCRIPT_DIR / "temp"
OUTPUT_DIR = SCRIPT_DIR / "output"
TEMP_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

# MongoDB connection string from .env
MONGODB_URI = os.getenv(
    "MONGODB_URI",
    "mongodb+srv://heavenkeys2022_db_user:WpdNq6xxZPwHSghN@cluster0.rjbgwu1.mongodb.net/youtube-clone?appName=Cluster0"
)

# ================================================================
# STAGE 1: YouTube Download
# ================================================================

def extract_video_id(url: str) -> str:
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})',
        r'^([a-zA-Z0-9_-]{11})$',
    ]
    for p in patterns:
        m = re.search(p, url)
        if m:
            return m.group(1)
    return url


def download_audio(video_id: str) -> Path:
    output_path = TEMP_DIR / f"{video_id}.wav"
    if output_path.exists():
        print(f"  [cache] Audio cached: {output_path.name}")
        return output_path

    print(f"  [download] Downloading {video_id}...")
    cmd = [
        "yt-dlp", "-x", "--audio-format", "wav", "--audio-quality", "0",
        "--no-playlist", "--no-warnings",
        "-o", str(TEMP_DIR / f"{video_id}.%(ext)s"),
        f"https://www.youtube.com/watch?v={video_id}",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)

    if not output_path.exists():
        # Convert if needed
        for ext in ['webm', 'opus', 'm4a', 'mp3', 'ogg']:
            alt = TEMP_DIR / f"{video_id}.{ext}"
            if alt.exists():
                subprocess.run([
                    "ffmpeg", "-y", "-i", str(alt), "-ar", "44100", "-ac", "1", str(output_path)
                ], capture_output=True, timeout=120)
                alt.unlink()
                break

    if not output_path.exists():
        raise RuntimeError(f"Download failed for {video_id}: {result.stderr[:300]}")

    print(f"  [download] Done")
    return output_path


# ================================================================
# STAGE 2: Demucs Stem Separation (GPU)
# ================================================================

def separate_stems(audio_path: Path, video_id: str) -> Path:
    import torch
    no_vocals_path = TEMP_DIR / "stems" / video_id / "no_vocals.wav"

    if no_vocals_path.exists():
        print(f"  [cache] Stems cached")
        return no_vocals_path

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"  [demucs] Separating stems on {device}...")
    start = time.time()

    out_dir = TEMP_DIR / "stems"
    out_dir.mkdir(exist_ok=True)

    cmd = [
        sys.executable, "-m", "demucs",
        "--two-stems", "vocals",
        "-n", "htdemucs",
        "--device", device,
        "-o", str(out_dir),
        str(audio_path),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=600)

    # Find the output
    htdemucs_dir = out_dir / "htdemucs"
    if htdemucs_dir.exists():
        for d in htdemucs_dir.iterdir():
            if d.is_dir():
                nv = d / "no_vocals.wav"
                if nv.exists():
                    target_dir = TEMP_DIR / "stems" / video_id
                    target_dir.mkdir(parents=True, exist_ok=True)
                    target = target_dir / "no_vocals.wav"
                    shutil.copy2(str(nv), str(target))
                    # Cleanup demucs output
                    shutil.rmtree(str(htdemucs_dir), ignore_errors=True)
                    print(f"  [demucs] Done in {time.time()-start:.1f}s")
                    return target

    print(f"  [demucs] WARN: Separation failed, using original")
    return audio_path


# ================================================================
# STAGE 3: madmom Chord Detection
# ================================================================

def detect_chords_madmom(audio_path: Path) -> list:
    from madmom.features.chords import CNNChordFeatureProcessor, CRFChordRecognitionProcessor

    print(f"  [madmom] Detecting chords...")
    start = time.time()

    feat = CNNChordFeatureProcessor()
    features = feat(str(audio_path))

    decode = CRFChordRecognitionProcessor()
    raw = decode(features)

    chords = []
    for row in raw:
        s, e, label = float(row[0]), float(row[1]), str(row[2])
        if label in ('N', 'X'):
            label = 'N'
        chords.append({'start': round(s, 3), 'end': round(e, 3), 'chord': label})

    print(f"  [madmom] {len(chords)} segments in {time.time()-start:.1f}s")
    return chords


# ================================================================
# STAGE 4: CREMA Chord Detection (Second Model)
# ================================================================

def detect_chords_crema(audio_path: Path) -> list:
    try:
        import crema
        print(f"  [crema] Detecting chords (second model)...")
        start = time.time()

        model = crema.models.chord.ChordModel()
        data = crema.analyze(filename=str(audio_path))
        raw = model.outputs(data)

        # CREMA returns chord_pitch probabilities — decode them
        jam = model.transform(data)
        ann = jam.annotations[0] if jam.annotations else None

        chords = []
        if ann:
            for obs in ann.data:
                chord = obs.value
                if chord in ('N', 'X', ''):
                    chord = 'N'
                chords.append({
                    'start': round(obs.time, 3),
                    'end': round(obs.time + obs.duration, 3),
                    'chord': chord,
                })

        print(f"  [crema] {len(chords)} segments in {time.time()-start:.1f}s")
        return chords
    except Exception as e:
        print(f"  [crema] WARN: Failed ({e}), skipping")
        return []


# ================================================================
# STAGE 5: Ensemble Merge
# ================================================================

def ensemble_chords(madmom_chords: list, crema_chords: list, duration: float) -> list:
    """Merge two chord streams by time-slicing and majority vote."""
    if not crema_chords:
        return madmom_chords  # Fallback to single model

    print(f"  [ensemble] Merging madmom ({len(madmom_chords)}) + crema ({len(crema_chords)})...")

    # Sample at 10Hz (every 100ms)
    step = 0.1
    times = np.arange(0, duration, step)
    merged = []

    def chord_at_time(chords, t):
        for c in chords:
            if c['start'] <= t < c['end']:
                return c['chord']
        return 'N'

    def normalize_chord(chord):
        """Normalize chord names for comparison."""
        chord = chord.replace(':maj', '').replace(':min', 'm').replace(':7', '7')
        chord = chord.replace('Db', 'C#').replace('Eb', 'D#').replace('Gb', 'F#')
        chord = chord.replace('Ab', 'G#').replace('Bb', 'A#')
        # Remove bass note (slash chords)
        if '/' in chord:
            chord = chord.split('/')[0]
        return chord

    prev_chord = 'N'
    seg_start = 0.0

    for i, t in enumerate(times):
        m = normalize_chord(chord_at_time(madmom_chords, t))
        c = normalize_chord(chord_at_time(crema_chords, t))

        # Majority vote: prefer agreement, otherwise trust madmom
        if m == c:
            current = m
        elif m != 'N' and c == 'N':
            current = m
        elif m == 'N' and c != 'N':
            current = c
        else:
            current = m  # Default to madmom when they disagree

        if current != prev_chord:
            if prev_chord != 'N' or len(merged) == 0:
                merged.append({
                    'start': round(seg_start, 3),
                    'end': round(t, 3),
                    'chord': prev_chord,
                })
            seg_start = t
            prev_chord = current

    # Final segment
    if prev_chord:
        merged.append({
            'start': round(seg_start, 3),
            'end': round(duration, 3),
            'chord': prev_chord,
        })

    # Filter out very short segments (< 0.3s) and 'N' segments
    merged = [c for c in merged if c['end'] - c['start'] >= 0.3]

    print(f"  [ensemble] Merged to {len(merged)} segments")
    return merged


# ================================================================
# STAGE 6: Music Theory Post-Processing
# ================================================================

NOTE_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

# Diatonic chords per major key
MAJOR_DIATONIC = {
    'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
    'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
    'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
    'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
    'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
    'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
    'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'],
    'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'],
}

def get_chord_root(chord: str) -> str:
    m = re.match(r'^([A-G][#b]?)', chord)
    return m.group(1) if m else chord

def theory_postprocess(chords: list, key: str) -> list:
    """Apply music theory corrections."""
    print(f"  [theory] Post-processing in key of {key}...")

    # Get diatonic chords for this key
    key_root = key.replace('m', '')
    diatonic_roots = set()
    if key_root in MAJOR_DIATONIC:
        for ch in MAJOR_DIATONIC[key_root]:
            diatonic_roots.add(get_chord_root(ch))

    corrected = 0
    for c in chords:
        chord = c['chord']
        if chord == 'N':
            continue

        root = get_chord_root(chord)

        # Correct common enharmonic issues to match key
        # e.g., in key of C, prefer Bb over A#
        enharmonic_map = {
            'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
            'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        }
        if root in enharmonic_map:
            alt = enharmonic_map[root]
            if alt in diatonic_roots and root not in diatonic_roots:
                c['chord'] = chord.replace(root, alt, 1)
                corrected += 1

    print(f"  [theory] Corrected {corrected} enharmonic spellings")
    return chords


# ================================================================
# STAGE 7: Beat/Tempo/Key Detection
# ================================================================

def detect_beats(audio_path: Path) -> dict:
    from madmom.features.beats import DBNBeatTrackingProcessor, RNNBeatProcessor
    from madmom.features.tempo import TempoEstimationProcessor

    print(f"  [beats] Detecting beats/tempo...")
    start = time.time()

    proc = RNNBeatProcessor()
    act = proc(str(audio_path))

    beat_decode = DBNBeatTrackingProcessor(fps=100)
    beats = beat_decode(act).tolist()

    tempo_proc = TempoEstimationProcessor(fps=100)
    tempos = tempo_proc(act)
    bpm = float(tempos[0][0]) if len(tempos) > 0 else 120.0

    print(f"  [beats] BPM: {bpm:.1f}, {len(beats)} beats in {time.time()-start:.1f}s")
    return {'bpm': round(bpm, 1), 'beats': [round(b, 3) for b in beats]}


def detect_key(audio_path: Path) -> str:
    print(f"  [key] Detecting key...")
    y, sr = librosa.load(str(audio_path), sr=22050, mono=True, duration=120)
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    chroma_avg = np.mean(chroma, axis=1)

    major_profile = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
    minor_profile = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])

    best_corr = -1
    best_key = 'C'
    for i in range(12):
        rolled = np.roll(chroma_avg, -i)
        maj_corr = np.corrcoef(rolled, major_profile)[0, 1]
        min_corr = np.corrcoef(rolled, minor_profile)[0, 1]
        if maj_corr > best_corr:
            best_corr = maj_corr
            best_key = NOTE_NAMES[i]
        if min_corr > best_corr:
            best_corr = min_corr
            best_key = f"{NOTE_NAMES[i]}m"

    print(f"  [key] Key: {best_key}")
    return best_key


# ================================================================
# STAGE 8: Chord-to-Section Segmentation
# ================================================================

def chords_to_sections(chords: list, beats: list, bpm: float) -> list:
    """Convert raw chord timeline into bar-based sections for the UI."""
    if not chords:
        return []

    bar_duration = 4 * (60.0 / bpm) if bpm > 0 else 3.33
    total_duration = chords[-1]['end'] if chords else 0
    num_bars = int(total_duration / bar_duration) + 1

    # Assign a chord to each bar
    bar_chords = []
    for bar_idx in range(num_bars):
        bar_start = bar_idx * bar_duration
        bar_mid = bar_start + bar_duration / 2

        # Find chord at bar midpoint
        chord = 'N'
        for c in chords:
            if c['start'] <= bar_mid < c['end']:
                chord = c['chord']
                break
        bar_chords.append(chord)

    # Filter out 'N' chords — replace with previous chord
    for i in range(len(bar_chords)):
        if bar_chords[i] == 'N' and i > 0:
            bar_chords[i] = bar_chords[i - 1]

    # Auto-detect sections by looking at chord pattern repetitions
    sections = []
    section_size = 8  # Default: 8 bars per section
    section_num = 1

    for i in range(0, len(bar_chords), section_size):
        chunk = bar_chords[i:i + section_size]
        if len(chunk) < 2:
            continue

        # Simple section naming heuristic
        if i == 0:
            name = "INTRO"
        elif i >= len(bar_chords) - section_size:
            name = "OUTRO"
        else:
            name = f"SECTION {section_num}"
            section_num += 1

        sections.append({'section': name, 'chords': chunk})

    return sections


# ================================================================
# STAGE 9: MongoDB Push
# ================================================================

def push_to_mongodb(result: dict):
    """Push detection results to MongoDB."""
    try:
        from pymongo import MongoClient
        print(f"  [mongodb] Pushing to database...")

        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        db = client.get_database()
        collection = db['chord_detections']

        # Upsert by videoId
        collection.update_one(
            {'videoId': result['videoId']},
            {'$set': result},
            upsert=True,
        )
        print(f"  [mongodb] Saved to chord_detections collection")
        client.close()
    except Exception as e:
        print(f"  [mongodb] WARN: Push failed ({e})")


# ================================================================
# MAIN PIPELINE
# ================================================================

def process_song(video_id: str, title: str = "", artist: str = "",
                 skip_demucs: bool = False, skip_crema: bool = False,
                 push_db: bool = True) -> dict:
    print(f"\n{'='*60}")
    print(f"  {title or video_id} {'— ' + artist if artist else ''}")
    print(f"{'='*60}")

    total_start = time.time()

    try:
        # 1. Download
        audio_path = download_audio(video_id)

        # 2. Demucs
        if skip_demucs:
            clean_audio = audio_path
        else:
            clean_audio = separate_stems(audio_path, video_id)

        # 3. Duration
        y, sr = librosa.load(str(audio_path), sr=22050, mono=True)
        duration = librosa.get_duration(y=y, sr=sr)
        dur_min = int(duration // 60)
        dur_sec = int(duration % 60)

        # 4. madmom chords
        madmom_chords = detect_chords_madmom(clean_audio)

        # 5. CREMA chords
        crema_chords = [] if skip_crema else detect_chords_crema(clean_audio)

        # 6. Ensemble merge
        chords = ensemble_chords(madmom_chords, crema_chords, duration)

        # 7. Beat/tempo
        beat_data = detect_beats(clean_audio)

        # 8. Key
        key = detect_key(clean_audio)

        # 9. Music theory post-processing
        chords = theory_postprocess(chords, key)

        # 10. Convert to sections for UI
        sections = chords_to_sections(chords, beat_data['beats'], beat_data['bpm'])

        elapsed = time.time() - total_start

        result = {
            'videoId': video_id,
            'title': title,
            'artist': artist,
            'key': key,
            'bpm': beat_data['bpm'],
            'duration': round(duration, 2),
            'durationFormatted': f"{dur_min}:{dur_sec:02d}",
            'timeSignature': '4/4',
            'chords': chords,  # Raw timeline
            'sections': sections,  # Bar-based for UI
            'beats': beat_data['beats'][:200],  # Limit to first 200 beats
            'processingTime': round(elapsed, 1),
            'status': 'ready',
            'pipeline': 'demucs+madmom+crema+theory',
            'models': ['madmom-cnn-crf'] + (['crema-0.2'] if crema_chords else []),
        }

        # Save JSON
        out = OUTPUT_DIR / f"{video_id}.json"
        with open(out, 'w') as f:
            json.dump(result, f, indent=2)

        # Push to MongoDB
        if push_db:
            push_to_mongodb(result)

        print(f"\n  DONE in {elapsed:.1f}s — Key: {key}, BPM: {beat_data['bpm']}, "
              f"{len(chords)} chords, {len(sections)} sections")
        return result

    except Exception as e:
        elapsed = time.time() - total_start
        print(f"\n  ERROR after {elapsed:.1f}s: {e}")
        traceback.print_exc()
        return {'videoId': video_id, 'title': title, 'artist': artist,
                'status': 'error', 'error': str(e)}


def cleanup(video_id: str):
    for p in [TEMP_DIR / f"{video_id}.wav"]:
        if p.exists():
            p.unlink()
    stems = TEMP_DIR / "stems" / video_id
    if stems.exists():
        shutil.rmtree(stems, ignore_errors=True)


def process_batch(songs_file: str, skip_demucs=False, skip_crema=False, push_db=True):
    with open(songs_file) as f:
        songs = json.load(f)

    total = len(songs)
    success = 0
    failed = 0
    skipped = 0

    print(f"\nBATCH: {total} songs")
    print(f"{'='*60}")

    for i, song in enumerate(songs):
        vid = extract_video_id(song.get('url', song.get('youtubeId', '')))
        title = song.get('title', '')
        artist = song.get('artist', '')

        # Skip if already processed
        out = OUTPUT_DIR / f"{vid}.json"
        if out.exists():
            try:
                with open(out) as f:
                    data = json.load(f)
                if data.get('status') == 'ready':
                    print(f"\n[{i+1}/{total}] SKIP: {title} (already done)")
                    skipped += 1
                    continue
            except:
                pass

        print(f"\n[{i+1}/{total}]", end="")
        result = process_song(vid, title, artist, skip_demucs, skip_crema, push_db)

        if result.get('status') == 'ready':
            success += 1
        else:
            failed += 1

        cleanup(vid)

    print(f"\n{'='*60}")
    print(f"BATCH DONE: {success} ok, {failed} failed, {skipped} skipped / {total} total")
    print(f"Results in: {OUTPUT_DIR}")


# ================================================================
# FastAPI Server (for Nuxt integration)
# ================================================================

def start_server(port: int = 5200):
    """Start FastAPI server to serve chord detection results to Nuxt."""
    from fastapi import FastAPI, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    import uvicorn

    app = FastAPI(title="PhinAccords Chord API")
    app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

    @app.get("/")
    def health():
        outputs = list(OUTPUT_DIR.glob("*.json"))
        return {"status": "ok", "pipeline": "demucs+madmom+crema+theory", "songs_processed": len(outputs)}

    @app.get("/song/{video_id}")
    def get_song(video_id: str):
        path = OUTPUT_DIR / f"{video_id}.json"
        if not path.exists():
            raise HTTPException(404, f"Song {video_id} not processed yet")
        with open(path) as f:
            return json.load(f)

    @app.get("/songs")
    def list_songs():
        songs = []
        for f in OUTPUT_DIR.glob("*.json"):
            if f.name == "batch_results.json":
                continue
            try:
                with open(f) as fh:
                    data = json.load(fh)
                songs.append({
                    'videoId': data.get('videoId'),
                    'title': data.get('title'),
                    'artist': data.get('artist'),
                    'key': data.get('key'),
                    'bpm': data.get('bpm'),
                    'status': data.get('status'),
                })
            except:
                pass
        return songs

    @app.post("/detect")
    def detect(body: dict):
        vid = extract_video_id(body.get('url', body.get('youtubeId', '')))
        title = body.get('title', '')
        artist = body.get('artist', '')
        if not vid:
            raise HTTPException(400, "url or youtubeId required")

        # Check if already processed
        path = OUTPUT_DIR / f"{vid}.json"
        if path.exists():
            with open(path) as f:
                return json.load(f)

        # Process synchronously (for single song requests)
        result = process_song(vid, title, artist)
        cleanup(vid)
        return result

    print(f"Starting chord API server on http://localhost:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)


# ================================================================
# CLI
# ================================================================

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='PhinAccords Chord Detection Pipeline')
    parser.add_argument('--url', help='YouTube URL or video ID')
    parser.add_argument('--title', default='')
    parser.add_argument('--artist', default='')
    parser.add_argument('--batch', help='Batch JSON file')
    parser.add_argument('--serve', action='store_true', help='Start FastAPI server')
    parser.add_argument('--port', type=int, default=5200)
    parser.add_argument('--no-demucs', action='store_true', help='Skip Demucs')
    parser.add_argument('--no-crema', action='store_true', help='Skip CREMA')
    parser.add_argument('--no-db', action='store_true', help='Skip MongoDB push')
    parser.add_argument('--cleanup', action='store_true')

    args = parser.parse_args()

    if args.serve:
        start_server(args.port)
    elif args.batch:
        process_batch(args.batch, args.no_demucs, args.no_crema, not args.no_db)
    elif args.url:
        vid = extract_video_id(args.url)
        result = process_song(vid, args.title, args.artist, args.no_demucs, args.no_crema, not args.no_db)
        if args.cleanup:
            cleanup(vid)
    else:
        parser.print_help()
