<template>
  <div class="account-page">
    <!-- Top Navigation Bar -->
    <header class="account-nav">
      <div class="account-nav-inner">
        <NuxtLink to="/" class="account-nav-logo" aria-label="Phinaccords home">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L28 16L16 30L4 16L16 2Z" fill="#33ffee" />
            <path d="M16 8L22 16L16 24L10 16L16 8Z" fill="#000" />
          </svg>
          <span class="account-nav-logo-text">Phinaccords</span>
        </NuxtLink>
        <nav class="account-nav-links">
          <a href="/about" class="account-nav-link">A propos de Phinaccords</a>
          <a href="/support" class="account-nav-link">Service client &amp; aide</a>
          <NuxtLink to="/account" class="account-nav-link account-nav-link--active">
            <iconify-icon icon="lucide:user" width="16" height="16"></iconify-icon>
            Mon compte
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero Banner -->
    <section v-if="showHeroBanner" class="account-hero">
      <div class="account-hero-inner">
        <div class="account-hero-content">
          <h1 class="account-hero-title">
            Entendez <em>chaque</em> note.
          </h1>
          <NuxtLink to="/subscribe" class="account-hero-cta">
            Decouvrir les abonnements
          </NuxtLink>
        </div>
        <div class="account-hero-visual">
          <div class="account-hero-collage">
            <div class="account-hero-collage-item account-hero-collage-item--1"></div>
            <div class="account-hero-collage-item account-hero-collage-item--2"></div>
            <div class="account-hero-collage-item account-hero-collage-item--3"></div>
            <div class="account-hero-collage-item account-hero-collage-item--4"></div>
          </div>
        </div>
        <button class="account-hero-close" @click="showHeroBanner = false" aria-label="Fermer la banniere">
          <iconify-icon icon="lucide:x" width="20" height="20"></iconify-icon>
        </button>
      </div>
    </section>

    <!-- Profile Card + Body -->
    <div class="account-content">
      <!-- User Profile Card -->
      <div class="account-profile-card">
        <div class="account-profile-avatar">
          <iconify-icon icon="lucide:user" width="48" height="48"></iconify-icon>
        </div>
        <p class="account-profile-email">{{ email }}</p>
        <p class="account-profile-status">Aucun abonnement actif</p>
      </div>

      <!-- Body: Sidebar + Main -->
      <div class="account-body">
        <!-- Sidebar Navigation -->
        <aside class="account-sidebar">
          <nav class="account-sidebar-nav">
            <NuxtLink
              v-for="item in sidebarItems"
              :key="item.id"
              :to="item.to"
              class="account-sidebar-item"
              :class="{
                'account-sidebar-item--active': activeSection === item.id,
                'account-sidebar-item--danger': item.danger
              }"
              @click="item.danger ? handleLogout($event) : undefined"
            >
              <iconify-icon :icon="item.icon" width="18" height="18"></iconify-icon>
              <span>{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="account-main">
          <slot />
        </main>
      </div>
    </div>

    <!-- Footer -->
    <footer class="account-footer">
      <div class="account-footer-inner">
        <div class="account-footer-top">
          <div class="account-footer-brand">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L28 16L16 30L4 16L16 2Z" fill="#191919" />
              <path d="M16 8L22 16L16 24L10 16L16 8Z" fill="#fff" />
            </svg>
            <span>&copy; 2026 Phinaccords</span>
          </div>
          <nav class="account-footer-links">
            <a href="/privacy">Avis de confidentialite</a>
            <a href="/terms">Conditions generales d'utilisation</a>
            <a href="/cookies">Parametres des cookies</a>
            <a href="/accessibility">Declaration d'accessibilite</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
        <div class="account-footer-bottom">
          <button class="account-footer-lang">
            <iconify-icon icon="lucide:globe" width="16" height="16"></iconify-icon>
            Francais
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Props {
  activeSection: string
  email?: string
}

const props = withDefaults(defineProps<Props>(), {
  email: 'utilisateur@email.com',
})

const showHeroBanner = ref(true)

const sidebarItems = [
  { id: 'profile', label: 'Profil', icon: 'lucide:user', to: '/account/profile', danger: false },
  { id: 'subscription', label: 'Abonnement', icon: 'lucide:credit-card', to: '/account/subscription', danger: false },
  { id: 'payment', label: 'Paiement', icon: 'lucide:wallet', to: '/account/payment', danger: false },
  { id: 'notifications', label: 'Notifications', icon: 'lucide:bell', to: '/account/notifications', danger: false },
  { id: 'offline', label: 'Appareils hors ligne', icon: 'lucide:smartphone', to: '/account/offline', danger: false },
  { id: 'apps', label: 'Applications tierces', icon: 'lucide:puzzle', to: '/account/apps', danger: false },
  { id: 'redeem', label: 'Echanger', icon: 'lucide:gift', to: '/account/redeem', danger: false },
  { id: 'faq', label: 'FAQ', icon: 'lucide:help-circle', to: '/account/faq', danger: false },
  { id: 'logout', label: 'Se deconnecter', icon: 'lucide:log-out', to: '#', danger: true },
]

function handleLogout(e: Event) {
  e.preventDefault()
  navigateTo('/login')
}
</script>

<style>
@import '~/assets/css/account-page.css';
</style>
