<template>
  <div class="instrument-card surface">
    <div class="instrument-header">
      <div class="sheet-title-wrap">
        <h2 class="sheet-title">Instrument view</h2>
        <div class="sheet-sub">
          {{ instrument === 'guitar'
            ? 'Visual finger placement for the current chord.'
            : 'Matching piano notes for the current chord.'
          }}
        </div>
      </div>
    </div>

    <!-- Guitar View -->
    <div v-if="instrument === 'guitar'">
      <div class="diagram-card">
        <div class="diagram-title">Guitar &bull; {{ chordDiagram.name }}</div>
        <div class="guitar-diagram">
          <div v-for="(string, si) in chordDiagram.guitar" :key="si" class="guitar-string">
            <div class="fret-line" style="top: 28px"></div>
            <div class="fret-line" style="top: 64px"></div>
            <div class="fret-line" style="top: 100px"></div>
            <div class="fret-line" style="top: 136px"></div>
            <div v-if="string.dot !== null" class="dot" :style="{ top: string.dot + 'px' }"></div>
          </div>
        </div>
        <div class="legend-row">
          <div class="legend-chip">
            <div class="legend-dot"></div>
            <span>Fingered note</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Piano View -->
    <div v-else>
      <div class="diagram-card">
        <div class="diagram-title">Piano &bull; {{ chordDiagram.name }}</div>
        <div class="piano">
          <div
            v-for="(key, ki) in chordDiagram.pianoKeys"
            :key="ki"
            class="white-key"
            :class="{ active: key.whiteActive }"
          >
            <div
              v-if="key.hasBlack"
              class="black-key"
              :class="{ active: key.blackActive }"
            ></div>
          </div>
        </div>
        <div class="legend-row">
          <div class="legend-chip">
            <div class="legend-dot"></div>
            <span>Chord tone</span>
          </div>
          <div class="legend-chip">
            <div class="legend-dot alt"></div>
            <span>Passing note</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  instrument: 'guitar' | 'piano'
  transpose?: number
  currentChord?: string  // The chord name currently playing (from ChordSheet red highlight)
}>()

// Chord diagrams for all roots — major and minor
const chordDiagrams: Record<string, { name: string, guitar: { dot: number | null }[], pianoKeys: { whiteActive: boolean, hasBlack: boolean, blackActive: boolean }[] }> = {
  'C':   { name: 'C',   guitar: [{ dot: null }, { dot: 120 }, { dot: 84 }, { dot: null }, { dot: 48 }, { dot: null }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'C#':  { name: 'C#',  guitar: [{ dot: null }, { dot: 136 }, { dot: 100 }, { dot: 48 }, { dot: 64 }, { dot: 48 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'D':   { name: 'D',   guitar: [{ dot: null }, { dot: null }, { dot: null }, { dot: 84 }, { dot: 120 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'Eb':  { name: 'Eb',  guitar: [{ dot: null }, { dot: 84 }, { dot: 120 }, { dot: 120 }, { dot: 136 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'E':   { name: 'E',   guitar: [{ dot: null }, { dot: 84 }, { dot: 84 }, { dot: 48 }, { dot: null }, { dot: null }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
  'F':   { name: 'F',   guitar: [{ dot: 48 }, { dot: 48 }, { dot: 84 }, { dot: 120 }, { dot: 48 }, { dot: 48 }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'F#':  { name: 'F#',  guitar: [{ dot: 84 }, { dot: 84 }, { dot: 120 }, { dot: 136 }, { dot: 84 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'G':   { name: 'G',   guitar: [{ dot: 120 }, { dot: null }, { dot: null }, { dot: null }, { dot: null }, { dot: 120 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
  'Ab':  { name: 'Ab',  guitar: [{ dot: 136 }, { dot: 120 }, { dot: 48 }, { dot: 48 }, { dot: 48 }, { dot: 136 }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'A':   { name: 'A',   guitar: [{ dot: null }, { dot: null }, { dot: 84 }, { dot: 84 }, { dot: 84 }, { dot: null }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'Bb':  { name: 'Bb',  guitar: [{ dot: 48 }, { dot: 48 }, { dot: 120 }, { dot: 120 }, { dot: 120 }, { dot: 48 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'B':   { name: 'B',   guitar: [{ dot: 84 }, { dot: 84 }, { dot: 136 }, { dot: 136 }, { dot: 136 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
  // Minor chords — use same positions as relative major for simplicity
  'Am':  { name: 'Am',  guitar: [{ dot: null }, { dot: null }, { dot: 84 }, { dot: 84 }, { dot: 48 }, { dot: null }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'Em':  { name: 'Em',  guitar: [{ dot: null }, { dot: 84 }, { dot: 84 }, { dot: null }, { dot: null }, { dot: null }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
  'Dm':  { name: 'Dm',  guitar: [{ dot: null }, { dot: null }, { dot: null }, { dot: 84 }, { dot: 120 }, { dot: 48 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'Bm':  { name: 'Bm',  guitar: [{ dot: 84 }, { dot: 84 }, { dot: 136 }, { dot: 136 }, { dot: 120 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
  'Fm':  { name: 'Fm',  guitar: [{ dot: 48 }, { dot: 48 }, { dot: 48 }, { dot: 120 }, { dot: 48 }, { dot: 48 }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'Cm':  { name: 'Cm',  guitar: [{ dot: null }, { dot: 120 }, { dot: 48 }, { dot: null }, { dot: 48 }, { dot: null }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'G#m': { name: 'G#m', guitar: [{ dot: 136 }, { dot: 120 }, { dot: 48 }, { dot: 48 }, { dot: null }, { dot: 136 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
  'F#m': { name: 'F#m', guitar: [{ dot: 84 }, { dot: 84 }, { dot: 120 }, { dot: 84 }, { dot: 84 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'C#m': { name: 'C#m', guitar: [{ dot: null }, { dot: 136 }, { dot: 84 }, { dot: 48 }, { dot: 48 }, { dot: null }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'Bbm': { name: 'Bbm', guitar: [{ dot: 48 }, { dot: 48 }, { dot: 120 }, { dot: 120 }, { dot: 84 }, { dot: 48 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'Ebm': { name: 'Ebm', guitar: [{ dot: null }, { dot: 84 }, { dot: 120 }, { dot: 84 }, { dot: 136 }, { dot: null }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'A#m': { name: 'A#m', guitar: [{ dot: 48 }, { dot: 48 }, { dot: 120 }, { dot: 120 }, { dot: 84 }, { dot: 48 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  'D#m': { name: 'D#m', guitar: [{ dot: null }, { dot: 84 }, { dot: 120 }, { dot: 84 }, { dot: 136 }, { dot: null }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
}

// Default diagram
const defaultDiagram = chordDiagrams['C']!

// Find diagram for the current playing chord
const chordDiagram = computed(() => {
  const chordName = props.currentChord ?? 'C'

  // Try exact match first
  if (chordDiagrams[chordName]) return chordDiagrams[chordName]!

  // Extract root (e.g., "G#m7" -> "G#m", "Cmaj7" -> "C")
  const match = chordName.match(/^([A-G][#b]?)(m)?/)
  if (match) {
    const root = match[1]!
    const isMinor = match[2] === 'm'
    const key = isMinor ? root + 'm' : root
    if (chordDiagrams[key]) return chordDiagrams[key]!
    // Try just the root as major
    if (chordDiagrams[root]) return chordDiagrams[root]!
  }

  return defaultDiagram
})
</script>
