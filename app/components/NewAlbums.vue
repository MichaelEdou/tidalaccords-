<template>
  <div class="section">
    <SectionHeader title="New Albums" :show-arrows="true" />
    <div class="grid-7">
      <NuxtLink v-for="album in newAlbums" :key="album.title" to="/song" class="card">
        <div class="card-img-wrapper">
          <img :src="album.image" :alt="album.title" />
        </div>
        <div>
          <p class="card-title">
            {{ album.title }}
            <span v-if="album.explicit" class="badge-e">E</span>
          </p>
          <p class="card-subtitle">{{ album.artist }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { newAlbums } from '~/data/mockData'
</script>
