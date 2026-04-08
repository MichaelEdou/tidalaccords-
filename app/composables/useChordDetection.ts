export interface ChordEvent {
  time: number      // start time in seconds
  duration: number  // duration in seconds
  chord: string     // chord name e.g. "C", "Am", "F#m7"
}

export interface BeatEvent {
  time: number
  position: number  // beat position in bar (1-based)
}

export interface ChordDetectionResult {
  chords: ChordEvent[]
  beats: BeatEvent[]
  key: string
  bpm: number
  timeSignature: string
  duration: number
}

type DetectionStatus = 'idle' | 'submitting' | 'processing' | 'done' | 'error'

const detectionResult = ref<ChordDetectionResult | null>(null)
const detectionStatus = ref<DetectionStatus>('idle')
const detectionError = ref<string | null>(null)

let pollTimer: ReturnType<typeof setInterval> | null = null

export function useChordDetection() {
  async function detectChords(youtubeUrl: string) {
    // Generate audioId from URL
    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      detectionError.value = 'Invalid YouTube URL'
      detectionStatus.value = 'error'
      return
    }

    const audioId = `yt-${videoId}`
    detectionStatus.value = 'submitting'
    detectionError.value = null
    detectionResult.value = null

    try {
      const response = await $fetch('/api/chord-detect', {
        method: 'POST',
        body: { audioUrl: youtubeUrl, audioId },
      })

      const data = response as any

      if (data.status === 'processing') {
        detectionStatus.value = 'processing'
        startPolling(audioId)
      } else if (data.chords || data.key) {
        // Results returned immediately (cached)
        detectionResult.value = parseResult(data)
        detectionStatus.value = 'done'
      } else {
        detectionStatus.value = 'processing'
        startPolling(audioId)
      }
    } catch (err: any) {
      detectionError.value = err.message || 'Failed to submit for detection'
      detectionStatus.value = 'error'
    }
  }

  function startPolling(audioId: string) {
    stopPolling()
    let attempts = 0
    const maxAttempts = 60 // 5 minutes at 5s intervals

    pollTimer = setInterval(async () => {
      attempts++
      if (attempts > maxAttempts) {
        stopPolling()
        detectionError.value = 'Detection timed out. The audio may be too long or the server is busy.'
        detectionStatus.value = 'error'
        return
      }

      try {
        const response = await $fetch(`/api/chord-status?audioId=${audioId}`)
        const data = response as any

        if (data.status === 'processing') {
          // Still processing, keep polling
          return
        }

        if (data.chords || data.key || data.beats) {
          // Got results
          detectionResult.value = parseResult(data)
          detectionStatus.value = 'done'
          stopPolling()
        }
      } catch {
        // Network error, keep trying
      }
    }, 5000)
  }

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  function reset() {
    stopPolling()
    detectionResult.value = null
    detectionStatus.value = 'idle'
    detectionError.value = null
  }

  function parseResult(data: any): ChordDetectionResult {
    return {
      chords: (data.chords || []).map((c: any) => ({
        time: c.time ?? c.start ?? 0,
        duration: c.duration ?? c.end ? (c.end - (c.time ?? c.start ?? 0)) : 2,
        chord: c.chord ?? c.label ?? 'N',
      })),
      beats: (data.beats || []).map((b: any) => ({
        time: b.time ?? b,
        position: b.position ?? 1,
      })),
      key: data.key ?? 'C',
      bpm: data.bpm ?? data.tempo ?? 120,
      timeSignature: data.timeSignature ?? data.time_signature ?? '4/4',
      duration: data.duration ?? 0,
    }
  }

  function extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/, // bare video ID
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  // Use mock data for demo when API returns processing too long
  function useMockData() {
    detectionResult.value = {
      chords: [
        { time: 0, duration: 3.33, chord: 'C' },
        { time: 3.33, duration: 3.33, chord: 'G' },
        { time: 6.66, duration: 3.33, chord: 'Am' },
        { time: 10, duration: 3.33, chord: 'F' },
        { time: 13.33, duration: 3.33, chord: 'C' },
        { time: 16.66, duration: 3.33, chord: 'G' },
        { time: 20, duration: 3.33, chord: 'Am' },
        { time: 23.33, duration: 3.33, chord: 'F' },
        { time: 26.66, duration: 3.33, chord: 'Am' },
        { time: 30, duration: 3.33, chord: 'F' },
        { time: 33.33, duration: 3.33, chord: 'C' },
        { time: 36.66, duration: 3.33, chord: 'G' },
        { time: 40, duration: 3.33, chord: 'Am' },
        { time: 43.33, duration: 3.33, chord: 'F' },
        { time: 46.66, duration: 3.33, chord: 'C' },
        { time: 50, duration: 3.33, chord: 'G' },
        { time: 53.33, duration: 3.33, chord: 'C' },
        { time: 56.66, duration: 3.33, chord: 'G' },
        { time: 60, duration: 3.33, chord: 'Am' },
        { time: 63.33, duration: 3.33, chord: 'F' },
        { time: 66.66, duration: 3.33, chord: 'F' },
        { time: 70, duration: 3.33, chord: 'Am' },
        { time: 73.33, duration: 3.33, chord: 'G' },
        { time: 76.66, duration: 3.33, chord: 'C' },
        { time: 80, duration: 3.33, chord: 'F' },
        { time: 83.33, duration: 3.33, chord: 'Am' },
        { time: 86.66, duration: 3.33, chord: 'G' },
        { time: 90, duration: 3.33, chord: 'C' },
        { time: 93.33, duration: 3.33, chord: 'Am' },
        { time: 96.66, duration: 3.33, chord: 'F' },
        { time: 100, duration: 3.33, chord: 'C' },
        { time: 103.33, duration: 3.33, chord: 'G' },
        { time: 106.66, duration: 3.33, chord: 'Am' },
        { time: 110, duration: 3.33, chord: 'F' },
        { time: 113.33, duration: 3.33, chord: 'C' },
        { time: 116.66, duration: 3.33, chord: 'G' },
        { time: 120, duration: 3.33, chord: 'F' },
        { time: 123.33, duration: 3.33, chord: 'C' },
      ],
      beats: [],
      key: 'C',
      bpm: 72,
      timeSignature: '4/4',
      duration: 230,
    }
    detectionStatus.value = 'done'
  }

  return {
    detectionResult: readonly(detectionResult),
    detectionStatus: readonly(detectionStatus),
    detectionError: readonly(detectionError),
    detectChords,
    reset,
    useMockData,
  }
}
