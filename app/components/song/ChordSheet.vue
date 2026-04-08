<template>
  <div class="sheet-card surface">
    <div class="sheet-header">
      <div class="sheet-title-wrap">
        <h2 class="sheet-title">Chord progression</h2>
        <div class="sheet-sub">
          {{ song ? `${song.title} — ${song.artist} • Key of ${song.originalKey} • ${song.bpm} BPM` : '' }}
        </div>
      </div>
    </div>

    <div class="progression-hscroll" ref="scrollContainer">
      <div class="progression-hscroll-track">
        <div
          v-for="(chord, idx) in displayChords"
          :key="idx"
          :ref="el => setChordRef(el as HTMLElement, idx)"
          class="measure-box"
        >
          <div
            class="measure-beat measure-beat-chord"
            :class="{ 'beat-on': globalMeasure === idx && globalBeatInMeasure === 0 }"
          >{{ chord.chord }}</div>
          <div
            class="measure-beat measure-beat-empty"
            :class="{ 'beat-on': globalMeasure === idx && globalBeatInMeasure === 1 }"
          ><div class="beat-dot-center"></div></div>
          <div
            class="measure-beat measure-beat-empty"
            :class="{ 'beat-on': globalMeasure === idx && globalBeatInMeasure === 2 }"
          ><div class="beat-dot-center"></div></div>
          <div
            class="measure-beat measure-beat-empty"
            :class="{ 'beat-on': globalMeasure === idx && globalBeatInMeasure === 3 }"
          ><div class="beat-dot-center"></div></div>
        </div>
      </div>
    </div>

    <div class="chord-timeline-progress">
      <div
        class="chord-timeline-progress-fill"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { SongData } from '~/data/songDatabase'

const props = defineProps<{
  transpose?: number
  song?: SongData
}>()

const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

function transposeChord(chord: string, semitones: number): string {
  if (semitones === 0) return chord
  const match = chord.match(/^([A-G][#b]?)(.*)$/)
  if (!match || !match[1]) return chord
  const root: string = match[1]
  const suffix: string = match[2] ?? ''
  const normalizedRoot = root === 'Db' ? 'C#' : root === 'D#' ? 'Eb' : root === 'Gb' ? 'F#' : root === 'G#' ? 'Ab' : root === 'A#' ? 'Bb' : root
  const idx = noteNames.indexOf(normalizedRoot)
  if (idx === -1) return chord
  const newIdx = ((idx + semitones) % 12 + 12) % 12
  return noteNames[newIdx] + suffix
}

const displayChords = computed(() => {
  return (props.song?.chords ?? []).map(c => ({
    start: c.start,
    end: c.end,
    chord: transposeChord(c.chord, props.transpose ?? 0),
  }))
})

const { currentTime } = usePlayer()
const bpm = computed(() => props.song?.bpm ?? 72)

// One beat = 60/BPM seconds
const beatDuration = computed(() => 60 / bpm.value)

// Global beat count from time 0 — steady metronome, never skips
const globalBeatCount = computed(() => {
  return Math.floor(currentTime.value / beatDuration.value)
})

// Each measure = 4 beats. Which measure are we on?
const globalMeasure = computed(() => {
  return Math.floor(globalBeatCount.value / 4)
})

// Which beat within the measure (0, 1, 2, 3) — always cycles perfectly
const globalBeatInMeasure = computed(() => {
  return globalBeatCount.value % 4
})

const progressPercent = computed(() => {
  const dur = props.song?.durationSec ?? 0
  if (dur === 0) return 0
  return Math.min(100, (currentTime.value / dur) * 100)
})

const chordRefs = ref<(HTMLElement | null)[]>([])
const scrollContainer = ref<HTMLElement | null>(null)
let lastScrolledMeasure = -1

function setChordRef(el: HTMLElement | null, idx: number) {
  if (el) chordRefs.value[idx] = el
}

// Scroll when measure changes — only forward
watch(globalMeasure, (newMeasure) => {
  if (newMeasure <= lastScrolledMeasure) return
  lastScrolledMeasure = newMeasure

  nextTick(() => {
    const el = chordRefs.value[newMeasure]
    const container = scrollContainer.value
    if (!el || !container) return
    const targetScroll = el.offsetLeft - container.clientWidth * 0.35
    container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' })
  })
})
</script>
