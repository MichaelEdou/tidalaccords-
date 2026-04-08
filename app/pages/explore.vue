<template>
  <div class="app-wrapper explore-page">
    <AppSidebar active-page="explore" />
    <div class="main-content" style="overflow-y: auto">
      <TopBar />

      <!-- Content -->
      <div class="explore-content">
        <h1 class="explore-page-title">Top Albums</h1>

        <div class="top-albums-grid">
          <NuxtLink
            v-for="album in topAlbums"
            :key="album.title"
            to="/song"
            class="top-album-card"
          >
            <div class="top-album-img-wrapper">
              <img :src="album.image" :alt="album.title" />
            </div>
            <div class="top-album-info">
              <p class="top-album-title">
                {{ album.title }}
                <span v-if="album.explicit" class="badge-e">E</span>
              </p>
              <p class="top-album-artist">{{ album.artist }}</p>
              <p class="top-album-year">{{ album.year }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const topAlbums = [
  { title: 'Reckless Love', artist: 'Cory Asbury', year: '2018', image: 'https://i.ytimg.com/vi/Sc6SSHuZvQE/hqdefault.jpg', explicit: false },
  { title: 'What A Beautiful Name', artist: 'Hillsong Worship', year: '2016', image: 'https://i.ytimg.com/vi/nQWFzMvCfLE/hqdefault.jpg', explicit: false },
  { title: 'Way Maker', artist: 'Sinach', year: '2015', image: 'https://i.ytimg.com/vi/QM8jQHE5AAk/hqdefault.jpg', explicit: false },
  { title: 'Goodness of God', artist: 'Bethel Music', year: '2019', image: 'https://i.ytimg.com/vi/n0FBb6hnwTo/hqdefault.jpg', explicit: false },
  { title: 'Oceans', artist: 'Hillsong UNITED', year: '2013', image: 'https://i.ytimg.com/vi/OP-00EwLdiU/hqdefault.jpg', explicit: false },
  { title: 'Great Are You Lord', artist: 'All Sons & Daughters', year: '2014', image: 'https://i.ytimg.com/vi/r7V2Ja7LzWg/hqdefault.jpg', explicit: false },
  { title: 'Holy Spirit', artist: 'Francesca Battistelli', year: '2014', image: 'https://i.ytimg.com/vi/UvBBC7-PSHo/hqdefault.jpg', explicit: false },
  { title: 'Graves Into Gardens', artist: 'Elevation Worship', year: '2020', image: 'https://i.ytimg.com/vi/KwX1f2gYKZ4/hqdefault.jpg', explicit: false },
  { title: 'The Blessing', artist: 'Kari Jobe & Cody Carnes', year: '2020', image: 'https://i.ytimg.com/vi/Zp6aygmvzM4/hqdefault.jpg', explicit: false },
  { title: 'Jireh', artist: 'Maverick City Music', year: '2021', image: 'https://i.ytimg.com/vi/mC-zw0zCCtg/hqdefault.jpg', explicit: false },
  { title: 'Build My Life', artist: 'Housefires', year: '2017', image: 'https://i.ytimg.com/vi/FYMjO9mL0Tw/hqdefault.jpg', explicit: false },
  { title: 'Living Hope', artist: 'Phil Wickham', year: '2018', image: 'https://i.ytimg.com/vi/u-1fwZtKJSM/hqdefault.jpg', explicit: false },
  { title: 'Battle Belongs', artist: 'Phil Wickham', year: '2020', image: 'https://i.ytimg.com/vi/qtvQNzPHn-w/hqdefault.jpg', explicit: false },
  { title: 'King of My Heart', artist: 'Bethel Music', year: '2017', image: 'https://i.ytimg.com/vi/pomqj7acJc4/hqdefault.jpg', explicit: false },
  { title: 'How Great Is Our God', artist: 'Chris Tomlin', year: '2004', image: 'https://i.ytimg.com/vi/KBD18rsVJHk/hqdefault.jpg', explicit: false },
  { title: 'Do It Again', artist: 'Elevation Worship', year: '2018', image: 'https://i.ytimg.com/vi/ZOBIPb-6PTc/hqdefault.jpg', explicit: false },
  { title: 'Surrounded', artist: 'UPPERROOM', year: '2019', image: 'https://i.ytimg.com/vi/vx6mfAgHDsY/hqdefault.jpg', explicit: false },
  { title: 'This Is Amazing Grace', artist: 'Phil Wickham', year: '2014', image: 'https://i.ytimg.com/vi/XFRjr_x-yxU/hqdefault.jpg', explicit: false },
  { title: 'Amazing Grace', artist: 'Traditional Hymn', year: '1779', image: 'https://i.ytimg.com/vi/Tvt6E9N7AQw/hqdefault.jpg', explicit: false },
  { title: 'Blessed Assurance', artist: 'Traditional Hymn', year: '1873', image: 'https://i.ytimg.com/vi/HwUzA6I8_U4/hqdefault.jpg', explicit: false },
]
</script>
