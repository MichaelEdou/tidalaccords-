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
import { popularArtists } from '~/data/mockData'
</script>
