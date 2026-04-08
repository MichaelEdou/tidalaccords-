<template>
  <div class="section-header" :style="headerStyle">
    <div>
      <h3 class="section-title" :style="titleStyle">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p v-if="subtitle" style="margin: 4px 0 0 0; font-size: 13px; color: var(--muted-foreground); font-weight: 500">
        {{ subtitle }}
      </p>
    </div>
    <div class="section-actions">
      <div v-if="showArrows" class="nav-arrows">
        <iconify-icon icon="lucide:chevron-left" style="font-size: 20px; color: var(--border)"></iconify-icon>
        <iconify-icon icon="lucide:chevron-right" style="font-size: 20px"></iconify-icon>
      </div>
      <a href="#" class="view-all">View all</a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  showArrows?: boolean
  headerStyle?: Record<string, string>
  titleStyle?: Record<string, string>
}>()
</script>
