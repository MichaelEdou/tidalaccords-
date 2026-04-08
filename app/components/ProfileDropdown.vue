<template>
  <div class="profile-dropdown-wrapper" ref="wrapperRef">
    <div class="profile-avatar" @click="open = !open">
      <iconify-icon icon="lucide:user" style="font-size: 20px"></iconify-icon>
    </div>
    <Transition name="dropdown-fade">
      <div v-if="open" class="profile-dropdown">
        <NuxtLink to="/account" class="profile-dropdown-item" @click="close">Profil</NuxtLink>
        <NuxtLink to="/account" class="profile-dropdown-item" @click="close">Gérer mon abonnement</NuxtLink>
        <NuxtLink to="/settings" class="profile-dropdown-item" @click="close">Paramètres</NuxtLink>
        <div class="profile-dropdown-item has-chevron" @click="close">
          <span>Aide</span>
          <iconify-icon icon="lucide:chevron-right" style="font-size: 16px; color: var(--muted-foreground)"></iconify-icon>
        </div>
        <div class="profile-dropdown-item has-chevron" @click="close">
          <span>Mentions légales</span>
          <iconify-icon icon="lucide:chevron-right" style="font-size: 16px; color: var(--muted-foreground)"></iconify-icon>
        </div>
        <div class="profile-dropdown-divider"></div>
        <div class="profile-dropdown-item logout" @click="handleLogout">Se déconnecter</div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { logout } = useAuth()
const router = useRouter()
const open = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

function close() {
  open.value = false
}

function handleLogout() {
  close()
  logout()
  router.push('/')
}

function handleClickOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.profile-dropdown-wrapper {
  position: relative;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: #1a1a1a;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 8px 0;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.profile-dropdown-item {
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.profile-dropdown-item.logout {
  color: #e63946;
}

.profile-dropdown-divider {
  height: 1px;
  background: var(--border);
  margin: 4px 0;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
