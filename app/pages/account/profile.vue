<template>
  <AccountLayout active-section="profile" :email="email">
    <!-- Informations de connexion -->
    <section class="account-section">
      <h2 class="account-section-title">Informations de connexion</h2>
      <div class="account-section-divider"></div>

      <div class="account-field-group">
        <div class="account-field">
          <label class="account-field-label">Nom de connexion</label>
          <div class="account-field-value">{{ loginName }}</div>
          <p class="account-field-hint">
            Votre nom de connexion est l'identifiant que vous utilisez pour vous connecter a Phinaccords.
          </p>
        </div>

        <div class="account-field">
          <label class="account-field-label">Mot de passe actuel</label>
          <div class="account-field-value account-field-value--password">&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</div>
        </div>

        <button class="account-btn account-btn--dark">
          Changer le mot de passe
        </button>
      </div>
    </section>

    <!-- Informations generales -->
    <section class="account-section">
      <h2 class="account-section-title">Informations generales</h2>
      <div class="account-section-divider"></div>

      <div class="account-field-group">
        <div class="account-field-row">
          <div class="account-field">
            <label class="account-field-label" for="field-lastname">Nom</label>
            <input
              id="field-lastname"
              v-model="lastName"
              type="text"
              class="account-input"
              placeholder="Votre nom"
            />
          </div>
          <div class="account-field">
            <label class="account-field-label" for="field-firstname">Prenom</label>
            <input
              id="field-firstname"
              v-model="firstName"
              type="text"
              class="account-input"
              placeholder="Votre prenom"
            />
          </div>
        </div>

        <div class="account-field">
          <label class="account-field-label" for="field-birthdate">Date de naissance</label>
          <input
            id="field-birthdate"
            v-model="birthDate"
            type="date"
            class="account-input"
          />
        </div>

        <div class="account-field">
          <label class="account-field-label" for="field-email">E-mail</label>
          <input
            id="field-email"
            v-model="email"
            type="email"
            class="account-input"
            placeholder="votre@email.com"
          />
        </div>

        <div class="account-field">
          <label class="account-field-label" for="field-nostr">
            Cle publique Nostr
            <iconify-icon icon="lucide:info" width="14" height="14" class="account-field-info-icon"></iconify-icon>
          </label>
          <input
            id="field-nostr"
            v-model="nostrPublicKey"
            type="text"
            class="account-input"
            placeholder="npub1..."
          />
        </div>

        <div class="account-field-actions">
          <button class="account-btn account-btn--dark">
            Modifier les informations
          </button>
          <button class="account-btn account-btn--danger-text">
            Supprimer le compte
          </button>
        </div>
      </div>
    </section>

    <!-- Votre abonnement -->
    <section class="account-section">
      <h2 class="account-section-title">Votre abonnement</h2>
      <div class="account-section-divider"></div>

      <div class="account-subscription">
        <div class="account-subscription-row">
          <span class="account-subscription-label">Abonnement</span>
          <span class="account-subscription-value">{{ subscriptionStatus }}</span>
        </div>
        <div class="account-subscription-divider"></div>
        <div class="account-subscription-row">
          <span class="account-subscription-label">Moyen de paiement</span>
          <span class="account-subscription-value">{{ paymentMethod }}</span>
        </div>
      </div>

      <div class="account-field-actions">
        <NuxtLink to="/subscribe" class="account-btn account-btn--dark">
          Votre abonnement
        </NuxtLink>
        <button class="account-btn account-btn--outline">
          Details du paiement
        </button>
      </div>
    </section>
  </AccountLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const loginName = ref('utilisateur@email.com')
const lastName = ref('')
const firstName = ref('')
const birthDate = ref('')
const email = ref('utilisateur@email.com')
const nostrPublicKey = ref('')
const subscriptionStatus = ref('Aucun abonnement actif')
const paymentMethod = ref('Aucun moyen de paiement')
</script>
