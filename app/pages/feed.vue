<template>
  <div class="app-wrapper explore-page">
    <AppSidebar active-page="feed" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />

      <!-- Content -->
      <div class="feed-content">
        <h1 class="feed-page-title">Fil d'actualité</h1>

        <div class="feed-empty-state">
          <iconify-icon icon="lucide:bell" style="font-size: 80px; color: var(--muted-foreground); opacity: 0.4"></iconify-icon>
          <p class="feed-empty-text">
            Suivez vos artistes et vos playlists préférés pour obtenir les dernières mises à jour
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
