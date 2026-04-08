<template>
  <div class="app-wrapper song-page">
    <AppSidebar active-page="music" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />
      <div class="song-content">
        <section class="song-main-column">
          <SongPlayerCard
            v-model:instrument="selectedInstrument"
            v-model:transpose="transposeValue"
          />
          <SongChordSheet :transpose="transposeValue" />
          <SongInstrumentView :instrument="selectedInstrument" :transpose="transposeValue" />
        </section>
        <aside class="song-side-column">
          <SongInfoPanel :transpose="transposeValue" />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedInstrument = ref<'guitar' | 'piano'>('guitar')
const transposeValue = ref(0)
</script>
