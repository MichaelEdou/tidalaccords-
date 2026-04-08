<template>
  <AccountLayout active-section="payment">
    <!-- Moyens de paiement -->
    <section class="account-section">
      <h2 class="account-section-title">Moyens de paiement</h2>
      <div class="account-section-divider"></div>

      <div class="account-empty-state">
        <iconify-icon icon="lucide:credit-card" width="40" height="40"></iconify-icon>
        <p class="account-empty-state-text">Aucun moyen de paiement enregistre</p>
        <p class="account-empty-state-hint">Ajoutez un moyen de paiement pour gerer vos abonnements et achats.</p>
      </div>

      <div class="account-field-actions">
        <button class="account-btn account-btn--dark">
          <iconify-icon icon="lucide:plus" width="16" height="16"></iconify-icon>
          Ajouter un moyen de paiement
        </button>
      </div>
    </section>

    <!-- Adresse de facturation -->
    <section class="account-section">
      <h2 class="account-section-title">Adresse de facturation</h2>
      <div class="account-section-divider"></div>

      <div class="account-field-group">
        <div class="account-field-row">
          <div class="account-field">
            <label class="account-field-label" for="billing-firstname">Prenom</label>
            <input
              id="billing-firstname"
              v-model="billingFirstName"
              type="text"
              class="account-input"
              placeholder="Prenom"
            />
          </div>
          <div class="account-field">
            <label class="account-field-label" for="billing-lastname">Nom</label>
            <input
              id="billing-lastname"
              v-model="billingLastName"
              type="text"
              class="account-input"
              placeholder="Nom"
            />
          </div>
        </div>

        <div class="account-field">
          <label class="account-field-label" for="billing-address">Adresse</label>
          <input
            id="billing-address"
            v-model="billingAddress"
            type="text"
            class="account-input"
            placeholder="Adresse"
          />
        </div>

        <div class="account-field-row">
          <div class="account-field">
            <label class="account-field-label" for="billing-zip">Code postal</label>
            <input
              id="billing-zip"
              v-model="billingZip"
              type="text"
              class="account-input"
              placeholder="Code postal"
            />
          </div>
          <div class="account-field">
            <label class="account-field-label" for="billing-city">Ville</label>
            <input
              id="billing-city"
              v-model="billingCity"
              type="text"
              class="account-input"
              placeholder="Ville"
            />
          </div>
        </div>

        <div class="account-field">
          <label class="account-field-label" for="billing-country">Pays</label>
          <input
            id="billing-country"
            v-model="billingCountry"
            type="text"
            class="account-input"
            placeholder="Pays"
          />
        </div>

        <div class="account-field-actions">
          <button class="account-btn account-btn--dark">
            Enregistrer l'adresse
          </button>
        </div>
      </div>
    </section>

    <!-- Historique de facturation -->
    <section class="account-section">
      <h2 class="account-section-title">Historique de facturation</h2>
      <div class="account-section-divider"></div>

      <div class="account-empty-state">
        <iconify-icon icon="lucide:receipt" width="40" height="40"></iconify-icon>
        <p class="account-empty-state-text">Aucune facture disponible</p>
        <p class="account-empty-state-hint">Vos factures apparaitront ici une fois que vous aurez effectue un paiement.</p>
      </div>
    </section>
  </AccountLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const billingFirstName = ref('')
const billingLastName = ref('')
const billingAddress = ref('')
const billingZip = ref('')
const billingCity = ref('')
const billingCountry = ref('')
</script>
