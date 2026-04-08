<template>
  <div class="search-dropdown-wrapper" ref="wrapperRef">
    <slot :inputAttrs="inputAttrs" :inputEvents="inputEvents"></slot>
    <div v-if="showDropdown && query.length > 0" class="search-dropdown">
      <!-- Query Suggestions -->
      <div class="search-dropdown-section">
        <div
          v-for="(suggestion, i) in filteredSuggestions"
          :key="'s-' + i"
          class="search-dropdown-item search-dropdown-suggestion"
          @click="selectSuggestion(suggestion)"
        >
          <iconify-icon icon="lucide:search" style="font-size: 16px; color: var(--muted-foreground); flex-shrink: 0"></iconify-icon>
          <span class="search-dropdown-suggestion-text" v-html="highlightMatch(suggestion, query)"></span>
        </div>
      </div>

      <!-- Artist Direct Hits -->
      <div v-if="matchedArtists.length > 0" class="search-dropdown-section">
        <div class="search-dropdown-section-label">Artistes</div>
        <div
          v-for="artist in matchedArtists"
          :key="'a-' + artist.name"
          class="search-dropdown-item search-dropdown-artist"
        >
          <img :src="artist.image" :alt="artist.name" class="search-dropdown-artist-img" />
          <span class="search-dropdown-item-name">{{ artist.name }}</span>
          <iconify-icon icon="lucide:more-horizontal" class="search-dropdown-dots"></iconify-icon>
        </div>
      </div>

      <!-- Track Direct Hits -->
      <div v-if="matchedTracks.length > 0" class="search-dropdown-section">
        <div class="search-dropdown-section-label">Titres</div>
        <div
          v-for="track in matchedTracks"
          :key="'t-' + track.title"
          class="search-dropdown-item search-dropdown-track"
        >
          <div class="search-dropdown-track-img-wrapper">
            <img :src="track.image" :alt="track.title" />
            <div class="search-dropdown-track-play-overlay">
              <iconify-icon icon="lucide:play" style="font-size: 14px; color: #fff"></iconify-icon>
            </div>
          </div>
          <div class="search-dropdown-track-info">
            <span class="search-dropdown-track-title">{{ track.title }}</span>
            <span class="search-dropdown-track-sub">titre &middot; {{ track.artist }}</span>
          </div>
          <iconify-icon icon="lucide:more-horizontal" class="search-dropdown-dots"></iconify-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { popularArtists, trendingTracks } from '~/data/mockData'

const query = ref('')
const showDropdown = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

const allArtists = popularArtists.filter(Boolean)

const allSuggestions = computed(() => {
  const q = query.value.toLowerCase()
  if (!q) return []
  const suggestions: string[] = []
  for (const artist of allArtists) {
    if (artist.name.toLowerCase().includes(q)) {
      suggestions.push(artist.name)
    }
  }
  for (const track of trendingTracks) {
    if (track.title.toLowerCase().includes(q)) {
      suggestions.push(track.title)
    }
    if (track.artist.toLowerCase().includes(q) && !suggestions.includes(track.artist)) {
      suggestions.push(track.artist)
    }
  }
  return suggestions
})

const filteredSuggestions = computed(() => {
  return allSuggestions.value.slice(0, 4)
})

const matchedArtists = computed(() => {
  const q = query.value.toLowerCase()
  if (!q) return []
  return allArtists.filter(a => a.name.toLowerCase().includes(q)).slice(0, 3)
})

const matchedTracks = computed(() => {
  const q = query.value.toLowerCase()
  if (!q) return []
  return trendingTracks.filter(t =>
    t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)
  ).slice(0, 4)
})

function highlightMatch(text: string, q: string) {
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + q.length)
  const after = text.slice(idx + q.length)
  return `${before}<strong>${match}</strong>${after}`
}

function selectSuggestion(suggestion: string) {
  query.value = suggestion
  showDropdown.value = false
}

function onClickOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    showDropdown.value = false
  }
}

const inputAttrs = computed(() => ({
  value: query.value,
}))

const inputEvents = {
  onInput(e: Event) {
    query.value = (e.target as HTMLInputElement).value
    showDropdown.value = query.value.length > 0
  },
  onFocus() {
    if (query.value.length > 0) {
      showDropdown.value = true
    }
  },
}

onMounted(() => {
  document.addEventListener('click', onClickOutside, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, true)
})
</script>
