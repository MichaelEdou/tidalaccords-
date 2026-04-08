<template>
  <div class="spotlight">
    <div class="spotlight-left">
      <div class="spotlight-title">
        Spotlight
        <iconify-icon
          icon="lucide:arrow-up"
          style="border: 2px solid white; border-radius: 50%; padding: 2px; font-size: 18px; transform: rotate(45deg)"
        ></iconify-icon>
      </div>
      <div class="spotlight-subtitle">Where emerging voices find their stage</div>
    </div>
    <div class="spotlight-center">
      <img
        src="https://storage.googleapis.com/banani-generated-images/generated-images/25d97154-6c8b-46e8-a773-c5a9dbdd8f48.jpg"
        alt="Singer"
      />
    </div>
    <div class="spotlight-right">
      <p>
        Spotlight highlights exceptional Uploads from independent artists, handpicked by our editorial team. Featured songs
        are added to curated playlists and each eligible artist receives $1000 USD when a track is selected.
      </p>
      <NuxtLink
        to="/song"
        class="btn-primary"
        style="background-color: white; color: black; border-radius: 30px; padding: 12px 28px; text-decoration: none"
      >
        Listen Now
      </NuxtLink>
    </div>
  </div>
</template>
