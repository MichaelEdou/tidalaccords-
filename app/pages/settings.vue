<template>
  <div class="app-wrapper settings-page">
    <AppSidebar active-page="settings" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />

      <!-- Settings content -->
      <div class="settings-content">
        <h1 class="settings-page-title">Paramètres</h1>

        <!-- Tabs -->
        <div class="settings-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="settings-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Qualité audio -->
        <section class="settings-section">
          <h3 class="settings-section-title">Qualité audio</h3>
          <div class="quality-options">
            <div
              v-for="option in qualityOptions"
              :key="option.id"
              class="quality-option"
              @click="audioQuality = option.id"
            >
              <div class="quality-radio" :class="{ selected: audioQuality === option.id }">
                <div v-if="audioQuality === option.id" class="quality-radio-dot"></div>
              </div>
              <span class="quality-option-label">{{ option.label }}</span>
              <span class="quality-option-desc">{{ option.desc }}</span>
            </div>
          </div>
        </section>

        <hr class="settings-divider" />

        <!-- Streaming adaptatif -->
        <section class="settings-section">
          <div class="setting-row">
            <div class="setting-row-left">
              <span class="setting-label">Streaming adaptatif</span>
              <span class="setting-sublabel">Ajuste automatiquement la qualité selon votre connexion</span>
            </div>
            <label class="st-toggle">
              <input v-model="adaptiveStreaming" type="checkbox" />
              <span class="st-toggle-track"></span>
            </label>
          </div>
        </section>

        <hr class="settings-divider" />

        <!-- Lecture -->
        <section class="settings-section">
          <h3 class="settings-section-title">Lecture</h3>
          <div class="setting-row">
            <div class="setting-row-left">
              <span class="setting-label">Normaliser le volume</span>
              <span class="setting-sublabel">Équilibre le volume entre les titres</span>
            </div>
            <label class="st-toggle">
              <input v-model="normalizeVolume" type="checkbox" />
              <span class="st-toggle-track"></span>
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-row-left">
              <span class="setting-label">Lecture automatique</span>
              <span class="setting-sublabel">Continue la lecture à la fin de la file d'attente</span>
            </div>
            <label class="st-toggle">
              <input v-model="autoPlay" type="checkbox" />
              <span class="st-toggle-track"></span>
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-row-left">
              <span class="setting-label">Contenu explicite</span>
              <span class="setting-sublabel">Autoriser la lecture de contenu explicite</span>
            </div>
            <label class="st-toggle">
              <input v-model="explicitContent" type="checkbox" />
              <span class="st-toggle-track"></span>
            </label>
          </div>
        </section>

        <hr class="settings-divider" />

        <!-- Bravo -->
        <section class="settings-section">
          <h3 class="settings-section-title">Bravo</h3>
          <div class="setting-row-link">
            <span class="setting-label">Affichez et modifiez votre collection Bravo</span>
            <iconify-icon icon="lucide:chevron-right"></iconify-icon>
          </div>
        </section>

        <hr class="settings-divider" />

        <!-- Affichage -->
        <section class="settings-section">
          <h3 class="settings-section-title">Affichage</h3>
          <div class="setting-row">
            <div class="setting-row-left">
              <span class="setting-label">Métadonnées audio</span>
              <span class="setting-sublabel">Afficher les informations de qualité audio sur les titres</span>
            </div>
            <label class="st-toggle">
              <input v-model="showMetadata" type="checkbox" />
              <span class="st-toggle-track"></span>
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-row-left">
              <span class="setting-label">Masquer l'onglet Importations</span>
              <span class="setting-sublabel">Masquer l'onglet Importations dans la barre latérale</span>
            </div>
            <label class="st-toggle">
              <input v-model="hideImports" type="checkbox" />
              <span class="st-toggle-track"></span>
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-row-left">
              <span class="setting-label">Afficher la collection dans la barre latérale</span>
              <span class="setting-sublabel">Afficher votre collection directement dans la navigation</span>
            </div>
            <label class="st-toggle">
              <input v-model="showCollection" type="checkbox" />
              <span class="st-toggle-track"></span>
            </label>
          </div>
        </section>

        <hr class="settings-divider" />

        <!-- Connecter -->
        <section class="settings-section">
          <h3 class="settings-section-title">Connecter</h3>
          <div class="connect-row">
            <div class="connect-row-left">
              <iconify-icon icon="simple-icons:lastdotfm"></iconify-icon>
              <span>Last.fm</span>
            </div>
            <button class="connect-btn">Connecter</button>
          </div>
        </section>

        <hr class="settings-divider" />

        <!-- Préférences -->
        <section class="settings-section">
          <h3 class="settings-section-title">Préférences</h3>
          <div class="setting-row">
            <div class="setting-row-left">
              <span class="setting-label">Langue</span>
            </div>
            <select v-model="language" class="settings-select">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="pt">Português</option>
            </select>
          </div>
          <div class="setting-row-link">
            <span class="setting-label">Préférences de confidentialité</span>
            <iconify-icon icon="lucide:chevron-right"></iconify-icon>
          </div>
          <div class="setting-row-external">
            <span class="setting-label">Conditions</span>
            <iconify-icon icon="lucide:external-link"></iconify-icon>
          </div>
          <div class="setting-row-external">
            <span class="setting-label">Avis de confidentialité</span>
            <iconify-icon icon="lucide:external-link"></iconify-icon>
          </div>
          <div class="setting-row-external">
            <span class="setting-label">Déclaration d'accessibilité</span>
            <iconify-icon icon="lucide:external-link"></iconify-icon>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref('general')

const tabs = [
  { id: 'general', label: 'Général' },
  { id: 'account', label: 'Compte' },
  { id: 'european', label: 'Européen' },
]

// Audio quality
const audioQuality = ref('max')
const qualityOptions = [
  { id: 'low', label: 'Faible', desc: '96 kbps' },
  { id: 'high', label: 'Haute', desc: '320 kbps' },
  { id: 'max', label: 'Max', desc: 'Jusqu\'à 9216 kbps (FLAC)' },
]

// Toggles
const adaptiveStreaming = ref(false)
const normalizeVolume = ref(true)
const autoPlay = ref(true)
const explicitContent = ref(false)
const showMetadata = ref(false)
const hideImports = ref(false)
const showCollection = ref(true)

// Preferences
const language = ref('fr')
</script>
