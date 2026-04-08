// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Phinaccords',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@100;200;300;400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
      script: [
        { src: 'https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js' },
      ],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag === 'iconify-icon',
    },
  },

  runtimeConfig: {
    chordApiUrl: 'http://62.169.29.146:5100',
    chordApiKey: '',
    youtubeApiKey: '',
  },

  css: [
    '~/assets/css/global.css',
    '~/assets/css/song-page.css',
    '~/assets/css/explore-page.css',
    '~/assets/css/feed-page.css',
    '~/assets/css/login-page.css',
    '~/assets/css/account-page.css',
    '~/assets/css/subscribe-page.css',
    '~/assets/css/settings-page.css',
  ],
})
