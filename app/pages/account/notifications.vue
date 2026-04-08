<template>
  <AccountLayout active-section="notifications">
    <section class="account-section">
      <h2 class="account-section-title">Preferences de notifications</h2>
      <div class="account-section-divider"></div>

      <p class="account-field-hint" style="margin-bottom: 24px;">
        Gerez les types de notifications que vous souhaitez recevoir de Phinaccords.
      </p>

      <div class="account-toggle-list">
        <div
          v-for="(item, index) in notifications"
          :key="index"
          class="account-toggle-item"
        >
          <div class="account-toggle-info">
            <p class="account-toggle-label">{{ item.label }}</p>
            <p class="account-toggle-desc">{{ item.description }}</p>
          </div>
          <button
            class="account-toggle"
            :class="{ 'account-toggle--active': item.enabled }"
            @click="item.enabled = !item.enabled"
            :aria-label="item.label"
            role="switch"
            :aria-checked="item.enabled"
          >
            <span class="account-toggle-knob"></span>
          </button>
        </div>
      </div>
    </section>
  </AccountLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const notifications = reactive([
  {
    label: 'Nouveautes et recommandations',
    description: 'Recevez des suggestions personnalisees basees sur vos habitudes d\'ecoute.',
    enabled: true,
  },
  {
    label: 'Mises a jour de playlists',
    description: 'Soyez informe lorsque vos playlists suivies sont mises a jour.',
    enabled: true,
  },
  {
    label: 'Offres et promotions',
    description: 'Recevez des offres speciales et des promotions exclusives.',
    enabled: false,
  },
  {
    label: 'Alertes de compte',
    description: 'Notifications importantes concernant votre compte et votre securite.',
    enabled: true,
  },
  {
    label: 'Newsletter Phinaccords',
    description: 'Restez informe des dernieres actualites et fonctionnalites de Phinaccords.',
    enabled: false,
  },
])
</script>
