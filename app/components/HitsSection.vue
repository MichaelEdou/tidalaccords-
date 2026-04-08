<template>
  <div class="section">
    <SectionHeader title="The Hits" :show-arrows="true" />
    <div class="grid-6">
      <NuxtLink v-for="hit in hits" :key="hit.title" :to="`/song/${hit.slug}`" class="card">
        <div class="card-img-wrapper">
          <img :src="hit.image" :alt="hit.title" />
          <div
            class="hit-badge"
            :style="{ backgroundColor: hit.badgeBg, color: hit.badgeColor }"
          >
            {{ hit.badgeText }}
          </div>
          <iconify-icon
            v-if="hit.showChart"
            icon="lucide:bar-chart-2"
            style="position: absolute; top: 12px; right: 12px; color: white"
          ></iconify-icon>
        </div>
        <div>
          <p class="card-title">{{ hit.title }}</p>
          <p class="card-subtitle">{{ hit.subtitle }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllSongs } from '~/data/songDatabase'

const badgeConfigs = [
  { badgeText: 'TOP WORSHIP', badgeBg: 'rgba(0,0,0,0.8)', badgeColor: 'white' },
  { badgeText: 'GOSPEL', badgeBg: 'rgba(255,255,255,0.9)', badgeColor: 'black' },
  { badgeText: 'WORSHIP', badgeBg: '#7209b7', badgeColor: 'white' },
  { badgeText: 'PIANO', badgeBg: '#f72585', badgeColor: 'white' },
  { badgeText: 'HYMNS', badgeBg: '#d90429', badgeColor: 'white' },
  { badgeText: 'PRAISE', badgeBg: '#fca311', badgeColor: 'white' },
]

const songs = getAllSongs()
const hits = songs.slice(0, 6).map((s, i) => ({
  title: badgeConfigs[i]?.badgeText ?? s.title,
  subtitle: 'Phinaccords',
  slug: s.slug,
  image: s.cover,
  badgeText: badgeConfigs[i]?.badgeText ?? 'WORSHIP',
  badgeBg: badgeConfigs[i]?.badgeBg ?? 'rgba(0,0,0,0.8)',
  badgeColor: badgeConfigs[i]?.badgeColor ?? 'white',
  showChart: false,
}))
</script>
