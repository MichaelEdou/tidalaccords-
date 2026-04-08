<template>
  <div class="subscribe-page">
    <!-- Top bar -->
    <header class="subscribe-topbar">
      <NuxtLink to="/" class="brand-name">Phinaccords</NuxtLink>
      <NuxtLink to="/account" class="account-link">Mon compte</NuxtLink>
    </header>

    <!-- Hero -->
    <section class="subscribe-hero">
      <h1>Choisissez votre abonnement</h1>
    </section>

    <!-- Pricing cards -->
    <div class="pricing-cards">
      <!-- Individual -->
      <div class="pricing-card">
        <span class="pricing-card-badge">OFFRE LA PLUS AVANTAGEUSE</span>
        <h3 class="pricing-card-tier">
          Individual
          <iconify-icon icon="lucide:check-circle-2" class="check-icon"></iconify-icon>
        </h3>
        <p class="pricing-card-price">
          C$10.99/mois <span class="tax-note">+ taxe applicable</span>
        </p>
        <p class="pricing-card-desc">Notre abonnement le plus populaire.</p>
        <ul class="pricing-card-features">
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            110M+ titres en streaming
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Qualité HiFi, FLAC &amp; Dolby Atmos
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Écoute hors ligne
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Mixs personnalisés
          </li>
        </ul>
        <button class="pricing-card-btn primary">Choisir Individual</button>
      </div>

      <!-- Family -->
      <div class="pricing-card">
        <h3 class="pricing-card-tier">Family</h3>
        <p class="pricing-card-price">
          C$16.99/mois <span class="tax-note">+ taxe applicable</span>
        </p>
        <p class="pricing-card-desc">De la musique pour toute la famille.</p>
        <ul class="pricing-card-features">
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            110M+ titres en streaming
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Qualité HiFi &amp; FLAC
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Écoute hors ligne
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Contrôle parental
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Jusqu'à 6 comptes
          </li>
        </ul>
        <button class="pricing-card-btn outline">Choisir Family</button>
      </div>

      <!-- Student -->
      <div class="pricing-card highlighted">
        <h3 class="pricing-card-tier">Student</h3>
        <p class="pricing-card-price">
          C$5.49/mois <span class="tax-note">+ taxe applicable</span>
        </p>
        <p class="pricing-card-desc">Les étudiants éligibles économisent plus de 50%.</p>
        <ul class="pricing-card-features">
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            110M+ titres en streaming
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Qualité HiFi, FLAC &amp; Dolby Atmos
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Écoute hors ligne
          </li>
          <li>
            <iconify-icon icon="lucide:check"></iconify-icon>
            Playlists étudiantes exclusives
          </li>
        </ul>
        <button class="pricing-card-btn outline">Choisir Student</button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="subscribe-footer">
      <span>&copy; 2026 Phinaccords. Tous droits réservés.</span>
      <div class="subscribe-footer-links">
        <a href="#">Conditions d'utilisation</a>
        <a href="#">Politique de confidentialité</a>
        <a href="#">Mentions légales</a>
        <a href="#">Accessibilité</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const trialEnabled = ref(false)
</script>
