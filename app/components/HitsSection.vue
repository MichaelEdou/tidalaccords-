<template>
  <div class="section">
    <SectionHeader title="The Hits" :show-arrows="true" />
    <div class="grid-6">
      <NuxtLink v-for="hit in hits" :key="hit.title" to="/song/reckless-love" class="card">
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
import { hits } from '~/data/mockData'
</script>
