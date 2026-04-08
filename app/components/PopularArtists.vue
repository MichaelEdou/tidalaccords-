<template>
  <div class="section">
    <SectionHeader title="Popular artists" :show-arrows="true" />
    <div class="grid-7 artist-grid">
      <div v-for="artist in popularArtists" :key="artist.name" class="card">
        <div class="card-img-wrapper">
          <img :src="artist.image" :alt="artist.name" />
        </div>
        <p class="card-title">{{ artist.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllSongs } from '~/data/songDatabase'

const songs = getAllSongs()
const seen = new Set<string>()
const popularArtists = songs.reduce<{ name: string; image: string }[]>((acc, s) => {
  if (!seen.has(s.artist)) {
    seen.add(s.artist)
    acc.push({ name: s.artist, image: s.cover })
  }
  return acc
}, [])
</script>
