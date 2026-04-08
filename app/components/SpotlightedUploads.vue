<template>
  <div class="section">
    <SectionHeader
      :show-arrows="false"
      :header-style="{ marginBottom: '16px' }"
      subtitle="Independent tracks selected by Phinaccords's editorial team"
    >
      <template #title>
        Spotlighted Uploads
        <iconify-icon icon="lucide:help-circle" style="font-size: 16px; color: var(--muted-foreground)"></iconify-icon>
      </template>
    </SectionHeader>
    <div class="spotlight-list">
      <NuxtLink v-for="item in spotlightedUploads" :key="item.title" :to="`/song/${item.slug}`" class="spotlight-item">
        <img :src="item.image" :alt="item.title" />
        <div class="spotlight-item-info">
          <span class="spotlight-item-title" :style="item.highlight ? { color: '#f5a623' } : {}">
            {{ item.title }}
            <span v-if="item.explicit" class="badge-e">E</span>
          </span>
          <span class="spotlight-item-artist">{{ item.artist }}</span>
        </div>
        <TrackContextMenu :title="item.title" :artist="item.artist" :image="item.image" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllSongs } from '~/data/songDatabase'

const songs = getAllSongs()
const spotlightedUploads = songs.slice(7, 13).map((s, i) => ({
  title: s.title,
  artist: s.artist,
  slug: s.slug,
  image: s.cover,
  highlight: i % 2 === 1,
  explicit: false,
  youtubeId: s.youtubeId,
}))
</script>
