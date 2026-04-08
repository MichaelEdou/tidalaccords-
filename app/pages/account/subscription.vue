<template>
  <AccountLayout active-section="subscription">
    <!-- Plan actuel -->
    <section class="account-section">
      <h2 class="account-section-title">Abonnement actuel</h2>
      <div class="account-section-divider"></div>

      <div class="account-subscription">
        <div class="account-subscription-row">
          <span class="account-subscription-label">Plan</span>
          <span class="account-subscription-value">Aucun abonnement actif</span>
        </div>
        <div class="account-subscription-divider"></div>
        <div class="account-subscription-row">
          <span class="account-subscription-label">Statut</span>
          <span class="account-subscription-value account-subscription-value--inactive">Inactif</span>
        </div>
      </div>

      <div class="account-field-actions">
        <NuxtLink to="/subscribe" class="account-btn account-btn--dark">
          Changer d'abonnement
        </NuxtLink>
      </div>
    </section>

    <!-- Avantages -->
    <section class="account-section">
      <h2 class="account-section-title">Avantages de l'abonnement</h2>
      <div class="account-section-divider"></div>

      <div class="account-benefits-list">
        <div class="account-benefit-item">
          <iconify-icon icon="lucide:music" width="20" height="20"></iconify-icon>
          <div class="account-benefit-content">
            <p class="account-benefit-title">Audio haute fidelite</p>
            <p class="account-benefit-desc">Ecoutez en qualite HiFi, Master et jusqu'a 24-bit/192kHz.</p>
          </div>
        </div>
        <div class="account-benefit-item">
          <iconify-icon icon="lucide:download" width="20" height="20"></iconify-icon>
          <div class="account-benefit-content">
            <p class="account-benefit-title">Ecoute hors ligne</p>
            <p class="account-benefit-desc">Telechargez vos morceaux favoris pour les ecouter sans connexion.</p>
          </div>
        </div>
        <div class="account-benefit-item">
          <iconify-icon icon="lucide:ban" width="20" height="20"></iconify-icon>
          <div class="account-benefit-content">
            <p class="account-benefit-title">Sans publicite</p>
            <p class="account-benefit-desc">Profitez d'une experience musicale sans interruption.</p>
          </div>
        </div>
        <div class="account-benefit-item">
          <iconify-icon icon="lucide:headphones" width="20" height="20"></iconify-icon>
          <div class="account-benefit-content">
            <p class="account-benefit-title">Audio spatial Dolby Atmos</p>
            <p class="account-benefit-desc">Vivez une experience sonore immersive avec le son spatial.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Historique -->
    <section class="account-section">
      <h2 class="account-section-title">Historique d'abonnement</h2>
      <div class="account-section-divider"></div>

      <div class="account-empty-state">
        <iconify-icon icon="lucide:calendar-x" width="40" height="40"></iconify-icon>
        <p class="account-empty-state-text">Aucun historique d'abonnement</p>
        <p class="account-empty-state-hint">Votre historique d'abonnement apparaitra ici une fois que vous aurez souscrit a un plan.</p>
      </div>
    </section>
  </AccountLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>
