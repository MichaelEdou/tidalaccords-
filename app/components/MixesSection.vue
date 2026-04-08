<template>
  <div class="section">
    <SectionHeader title="Mixes made for you" :show-arrows="true" />
    <div class="grid-6">
      <NuxtLink v-for="mix in mixes" :key="mix.name" to="/song/reckless-love" class="card">
        <div class="card-img-wrapper">
          <img :src="mix.image" :alt="mix.name" />
          <div class="mix-overlay">
            <div class="mix-type">{{ mix.type }}</div>
            <div class="mix-name">{{ mix.name }}</div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mixes } from '~/data/mockData'
</script>
