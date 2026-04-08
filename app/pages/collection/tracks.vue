<template>
  <div class="app-wrapper">
    <AppSidebar active-page="collection" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />
      <div class="collection-content">
        <h1 class="collection-page-title">Titres</h1>
        <div class="collection-empty-state">
          <iconify-icon icon="lucide:music" class="collection-empty-icon" style="font-size: 64px"></iconify-icon>
          <p class="collection-empty-title">Aucun titre sauvegardé</p>
          <p class="collection-empty-desc">Les titres que vous aimez apparaîtront ici.</p>
        </div>
      </div>
    </div>
  </div>
</template>
