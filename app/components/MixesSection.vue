<template>
  <div class="section">
    <SectionHeader title="Mixes made for you" :show-arrows="true" />
    <div class="grid-6">
      <NuxtLink v-for="mix in mixes" :key="mix.name" :to="`/song/${mix.slug}`" class="card">
        <div class="card-img-wrapper">
          <img :src="mix.image" :alt="mix.name" />
          <div class="mix-overlay">
            <div class="mix-type">{{ mix.type }}</div>
            <div class="mix-name">{{ mix.name }}</div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllSongs } from '~/data/songDatabase'

const mixLabels = [
  { type: 'Worship Mix', name: 'Sunday Morning' },
  { type: 'Artist Mix', name: 'Hillsong Mix' },
  { type: 'Artist Mix', name: 'Elevation Mix' },
  { type: 'Genre Mix', name: 'Gospel Piano' },
  { type: 'Mood Mix', name: 'Quiet Time' },
  { type: 'Genre Mix', name: 'Contemporary' },
]

const songs = getAllSongs()
const mixes = songs.slice(0, 6).map((s, i) => ({
  type: mixLabels[i]?.type ?? 'Genre Mix',
  name: mixLabels[i]?.name ?? s.title,
  slug: s.slug,
  image: s.cover,
}))
</script>
