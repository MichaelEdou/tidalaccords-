<template>
  <div class="app-wrapper song-page">
    <AppSidebar active-page="music" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />

      <!-- Song with full chord data -->
      <div v-if="song" :key="song.slug" class="song-content">
        <section class="song-main-column">
          <SongPlayerCard
            v-model:instrument="selectedInstrument"
            v-model:transpose="transposeValue"
            :original-key="song.originalKey"
          />
          <SongChordSheet :key="song.slug" :transpose="transposeValue" :song="song" />
          <SongInstrumentView :instrument="selectedInstrument" :transpose="transposeValue" :current-chord="currentChordName" />
        </section>
        <aside class="song-side-column">
          <SongInfoPanel :transpose="transposeValue" :song="song" />
        </aside>
      </div>

      <!-- Song found in catalog but chords not yet processed -->
      <div v-else-if="catalogSong" class="song-content">
        <section class="song-main-column">
          <div class="sheet-card surface" style="padding: 40px; text-align: center;">
            <iconify-icon icon="lucide:loader-2" style="font-size: 48px; color: var(--primary); animation: spin 1.5s linear infinite"></iconify-icon>
            <h2 style="margin: 20px 0 8px; font-size: 22px; font-weight: 800;">Chord Detection In Progress</h2>
            <p style="color: var(--muted-foreground); font-size: 14px; max-width: 400px; margin: 0 auto; line-height: 1.6;">
              Our AI pipeline is analyzing <strong>{{ catalogSong.title }}</strong> by <strong>{{ catalogSong.artist }}</strong>.
            </p>
          </div>
        </section>
        <aside class="song-side-column">
          <div class="panel surface">
            <div class="song-info-header">
              <img :src="catalogSong.image" :alt="catalogSong.title" class="song-info-cover" />
              <div class="song-info-meta">
                <h3 class="song-info-title">{{ catalogSong.title }}</h3>
                <p class="song-info-artist">{{ catalogSong.artist }}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Song not found -->
      <div v-else style="padding: 80px 32px; text-align: center;">
        <iconify-icon icon="lucide:music-off" style="font-size: 64px; color: var(--muted-foreground); opacity: 0.3;"></iconify-icon>
        <p style="color: var(--muted-foreground); font-size: 18px; margin-top: 16px;">Song not found.</p>
        <NuxtLink to="/" style="color: var(--primary); font-weight: 600;">Back to home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSongBySlug, getAllSongs } from '~/data/songDatabase'
import type { SongData } from '~/data/songDatabase'

const route = useRoute()

// Reactive song lookup — recomputes when slug changes
const song = computed(() => {
  const slug = route.params.slug as string
  return getSongBySlug(slug) ?? null
})

// Catalog song for processing state
const catalogSong = computed(() => {
  if (song.value) return null
  const slug = route.params.slug as string
  const allSongs = getAllSongs()
  const found = allSongs.find(s => s.slug === slug)
  if (!found) return null
  return { title: found.title, artist: found.artist, image: found.cover, slug: found.slug }
})

const selectedInstrument = ref<'guitar' | 'piano'>('guitar')
const transposeValue = ref(0)

// Current chord from the metronome — same logic as ChordSheet
const { currentTime } = usePlayer()

const currentChordName = computed(() => {
  if (!song.value) return 'C'
  const bpm = song.value.bpm || 72
  const beatDuration = 60 / bpm
  const globalBeat = Math.floor(currentTime.value / beatDuration)
  const measureIdx = Math.floor(globalBeat / 4)
  const chords = song.value.chords
  if (!chords || chords.length === 0) return 'C'
  const chord = chords[Math.min(measureIdx, chords.length - 1)]
  return chord?.chord ?? 'C'
})

const pageTitle = computed(() => {
  if (song.value) return `${song.value.title} - ${song.value.artist} | Phinaccords`
  if (catalogSong.value) return `${catalogSong.value.title} - ${catalogSong.value.artist} | Phinaccords`
  return 'Song Not Found | Phinaccords'
})

useHead({ title: pageTitle })
</script>
