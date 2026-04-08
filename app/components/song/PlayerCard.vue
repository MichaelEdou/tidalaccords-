<template>
  <div class="player-card">
    <div class="timeline-row">
      <div class="time-text">{{ formatTime(currentTime) }}</div>
      <div class="progress" ref="progressBarRef" @click="onProgressClick">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        <div class="progress-knob" :style="{ left: progress + '%' }"></div>
      </div>
      <div class="time-text" style="text-align: right">{{ formatTime(duration) }}</div>
    </div>
    <div class="player-bottom">
      <div class="player-controls">
        <div class="round-btn primary" @click="togglePlay">
          <iconify-icon :icon="isPlaying ? 'lucide:pause' : 'lucide:play'" style="font-size: 18px; color: currentColor"></iconify-icon>
        </div>
        <div class="round-btn soft" @click="skipBack">
          <iconify-icon icon="lucide:skip-back" style="font-size: 18px; color: currentColor"></iconify-icon>
        </div>
        <div class="round-btn soft" @click="skipForward">
          <iconify-icon icon="lucide:skip-forward" style="font-size: 18px; color: currentColor"></iconify-icon>
        </div>
        <div class="round-btn soft">
          <iconify-icon icon="lucide:repeat" style="font-size: 18px; color: currentColor"></iconify-icon>
        </div>
      </div>
      <div class="instrument-toggle">
        <div
          class="toggle-item"
          :class="{ active: instrument === 'guitar' }"
          @click="$emit('update:instrument', 'guitar')"
        >
          Guitar
        </div>
        <div
          class="toggle-item"
          :class="{ active: instrument === 'piano' }"
          @click="$emit('update:instrument', 'piano')"
        >
          Piano
        </div>
      </div>
      <div class="player-options">
        <div class="option-chip" @click.stop="showCapo = !showCapo" ref="capoRef">
          Capo: {{ capo }}
          <iconify-icon icon="lucide:chevron-down" :style="{ transform: showCapo ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }"></iconify-icon>
        </div>
        <div class="option-chip key-chip" @click.stop="showKeys = !showKeys" ref="keyRef">
          Key: {{ currentKeyName }}
          <iconify-icon icon="lucide:chevron-down" :style="{ transform: showKeys ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }"></iconify-icon>
        </div>
      </div>
    </div>

    <!-- Capo dropdown -->
    <Teleport to="body">
      <div v-if="showCapo" class="key-backdrop" @click="showCapo = false"></div>
      <div v-if="showCapo" class="key-dropdown" :style="capoDropdownStyle" @click.stop>
        <div class="key-dropdown-title">Select capo position</div>
        <div class="key-dropdown-grid">
          <div
            v-for="val in capoValues"
            :key="val"
            class="key-dropdown-item"
            :class="{ active: capo === val }"
            @click="capo = val; showCapo = false"
          >
            {{ val }}
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Key selector dropdown -->
    <Teleport to="body">
      <div v-if="showKeys" class="key-backdrop" @click="showKeys = false"></div>
      <div v-if="showKeys" class="key-dropdown" :style="keyDropdownStyle" @click.stop>
        <div class="key-dropdown-title">Select key</div>
        <div class="key-dropdown-grid">
          <div
            v-for="(key, idx) in allKeys"
            :key="key"
            class="key-dropdown-item"
            :class="{ active: transpose === idx }"
            @click="selectKey(idx)"
          >
            {{ key }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

const props = defineProps<{
  instrument: 'guitar' | 'piano'
  transpose: number
  originalKey?: string
}>()

const emit = defineEmits<{
  'update:instrument': [value: 'guitar' | 'piano']
  'update:transpose': [value: number]
}>()

// Shared player state from YouTube
const {
  currentTime,
  duration,
  isPlaying,
  progress,
  togglePlay,
  seekTo,
  formatTime,
} = usePlayer()

const progressBarRef = ref<HTMLElement | null>(null)

function onProgressClick(e: MouseEvent) {
  if (!progressBarRef.value) return
  const rect = progressBarRef.value.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  const time = percent * duration.value
  seekTo(time)
}

function skipBack() {
  seekTo(Math.max(0, currentTime.value - 10))
}

function skipForward() {
  seekTo(Math.min(duration.value, currentTime.value + 10))
}

// Key selector
const allKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

const currentKeyName = computed(() => {
  const origKey = (props.originalKey || 'C').replace('m', '')
  const origIdx = allKeys.indexOf(origKey)
  if (origIdx === -1) return props.originalKey || 'C'
  const newIdx = ((origIdx + props.transpose) % 12 + 12) % 12
  const suffix = (props.originalKey || '').includes('m') ? 'm' : ''
  return allKeys[newIdx] + suffix
})

const showKeys = ref(false)
const keyRef = ref<HTMLElement | null>(null)
const keyDropdownStyle = ref<Record<string, string>>({})

watch(showKeys, (val) => {
  if (val) {
    nextTick(() => {
      if (!keyRef.value) return
      const rect = keyRef.value.getBoundingClientRect()
      keyDropdownStyle.value = {
        position: 'fixed',
        top: (rect.bottom + 8) + 'px',
        left: Math.max(8, rect.right - 320) + 'px',
      }
    })
  }
})

function selectKey(idx: number) {
  emit('update:transpose', idx)
  showKeys.value = false
}

// Capo selector
const capo = ref(0)
const showCapo = ref(false)
const capoRef = ref<HTMLElement | null>(null)
const capoDropdownStyle = ref<Record<string, string>>({})
const capoValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

watch(showCapo, (val) => {
  if (val) {
    nextTick(() => {
      if (!capoRef.value) return
      const rect = capoRef.value.getBoundingClientRect()
      capoDropdownStyle.value = {
        position: 'fixed',
        top: (rect.bottom + 8) + 'px',
        left: Math.max(8, rect.right - 320) + 'px',
      }
    })
  }
})
</script>
