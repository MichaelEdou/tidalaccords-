<template>
  <div class="sheet-card surface">
    <div class="sheet-header">
      <div class="sheet-title-wrap">
        <h2 class="sheet-title">Chord progression</h2>
        <div class="sheet-sub">
          {{ song ? `${song.title} — ${song.artist} • Key of ${song.originalKey}` : 'Synced to playback.' }}
        </div>
      </div>
      <div class="section-tag-row">
        <div
          v-for="sec in uniqueSectionNames"
          :key="sec"
          class="section-tag"
          :class="{ 'section-tag-active': sec === currentSectionName }"
        >
          {{ sec }}
        </div>
      </div>
    </div>

    <!-- Horizontally scrollable chord sections -->
    <div class="progression-hscroll" ref="scrollContainer">
      <div class="progression-hscroll-track">
        <div
          v-for="(group, gi) in groupedSections"
          :key="gi"
          class="song-section-h"
          :ref="el => sectionRefs[gi] = el as HTMLElement"
        >
          <div class="section-name-h">{{ group.section }}</div>
          <div class="measure-rows-h">
            <div
              v-for="(line, li) in group.lines"
              :key="li"
              class="measure-row-h"
            >
              <div
                v-for="(chord, ci) in line.chords"
                :key="gi + '-' + li + '-' + ci"
                class="measure-h"
                :class="{ 'measure-h-active': isActiveBeat(line.globalStart + ci) }"
              >
                <div class="beat-h-chord">{{ chord }}</div>
                <div class="beat-h-dots">
                  <span class="beat-h-dot filled"></span>
                  <span class="beat-h-dot"></span>
                  <span class="beat-h-dot"></span>
                  <span class="beat-h-dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import type { SongData } from '~/data/songDatabase'

const props = defineProps<{
  transpose?: number
  song?: SongData
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

const songSections = computed(() => props.song?.sections ?? [])

// Unique section names for the tag row
const uniqueSectionNames = computed(() => {
  const seen = new Set<string>()
  return songSections.value.filter(s => {
    if (seen.has(s.section)) return false
    seen.add(s.section)
    return true
  }).map(s => s.section)
})

// Group consecutive sections with the same name together
// Each group has multiple "lines" (rows of chords)
interface ChordLine {
  chords: string[]
  globalStart: number // global index of first chord in this line
}

interface SectionGroup {
  section: string
  lines: ChordLine[]
}

const groupedSections = computed((): SectionGroup[] => {
  const groups: SectionGroup[] = []
  let globalIdx = 0

  for (const sec of songSections.value) {
    const transposed = sec.chords.map(c => transposeChord(c, props.transpose ?? 0))
    const lastGroup = groups[groups.length - 1]

    if (lastGroup && lastGroup.section === sec.section) {
      // Same section name — add as a new line in the same group
      lastGroup.lines.push({ chords: transposed, globalStart: globalIdx })
    } else {
      // New section group
      groups.push({
        section: sec.section,
        lines: [{ chords: transposed, globalStart: globalIdx }],
      })
    }
    globalIdx += sec.chords.length
  }
  return groups
})

// Total flat chord count
const totalChords = computed(() => {
  return songSections.value.reduce((sum, s) => sum + s.chords.length, 0)
})

// Sync with YouTube player
const { currentTime } = usePlayer()

const bpm = computed(() => props.song?.bpm ?? 72)
const barDuration = computed(() => 4 * (60 / bpm.value))

const activeGlobalIndex = computed(() => {
  const time = currentTime.value
  const idx = Math.floor(time / barDuration.value)
  return Math.min(Math.max(idx, 0), totalChords.value - 1)
})

// Find which section the active index is in
const currentSectionName = computed(() => {
  let count = 0
  for (const sec of songSections.value) {
    count += sec.chords.length
    if (activeGlobalIndex.value < count) {
      return sec.section
    }
  }
  return ''
})

function isActiveBeat(globalIndex: number): boolean {
  return activeGlobalIndex.value === globalIndex
}

const progressPercent = computed(() => {
  if (totalChords.value === 0) return 0
  return ((activeGlobalIndex.value + 1) / totalChords.value) * 100
})

// Auto-scroll to active group
const scrollContainer = ref<HTMLElement | null>(null)
const sectionRefs = ref<(HTMLElement | null)[]>([])

watch(activeGlobalIndex, () => {
  // Find which group contains the active index
  for (let gi = 0; gi < groupedSections.value.length; gi++) {
    const group = groupedSections.value[gi]
    for (const line of group.lines) {
      const lineEnd = line.globalStart + line.chords.length
      if (activeGlobalIndex.value >= line.globalStart && activeGlobalIndex.value < lineEnd) {
        const el = sectionRefs.value[gi]
        if (el && scrollContainer.value) {
          const containerLeft = scrollContainer.value.scrollLeft
          const containerWidth = scrollContainer.value.clientWidth
          const elLeft = el.offsetLeft
          const elRight = elLeft + el.clientWidth

          if (elLeft < containerLeft || elRight > containerLeft + containerWidth) {
            scrollContainer.value.scrollTo({ left: Math.max(0, elLeft - 20), behavior: 'smooth' })
          }
        }
        return
      }
    }
  }
})
</script>
