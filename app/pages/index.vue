<template>
  <div class="app-wrapper">
    <AppSidebar active-page="music" />
    <main class="main-content">
      <div class="scroll-area">
        <TopBar />
        <div class="content-padding">
          <SpotlightBanner />
          <HitsSection />
          <PopularAlbums />
          <SpotlightedUploads />
          <PopularArtists />
          <NewAlbums />
          <MixesSection />
          <TrendingTracks />
          <AppFooter />
        </div>
      </div>
    </main>
  </div>
</template>
