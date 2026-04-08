<template>
  <AccountLayout active-section="redeem">
    <section class="account-section">
      <h2 class="account-section-title">Echanger un code</h2>
      <div class="account-section-divider"></div>

      <div class="account-redeem-card">
        <div class="account-redeem-icon">
          <iconify-icon icon="lucide:gift" width="48" height="48"></iconify-icon>
        </div>

        <p class="account-redeem-desc">
          Entrez un code cadeau ou promotionnel pour activer votre abonnement.
        </p>

        <div class="account-redeem-form">
          <div class="account-field">
            <label class="account-field-label" for="redeem-code">Code</label>
            <input
              id="redeem-code"
              v-model="redeemCode"
              type="text"
              class="account-input"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              style="max-width: 360px; text-transform: uppercase; letter-spacing: 1px;"
            />
          </div>

          <button
            class="account-btn account-btn--dark"
            :disabled="!redeemCode.trim()"
            @click="handleRedeem"
          >
            <iconify-icon icon="lucide:gift" width="16" height="16"></iconify-icon>
            Echanger
          </button>
        </div>

        <p v-if="redeemMessage" class="account-redeem-message" :class="{ 'account-redeem-message--error': redeemError }">
          {{ redeemMessage }}
        </p>
      </div>
    </section>
  </AccountLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const redeemCode = ref('')
const redeemMessage = ref('')
const redeemError = ref(false)

function handleRedeem() {
  if (!redeemCode.value.trim()) return
  redeemError.value = true
  redeemMessage.value = 'Code invalide. Veuillez verifier et reessayer.'
}
</script>
