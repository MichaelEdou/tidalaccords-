<template>
  <AccountLayout active-section="apps">
    <section class="account-section">
      <h2 class="account-section-title">Applications tierces</h2>
      <div class="account-section-divider"></div>

      <p class="account-field-hint" style="margin-bottom: 24px;">
        Gerez les applications qui ont acces a votre compte Phinaccords.
      </p>

      <div class="account-empty-state">
        <iconify-icon icon="lucide:puzzle" width="40" height="40"></iconify-icon>
        <p class="account-empty-state-text">Aucune application tierce connectee</p>
        <p class="account-empty-state-hint">Les applications auxquelles vous autorisez l'acces a votre compte apparaitront ici. Vous pourrez revoquer leur acces a tout moment.</p>
      </div>
    </section>

    <!-- Example connected app pattern (hidden, for when apps exist) -->
    <section v-if="connectedApps.length > 0" class="account-section">
      <h2 class="account-section-title">Applications connectees</h2>
      <div class="account-section-divider"></div>

      <div class="account-apps-list">
        <div
          v-for="app in connectedApps"
          :key="app.id"
          class="account-app-item"
        >
          <div class="account-app-icon">
            <iconify-icon :icon="app.icon" width="24" height="24"></iconify-icon>
          </div>
          <div class="account-app-info">
            <p class="account-app-name">{{ app.name }}</p>
            <p class="account-app-perms">{{ app.permissions }}</p>
          </div>
          <button class="account-btn account-btn--outline account-btn--small" @click="revokeApp(app.id)">
            Revoquer l'acces
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

interface ConnectedApp {
  id: string
  name: string
  icon: string
  permissions: string
}

const connectedApps = ref<ConnectedApp[]>([])

function revokeApp(appId: string) {
  connectedApps.value = connectedApps.value.filter(a => a.id !== appId)
}
</script>
