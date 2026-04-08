<template>
  <div class="app-wrapper song-page">
    <AppSidebar active-page="music" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />
      <div v-if="song" class="song-content">
        <section class="song-main-column">
          <SongPlayerCard
            v-model:instrument="selectedInstrument"
            v-model:transpose="transposeValue"
          />
          <SongChordSheet :transpose="transposeValue" :song="song" />
          <SongInstrumentView :instrument="selectedInstrument" :transpose="transposeValue" />
        </section>
        <aside class="song-side-column">
          <SongInfoPanel :transpose="transposeValue" :song="song" />
        </aside>
      </div>
      <div v-else class="song-content" style="padding: 80px 32px; text-align: center;">
        <p style="color: var(--muted-foreground); font-size: 18px;">Song not found.</p>
        <NuxtLink to="/" style="color: var(--primary); font-weight: 600;">Back to home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSongBySlug } from '~/data/songDatabase'
import type { SongData } from '~/data/songDatabase'

const route = useRoute()
const slug = route.params.slug as string
const song = getSongBySlug(slug) as SongData | undefined

const selectedInstrument = ref<'guitar' | 'piano'>('guitar')
const transposeValue = ref(0)

useHead({
  title: song ? `${song.title} - ${song.artist} | Phinaccords` : 'Song Not Found | Phinaccords',
})
</script>
