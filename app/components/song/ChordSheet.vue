<template>
  <div class="chord-timeline-card surface">
    <div class="chord-timeline-header">
      <div class="sheet-title-wrap">
        <h2 class="sheet-title">Chord progression</h2>
        <div class="sheet-sub">Auto-scrolling timeline synced to playback.</div>
      </div>
    </div>

    <!-- Scrolling timeline -->
    <div class="chord-timeline-viewport" ref="viewportRef">
      <div
        class="chord-timeline-track"
        ref="trackRef"
        :style="{ transform: `translateX(${trackOffset}px)` }"
      >
        <div
          v-for="(item, idx) in allChords"
          :key="idx"
          class="chord-timeline-item"
          :class="{
            active: idx === activeIndex,
            past: idx < activeIndex,
            'section-start': item.sectionStart
          }"
        >
          <div v-if="item.sectionStart" class="chord-timeline-section-label">
            {{ item.section }}
          </div>
          <div class="chord-timeline-chord">{{ item.chord }}</div>
          <div class="chord-timeline-beats">
            <span
              v-for="b in 4"
              :key="b"
              class="chord-timeline-beat-dot"
              :class="{ filled: b === 1 }"
            ></span>
          </div>
          <div class="chord-timeline-bar-num">{{ idx + 1 }}</div>
        </div>
      </div>

      <!-- Center marker -->
      <div class="chord-timeline-cursor"></div>
    </div>

    <!-- Progress bar -->
    <div class="chord-timeline-progress">
      <div
        class="chord-timeline-progress-fill"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  transpose?: number
}>()

const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

function transposeChord(chord: string, semitones: number): string {
  if (semitones === 0) return chord
  const match = chord.match(/^([A-G][#b]?)(.*)$/)
  if (!match) return chord
  const root = match[1]
  const suffix = match[2]
  const normalizedRoot = root === 'Db' ? 'C#' : root === 'D#' ? 'Eb' : root === 'Gb' ? 'F#' : root === 'G#' ? 'Ab' : root === 'A#' ? 'Bb' : root
  const idx = noteNames.indexOf(normalizedRoot)
  if (idx === -1) return chord
  const newIdx = ((idx + semitones) % 12 + 12) % 12
  return noteNames[newIdx] + suffix
}

// Real chord progression: "Reckless Love" by Cory Asbury (Key of C, 72 BPM)
const songStructure = [
  { section: 'INTRO', chords: ['C', 'C', 'Am', 'Am', 'F', 'F', 'C', 'C'] },
  { section: 'VERSE 1', chords: ['C', 'C', 'Am', 'Am', 'F', 'F', 'C', 'C'] },
  { section: 'PRE-CHORUS', chords: ['Am', 'G', 'F', 'F'] },
  { section: 'CHORUS', chords: ['C', 'C', 'G', 'G', 'Am', 'Am', 'F', 'F', 'C', 'C', 'G', 'G', 'Am', 'Am', 'F', 'F'] },
  { section: 'VERSE 2', chords: ['C', 'C', 'Am', 'Am', 'F', 'F', 'C', 'C'] },
  { section: 'PRE-CHORUS', chords: ['Am', 'G', 'F', 'F'] },
  { section: 'CHORUS', chords: ['C', 'C', 'G', 'G', 'Am', 'Am', 'F', 'F', 'C', 'C', 'G', 'G', 'Am', 'Am', 'F', 'F'] },
  { section: 'BRIDGE', chords: ['Am', 'Am', 'G', 'G', 'F', 'F', 'C', 'C', 'Am', 'Am', 'G', 'G', 'F', 'F', 'C', 'C'] },
  { section: 'CHORUS', chords: ['C', 'C', 'G', 'G', 'Am', 'Am', 'F', 'F'] },
  { section: 'OUTRO', chords: ['C', 'C', 'Am', 'Am', 'F', 'F', 'C', 'C'] },
]

const allChords = computed(() => {
  const items: { chord: string; section: string; sectionStart: boolean }[] = []
  for (const sec of songStructure) {
    sec.chords.forEach((chord, i) => {
      items.push({
        chord: transposeChord(chord, props.transpose ?? 0),
        section: sec.section,
        sectionStart: i === 0,
      })
    })
  }
  return items
})

// Sync with YouTube player via shared composable
const { currentTime, duration, isPlaying, progress: playerProgress } = usePlayer()

const trackOffset = ref(0)
const viewportRef = ref<HTMLElement | null>(null)
const itemWidth = 120

// BPM = 72, 4 beats per bar => 1 bar duration in seconds
const barDuration = 4 * (60 / 72) // ~3.33s per bar

// Calculate active chord index from current playback time
const activeIndex = computed(() => {
  const time = currentTime.value
  const totalBars = allChords.value.length
  const idx = Math.floor(time / barDuration)
  return Math.min(idx, totalBars - 1)
})

const progressPercent = computed(() => {
  if (allChords.value.length === 0) return 0
  return (activeIndex.value / allChords.value.length) * 100
})

function updateOffset() {
  if (!viewportRef.value) return
  const viewportWidth = viewportRef.value.clientWidth
  const centerOffset = viewportWidth / 2 - itemWidth / 2
  trackOffset.value = centerOffset - activeIndex.value * itemWidth
}

// Watch activeIndex to auto-scroll
watch(activeIndex, () => {
  updateOffset()
})

// Initialize offset on mount
onMounted(() => {
  updateOffset()
})
</script>
