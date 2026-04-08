<template>
  <aside class="sidebar" :class="{ 'sidebar-collapsed': collapsed }">
    <div class="brand-logo">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L16 6L12 10L8 6L12 2Z" fill="currentColor" />
        <path d="M18 8L22 12L18 16L14 12L18 8Z" fill="currentColor" />
        <path d="M6 8L10 12L6 16L2 12L6 8Z" fill="currentColor" />
        <path d="M12 14L16 18L12 22L8 18L12 14Z" fill="currentColor" />
      </svg>
      <button class="sidebar-collapse-btn" @click="collapsed = !collapsed">
        <iconify-icon
          :icon="collapsed ? 'lucide:panel-right-close' : 'lucide:panel-left-close'"
          style="font-size: 18px"
        ></iconify-icon>
      </button>
    </div>

    <NuxtLink to="/" class="nav-item" :class="{ active: activePage === 'music' }">
      <iconify-icon icon="lucide:music"></iconify-icon>
      <span class="nav-label">Musique</span>
    </NuxtLink>
    <NuxtLink to="/explore" class="nav-item" :class="{ active: activePage === 'explore' }">
      <iconify-icon icon="lucide:mic-2"></iconify-icon>
      <span class="nav-label">Artist</span>
    </NuxtLink>
    <NuxtLink to="/feed" class="nav-item" :class="{ active: activePage === 'feed' }">
      <iconify-icon icon="lucide:bell"></iconify-icon>
      <span class="nav-label">Fil d'actualit&eacute;</span>
    </NuxtLink>

    <div style="height: 12px"></div>

    <!-- Collection with submenu -->
    <div class="nav-item collection-nav-item" ref="collectionRef" @click="toggleSubmenu">
      <iconify-icon icon="lucide:library"></iconify-icon>
      <span class="nav-label">Collection</span>
      <iconify-icon
        icon="lucide:chevron-right"
        class="nav-label"
        style="margin-left: auto; font-size: 16px"
      ></iconify-icon>

      <!-- Collection submenu flyout -->
      <div v-if="showSubmenu" class="collection-submenu" @click.stop>
        <NuxtLink
          v-for="item in submenuItems"
          :key="item.label"
          :to="item.route"
          class="collection-submenu-item"
          @click="showSubmenu = false"
        >
          <iconify-icon :icon="item.icon" style="font-size: 18px"></iconify-icon>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-header">
        <span class="nav-label">Toutes les playlists</span>
        <div class="sidebar-actions">
          <iconify-icon icon="lucide:plus"></iconify-icon>
          <iconify-icon icon="lucide:arrow-up-down"></iconify-icon>
        </div>
      </div>
    </div>

  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps<{
  activePage?: string
}>()

const collapsed = ref(false)
const showSubmenu = ref(false)
const collectionRef = ref<HTMLElement | null>(null)

const submenuItems = [
  { icon: 'lucide:radio', label: 'Mixes & Radio', route: '/collection/mixes' },
  { icon: 'lucide:list-music', label: 'Playlists', route: '/collection/playlists' },
  { icon: 'lucide:disc-3', label: 'Albums', route: '/collection/albums' },
  { icon: 'lucide:music', label: 'Titres', route: '/collection/tracks' },
  { icon: 'lucide:video', label: 'Vidéos', route: '/collection/videos' },
  { icon: 'lucide:users', label: 'Profils', route: '/collection/profiles' },
]

function toggleSubmenu() {
  showSubmenu.value = !showSubmenu.value
}

function onClickOutsideSubmenu(e: MouseEvent) {
  if (collectionRef.value && !collectionRef.value.contains(e.target as Node)) {
    showSubmenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutsideSubmenu, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutsideSubmenu, true)
})
</script>
