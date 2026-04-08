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
        <tr v-for="track in trendingTracks" :key="track.number" style="cursor: pointer" @click="$router.push('/song')">
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
import { trendingTracks } from '~/data/mockData'
</script>
