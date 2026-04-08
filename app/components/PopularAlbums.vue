<template>
  <div class="section">
    <SectionHeader title="Popular albums" :show-arrows="true" />
    <div class="grid-7">
      <NuxtLink v-for="album in popularAlbums" :key="album.title" to="/song" class="card">
        <div class="card-img-wrapper">
          <img :src="album.image" :alt="album.title" />
          <div
            v-if="album.showPlay"
            style="
              position: absolute;
              bottom: 8px;
              left: 8px;
              background: rgba(0, 0, 0, 0.8);
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <iconify-icon icon="lucide:play" style="color: white; fill: white"></iconify-icon>
          </div>
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
import { popularAlbums } from '~/data/mockData'
</script>
