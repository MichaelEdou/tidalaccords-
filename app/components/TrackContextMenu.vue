<template>
  <div class="track-ctx-wrapper" ref="wrapperRef">
    <div class="track-ctx-trigger" @click.stop.prevent="toggle">
      <slot>
        <iconify-icon icon="lucide:more-horizontal" style="font-size: 20px; color: var(--muted-foreground); cursor: pointer"></iconify-icon>
      </slot>
    </div>
    <Teleport to="body">
      <div v-if="open" class="track-ctx-backdrop" @click.stop="close"></div>
      <Transition name="ctx-fade">
        <div v-if="open" class="track-ctx-menu" :style="menuStyle" @click.stop>
          <!-- Song info header -->
          <div class="track-ctx-header">
            <img :src="image" :alt="title" class="track-ctx-img" />
            <div class="track-ctx-info">
              <div class="track-ctx-title">{{ title }}</div>
              <div class="track-ctx-artist">{{ artist }}</div>
            </div>
          </div>
          <div class="track-ctx-divider"></div>

          <!-- Menu items -->
          <div class="track-ctx-item" @click="close">Jouer à la suite</div>
          <div class="track-ctx-divider"></div>
          <div class="track-ctx-item has-chevron" @click="close">
            <span>Ajouter à une playlist</span>
            <iconify-icon icon="lucide:chevron-right" style="font-size: 16px; color: var(--muted-foreground)"></iconify-icon>
          </div>
          <div class="track-ctx-item" @click="close">Ajouter à Ma musique</div>
          <div class="track-ctx-item" @click="close">Radio à partir de ce titre</div>
          <div class="track-ctx-divider"></div>
          <div class="track-ctx-item" @click="close">Voir l'album</div>
          <div class="track-ctx-item" @click="close">Crédits</div>
          <div class="track-ctx-item" @click="close">Voir l'artiste</div>
          <div class="track-ctx-divider"></div>
          <div class="track-ctx-item has-chevron" @click="close">
            <span>Partager</span>
            <iconify-icon icon="lucide:chevron-right" style="font-size: 16px; color: var(--muted-foreground)"></iconify-icon>
          </div>
          <div class="track-ctx-item" @click="close">
            <span>Ouvrir dans l'application de bureau</span>
            <iconify-icon icon="lucide:message-circle" style="font-size: 16px; color: var(--muted-foreground)"></iconify-icon>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

defineProps<{
  title?: string
  artist?: string
  image?: string
}>()

const open = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)
const menuStyle = ref<Record<string, string>>({})

function toggle() {
  if (open.value) {
    close()
  } else {
    openMenu()
  }
}

function openMenu() {
  open.value = true
  nextTick(() => {
    if (!wrapperRef.value) return
    const rect = wrapperRef.value.getBoundingClientRect()
    const menuWidth = 280
    const menuHeight = 420

    let top = rect.bottom + 8
    let left = rect.right - menuWidth

    // Keep menu within viewport
    if (left < 8) left = 8
    if (top + menuHeight > window.innerHeight) {
      top = rect.top - menuHeight - 8
      if (top < 8) top = 8
    }

    menuStyle.value = {
      position: 'fixed',
      top: top + 'px',
      left: left + 'px',
    }
  })
}

function close() {
  open.value = false
}
</script>

<style>
.track-ctx-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
}

.track-ctx-wrapper {
  position: relative;
  display: inline-flex;
}

.track-ctx-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.track-ctx-menu {
  position: fixed;
  min-width: 280px;
  max-height: 420px;
  overflow-y: auto;
  background: #282828;
  border-radius: 8px;
  padding: 8px 0;
  z-index: 9999;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
}

.track-ctx-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.track-ctx-img {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
}

.track-ctx-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.track-ctx-title {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-ctx-artist {
  font-size: 13px;
  color: #a3a3a3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-ctx-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
}

.track-ctx-item {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.track-ctx-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.ctx-fade-enter-active,
.ctx-fade-leave-active {
  transition: opacity 0.12s, transform 0.12s;
}

.ctx-fade-enter-from,
.ctx-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
