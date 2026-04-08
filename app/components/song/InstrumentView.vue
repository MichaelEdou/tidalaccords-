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

    <!-- Guitar View - single column -->
    <div v-if="instrument === 'guitar'">
      <div class="diagram-card">
        <div class="diagram-title">Guitar &bull; {{ currentChord.name }}</div>
        <div class="guitar-diagram">
          <div v-for="(string, si) in currentChord.guitar" :key="si" class="guitar-string">
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

    <!-- Piano View - single column -->
    <div v-else>
      <div class="diagram-card">
        <div class="diagram-title">Piano &bull; {{ currentChord.name }}</div>
        <div class="piano">
          <div
            v-for="(key, ki) in currentChord.pianoKeys"
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
}>()

const allChords = [
  { name: 'C major', guitar: [{ dot: null }, { dot: 120 }, { dot: 84 }, { dot: null }, { dot: 48 }, { dot: null }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'C# major', guitar: [{ dot: null }, { dot: 136 }, { dot: 100 }, { dot: 48 }, { dot: 64 }, { dot: 48 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'D major', guitar: [{ dot: null }, { dot: null }, { dot: null }, { dot: 84 }, { dot: 120 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'Eb major', guitar: [{ dot: null }, { dot: 84 }, { dot: 120 }, { dot: 120 }, { dot: 136 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'E major', guitar: [{ dot: null }, { dot: 84 }, { dot: 84 }, { dot: 48 }, { dot: null }, { dot: null }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
  { name: 'F major', guitar: [{ dot: 48 }, { dot: 48 }, { dot: 84 }, { dot: 120 }, { dot: 48 }, { dot: 48 }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'F# major', guitar: [{ dot: 84 }, { dot: 84 }, { dot: 120 }, { dot: 136 }, { dot: 84 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'G major', guitar: [{ dot: 120 }, { dot: null }, { dot: null }, { dot: null }, { dot: null }, { dot: 120 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
  { name: 'Ab major', guitar: [{ dot: 136 }, { dot: 120 }, { dot: 48 }, { dot: 48 }, { dot: 48 }, { dot: 136 }], pianoKeys: [{ whiteActive: true, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'A major', guitar: [{ dot: null }, { dot: null }, { dot: 84 }, { dot: 84 }, { dot: 84 }, { dot: null }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'Bb major', guitar: [{ dot: 48 }, { dot: 48 }, { dot: 120 }, { dot: 120 }, { dot: 120 }, { dot: 48 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: false, blackActive: false }] },
  { name: 'B major', guitar: [{ dot: 84 }, { dot: 84 }, { dot: 136 }, { dot: 136 }, { dot: 136 }, { dot: 84 }], pianoKeys: [{ whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: false }, { whiteActive: false, hasBlack: true, blackActive: true }, { whiteActive: false, hasBlack: false, blackActive: false }, { whiteActive: true, hasBlack: false, blackActive: false }] },
]

const currentChord = computed(() => {
  const idx = ((props.transpose ?? 0) % 12 + 12) % 12
  return allChords[idx]
})
</script>
