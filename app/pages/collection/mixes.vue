<template>
  <div class="app-wrapper">
    <AppSidebar active-page="collection" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />
      <div class="collection-content">
        <h1 class="collection-page-title">Mixes &amp; Radio</h1>
        <div class="collection-empty-state">
          <iconify-icon icon="lucide:radio" class="collection-empty-icon" style="font-size: 64px"></iconify-icon>
          <p class="collection-empty-title">Aucun mix disponible</p>
          <p class="collection-empty-desc">Vos mixes personnalisés et stations de radio apparaîtront ici.</p>
        </div>
      </div>
    </div>
  </div>
</template>
