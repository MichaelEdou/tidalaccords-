<template>
  <div class="app-wrapper">
    <AppSidebar active-page="collection" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />
      <div class="collection-content">
        <div class="collection-header">
          <div>
            <h1 class="collection-page-title">Playlists</h1>
            <p class="collection-subtitle">Créez et gérez vos playlists</p>
          </div>
          <button class="collection-create-btn">Créer une playlist</button>
        </div>
        <div class="collection-empty-state">
          <iconify-icon icon="lucide:list-music" class="collection-empty-icon" style="font-size: 64px"></iconify-icon>
          <p class="collection-empty-title">Aucune playlist</p>
          <p class="collection-empty-desc">Créez votre première playlist pour commencer à organiser votre musique.</p>
        </div>
      </div>
    </div>
  </div>
</template>
