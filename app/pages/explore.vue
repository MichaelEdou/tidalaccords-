<template>
  <div class="app-wrapper explore-page">
    <AppSidebar active-page="explore" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />

      <!-- Content -->
      <div class="explore-content">
        <h1 class="explore-page-title">Top Albums</h1>

        <div class="top-albums-grid">
          <NuxtLink
            v-for="album in topAlbums"
            :key="album.title"
            :to="`/song/${album.slug}`"
            class="top-album-card"
          >
            <div class="top-album-img-wrapper">
              <img :src="album.image" :alt="album.title" />
            </div>
            <div class="top-album-info">
              <p class="top-album-title">
                {{ album.title }}
                <span v-if="album.explicit" class="badge-e">E</span>
              </p>
              <p class="top-album-artist">{{ album.artist }}</p>
              <p class="top-album-year">{{ album.year }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllSongs } from '~/data/songDatabase'

// Real data from AI chord detection pipeline
const allSongs = getAllSongs()
const topAlbums = allSongs.map(s => ({
  title: s.title,
  artist: s.artist,
  slug: s.slug,
  year: s.duration,
  image: s.cover,
}))
</script>
