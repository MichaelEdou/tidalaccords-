<template>
  <div class="app-wrapper">
    <AppSidebar active-page="collection" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />
      <div class="collection-content">
        <h1 class="collection-page-title">Albums</h1>
        <div class="collection-empty-state">
          <iconify-icon icon="lucide:disc-3" class="collection-empty-icon" style="font-size: 64px"></iconify-icon>
          <p class="collection-empty-title">Aucun album sauvegardé</p>
          <p class="collection-empty-desc">Les albums que vous ajoutez à votre collection apparaîtront ici.</p>
        </div>
      </div>
    </div>
  </div>
</template>
