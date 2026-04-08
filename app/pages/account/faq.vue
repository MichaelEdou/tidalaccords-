<template>
  <AccountLayout active-section="faq">
    <section class="account-section">
      <h2 class="account-section-title">Questions frequemment posees</h2>
      <div class="account-section-divider"></div>

      <div class="account-faq-list">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="account-faq-item"
          :class="{ 'account-faq-item--open': openItems.includes(index) }"
        >
          <button
            class="account-faq-question"
            @click="toggleItem(index)"
            :aria-expanded="openItems.includes(index)"
          >
            <span>{{ item.question }}</span>
            <iconify-icon
              :icon="openItems.includes(index) ? 'lucide:chevron-up' : 'lucide:chevron-down'"
              width="20"
              height="20"
            ></iconify-icon>
          </button>
          <div v-if="openItems.includes(index)" class="account-faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="account-section">
      <h2 class="account-section-title">Besoin d'aide supplementaire ?</h2>
      <div class="account-section-divider"></div>

      <div class="account-field-group">
        <p class="account-field-hint">
          Si vous ne trouvez pas la reponse a votre question, notre equipe de support est la pour vous aider.
        </p>
        <div class="account-field-actions">
          <a href="/support" class="account-btn account-btn--dark">
            <iconify-icon icon="lucide:message-circle" width="16" height="16"></iconify-icon>
            Contacter le support
          </a>
        </div>
      </div>
    </section>
  </AccountLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const openItems = ref<number[]>([])

function toggleItem(index: number) {
  const pos = openItems.value.indexOf(index)
  if (pos === -1) {
    openItems.value.push(index)
  } else {
    openItems.value.splice(pos, 1)
  }
}

const faqItems = [
  {
    question: 'Comment annuler mon abonnement ?',
    answer: 'Pour annuler votre abonnement, rendez-vous dans la section "Abonnement" de votre compte. Cliquez sur "Gerer l\'abonnement" puis selectionnez "Annuler l\'abonnement". Votre acces sera maintenu jusqu\'a la fin de votre periode de facturation en cours.',
  },
  {
    question: 'Comment changer mon mot de passe ?',
    answer: 'Allez dans la section "Profil" de votre compte. Sous "Informations de connexion", cliquez sur "Changer le mot de passe". Vous devrez entrer votre mot de passe actuel puis choisir un nouveau mot de passe. Pour des raisons de securite, choisissez un mot de passe fort contenant au moins 8 caracteres.',
  },
  {
    question: 'Comment telecharger de la musique hors ligne ?',
    answer: 'Pour telecharger de la musique, vous devez disposer d\'un abonnement actif. Ouvrez l\'application Phinaccords sur votre appareil mobile, trouvez l\'album ou la playlist que vous souhaitez telecharger, puis appuyez sur l\'icone de telechargement. Vous pouvez gerer vos appareils hors ligne dans la section "Appareils hors ligne".',
  },
  {
    question: 'Comment contacter le support ?',
    answer: 'Vous pouvez contacter notre equipe de support de plusieurs manieres : par email a support@phinaccords.com, via le chat en direct disponible dans l\'application, ou en visitant notre page de support a l\'adresse phinaccords.com/support. Notre equipe est disponible 7j/7 de 9h a 21h.',
  },
  {
    question: 'Quels sont les modes de paiement acceptes ?',
    answer: 'Phinaccords accepte les cartes de credit et de debit (Visa, Mastercard, American Express), PayPal, les virements bancaires SEPA, Apple Pay, Google Pay, et les paiements en Bitcoin via le reseau Lightning. Vous pouvez gerer vos moyens de paiement dans la section "Paiement".',
  },
  {
    question: 'Comment transferer ma musique depuis un autre service ?',
    answer: 'Phinaccords propose un outil d\'importation qui vous permet de transferer vos playlists et favoris depuis d\'autres services de streaming. Rendez-vous dans les parametres de l\'application, puis selectionnez "Importer depuis un autre service". Suivez les instructions pour connecter votre ancien compte et selectionner le contenu a transferer.',
  },
]
</script>
