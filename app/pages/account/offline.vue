<template>
  <AccountLayout active-section="offline">
    <section class="account-section">
      <h2 class="account-section-title">Appareils hors ligne</h2>
      <div class="account-section-divider"></div>

      <p class="account-field-hint" style="margin-bottom: 8px;">
        Gerez les appareils sur lesquels vous pouvez ecouter de la musique hors ligne.
      </p>

      <div class="account-info-banner">
        <iconify-icon icon="lucide:info" width="18" height="18"></iconify-icon>
        <p>Vous pouvez telecharger sur un maximum de <strong>5 appareils</strong>.</p>
      </div>

      <div class="account-empty-state">
        <iconify-icon icon="lucide:smartphone" width="40" height="40"></iconify-icon>
        <p class="account-empty-state-text">Aucun appareil hors ligne enregistre</p>
        <p class="account-empty-state-hint">Les appareils sur lesquels vous telechargez de la musique apparaitront ici.</p>
      </div>
    </section>

    <section class="account-section">
      <h2 class="account-section-title">Appareils autorises</h2>
      <div class="account-section-divider"></div>

      <div class="account-devices-header">
        <span class="account-devices-count">0 / 5 appareils utilises</span>
      </div>

      <div class="account-empty-state">
        <iconify-icon icon="lucide:monitor-smartphone" width="40" height="40"></iconify-icon>
        <p class="account-empty-state-text">Aucun appareil autorise</p>
        <p class="account-empty-state-hint">Connectez-vous sur un appareil et telechargez du contenu pour qu'il apparaisse ici.</p>
      </div>
    </section>
  </AccountLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>
