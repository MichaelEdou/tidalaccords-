<template>
  <header class="top-bar">
    <div class="nav-arrows">
      <iconify-icon icon="lucide:chevron-left" style="font-size: 24px; cursor: pointer"></iconify-icon>
      <iconify-icon icon="lucide:chevron-right" style="font-size: 24px; cursor: pointer; color: var(--border)"></iconify-icon>
    </div>

    <div class="top-actions">
      <SearchDropdown v-slot="{ inputAttrs, inputEvents }">
        <div class="search-bar">
          <iconify-icon icon="lucide:search" style="font-size: 18px"></iconify-icon>
          <input
            type="text"
            placeholder="Search"
            :value="inputAttrs.value"
            @input="inputEvents.onInput"
            @focus="inputEvents.onFocus"
          />
        </div>
      </SearchDropdown>

      <!-- Theme toggle (always visible) -->
      <button class="theme-toggle-btn" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
        <iconify-icon
          :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
          style="font-size: 20px"
        ></iconify-icon>
      </button>

      <!-- Logged out state -->
      <template v-if="!isLoggedIn">
        <button class="btn-link">Download Phinaccords</button>
        <NuxtLink to="/login" class="btn-link">Log in</NuxtLink>
        <NuxtLink to="/signup" class="btn-primary" style="text-decoration: none">Create a free account</NuxtLink>
      </template>

      <!-- Logged in state -->
      <template v-else>
        <ProfileDropdown />
        <NuxtLink to="/subscribe" class="btn-subscribe">S'abonner</NuxtLink>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
const { isLoggedIn } = useAuth()
const { isDark, toggleTheme } = useTheme()
</script>
