// Shared player state between PlayerCard and YouTube embed
const currentTime = ref(0)
const duration = ref(230) // default, will be set by YouTube
const isPlaying = ref(false)
const playerReady = ref(false)

// YouTube player instance reference
let ytPlayer: any = null

export function usePlayer() {
  function setYTPlayer(player: any) {
    ytPlayer = player
    playerReady.value = true
  }

  function play() {
    if (ytPlayer && ytPlayer.playVideo) {
      ytPlayer.playVideo()
    }
    isPlaying.value = true
  }

  function pause() {
    if (ytPlayer && ytPlayer.pauseVideo) {
      ytPlayer.pauseVideo()
    }
    isPlaying.value = false
  }

  function togglePlay() {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  function seekTo(time: number) {
    if (ytPlayer && ytPlayer.seekTo) {
      ytPlayer.seekTo(time, true)
    }
    currentTime.value = time
  }

  function setCurrentTime(time: number) {
    currentTime.value = time
  }

  function setDuration(d: number) {
    duration.value = d
  }

  function setIsPlaying(val: boolean) {
    isPlaying.value = val
  }

  const progress = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  })

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return {
    currentTime: readonly(currentTime),
    duration: readonly(duration),
    isPlaying: readonly(isPlaying),
    playerReady: readonly(playerReady),
    progress,
    play,
    pause,
    togglePlay,
    seekTo,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setYTPlayer,
    formatTime,
  }
}
