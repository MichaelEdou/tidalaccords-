<template>
  <div class="app-wrapper">
    <AppSidebar active-page="collection" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />
      <div class="collection-content">
        <h1 class="collection-page-title">Vidéos</h1>
        <div class="collection-empty-state">
          <iconify-icon icon="lucide:video" class="collection-empty-icon" style="font-size: 64px"></iconify-icon>
          <p class="collection-empty-title">Aucune vidéo sauvegardée</p>
          <p class="collection-empty-desc">Les vidéos que vous ajoutez apparaîtront ici.</p>
        </div>
      </div>
    </div>
  </div>
</template>
