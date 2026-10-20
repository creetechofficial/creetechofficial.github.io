// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    'nuxt-lottie',
  ],
  css: ['@/assets/css/theme.css'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
      adminPin: process.env.ADMIN_PIN || '1234',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
