<template>
  <div class="song-info-sidebar">
    <!-- YouTube Video Embed (via IFrame API) -->
    <div class="song-video-panel surface">
      <div class="song-video-wrapper">
        <div :id="playerId" ref="playerEl"></div>
      </div>
    </div>

    <!-- Song Info Card -->
    <div class="panel surface">
      <div class="song-info-header">
        <img :src="song.cover" :alt="song.title" class="song-info-cover" />
        <div class="song-info-meta">
          <h3 class="song-info-title">{{ song.title }}</h3>
          <p class="song-info-artist">{{ song.artist }}</p>
        </div>
      </div>

      <div class="song-info-divider"></div>

      <!-- Song Details -->
      <div class="stat-list">
        <div class="stat-row">
          <span class="stat-key">
            <iconify-icon icon="lucide:music" style="font-size: 14px; margin-right: 6px"></iconify-icon>
            Key
          </span>
          <span class="stat-value-highlight">{{ currentKey }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-key">
            <iconify-icon icon="lucide:gauge" style="font-size: 14px; margin-right: 6px"></iconify-icon>
            BPM
          </span>
          <span>{{ song.bpm }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-key">
            <iconify-icon icon="lucide:timer" style="font-size: 14px; margin-right: 6px"></iconify-icon>
            Tempo
          </span>
          <span>{{ song.tempo }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-key">
            <iconify-icon icon="lucide:drum" style="font-size: 14px; margin-right: 6px"></iconify-icon>
            Rhythm
          </span>
          <span>{{ song.rhythm }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-key">
            <iconify-icon icon="lucide:clock" style="font-size: 14px; margin-right: 6px"></iconify-icon>
            Duration
          </span>
          <span>{{ song.duration }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-key">
            <iconify-icon icon="lucide:bar-chart-2" style="font-size: 14px; margin-right: 6px"></iconify-icon>
            Difficulty
          </span>
          <span>{{ song.difficulty }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-key">
            <iconify-icon icon="lucide:guitar" style="font-size: 14px; margin-right: 6px"></iconify-icon>
            Capo
          </span>
          <span>{{ song.capo }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-key">
            <iconify-icon icon="lucide:sliders-horizontal" style="font-size: 14px; margin-right: 6px"></iconify-icon>
            Time Signature
          </span>
          <span>{{ song.timeSignature }}</span>
        </div>
      </div>

      <div class="song-info-divider"></div>

      <!-- Tags -->
      <div class="song-info-tags">
        <span v-for="tag in song.tags" :key="tag" class="song-info-tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'

import type { SongData } from '~/data/songDatabase'

const props = defineProps<{
  transpose?: number
  song?: SongData
}>()

const { setYTPlayer, setCurrentTime, setDuration, setIsPlaying } = usePlayer()

const allKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

const currentKey = computed(() => {
  const origKey = song.value.originalKey || 'C'
  // Find the original key index
  const origRoot = origKey.replace('m', '')
  const origIdx = allKeys.indexOf(origRoot)
  if (origIdx === -1) return origKey
  // Apply transpose
  const newIdx = ((origIdx + (props.transpose ?? 0)) % 12 + 12) % 12
  const suffix = origKey.includes('m') ? 'm' : ' major'
  return allKeys[newIdx] + suffix
})

const song = computed(() => props.song as any ?? {
  title: 'Unknown',
  artist: 'Unknown',
  cover: '',
  youtubeId: '',
  bpm: 0,
  tempo: '',
  rhythm: '',
  duration: '0:00',
  difficulty: '',
  capo: 0,
  timeSignature: '4/4',
  originalKey: 'C',
  tags: [],
})

const playerId = computed(() => 'yt-player-' + (song.value.youtubeId || 'default'))
const playerEl = ref<HTMLElement | null>(null)
let timeUpdateInterval: ReturnType<typeof setInterval> | null = null
let ytPlayerInstance: any = null

function loadYTApi() {
  if ((window as any).YT && (window as any).YT.Player) {
    initPlayer()
    return
  }

  // Load YouTube IFrame API script
  if (!document.getElementById('yt-iframe-api')) {
    const tag = document.createElement('script')
    tag.id = 'yt-iframe-api'
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  }

  ;(window as any).onYouTubeIframeAPIReady = () => {
    initPlayer()
  }
}

function initPlayer() {
  const YT = (window as any).YT
  if (!YT || !YT.Player) return

  ytPlayerInstance = new YT.Player(playerId.value, {
    height: '100%',
    width: '100%',
    videoId: song.value.youtubeId,
    playerVars: {
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      enablejsapi: 1,
      origin: window.location.origin,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  })
}

function onPlayerReady(event: any) {
  setYTPlayer(event.target)
  setDuration(event.target.getDuration())

  // Start polling current time
  timeUpdateInterval = setInterval(() => {
    if (ytPlayerInstance && ytPlayerInstance.getCurrentTime) {
      setCurrentTime(ytPlayerInstance.getCurrentTime())
    }
  }, 100) // 10x per second for tight chord sync
}

function onPlayerStateChange(event: any) {
  const YT = (window as any).YT
  if (!YT) return

  if (event.data === YT.PlayerState.PLAYING) {
    setIsPlaying(true)
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    setIsPlaying(false)
  }
}

onMounted(() => {
  loadYTApi()
})

onBeforeUnmount(() => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
  }
  if (ytPlayerInstance && ytPlayerInstance.destroy) {
    ytPlayerInstance.destroy()
  }
})
</script>
