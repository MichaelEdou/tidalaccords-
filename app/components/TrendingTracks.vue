<template>
  <div class="section">
    <SectionHeader title="Trending tracks" :show-arrows="false" />
    <table class="tracks-table">
      <thead>
        <tr>
          <th style="width: 40px">#</th>
          <th>Title</th>
          <th>Album</th>
          <th style="text-align: right">
            <iconify-icon icon="lucide:clock" style="font-size: 14px"></iconify-icon>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="track in trendingTracks" :key="track.number" style="cursor: pointer" @click="$router.push(`/song/${track.slug}`)">
          <td style="color: var(--muted-foreground)">{{ track.number }}</td>
          <td>
            <div class="track-title-cell">
              <img :src="track.image" :alt="track.title" />
              <div>
                <div>{{ track.title }}</div>
                <div style="font-size: 13px; color: var(--muted-foreground); font-weight: 500">{{ track.artist }}</div>
              </div>
            </div>
          </td>
          <td style="color: var(--muted-foreground); font-weight: 500">{{ track.album }}</td>
          <td>
            <div class="track-time-cell">
              <iconify-icon icon="lucide:heart" style="font-size: 16px; cursor: pointer"></iconify-icon>
              <span>{{ track.duration }}</span>
              <TrackContextMenu :title="track.title" :artist="track.artist" :image="track.image" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { getAllSongs } from '~/data/songDatabase'

const songs = getAllSongs()
const trendingTracks = songs.slice(0, 5).map((s, i) => ({
  number: i + 1,
  title: s.title,
  artist: s.artist,
  album: s.title,
  duration: s.duration,
  slug: s.slug,
  image: s.cover,
  youtubeId: s.youtubeId,
}))
</script>
