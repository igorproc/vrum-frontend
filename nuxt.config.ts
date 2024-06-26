import AppConfig from './config/app.config'
import ViteConfig from './config/vite.config'
import TypographyConfig from './config/typography.config'
import ExperimentalConfig from './config/exprerimantal.config'

const isProd = process.env.APP_MODE === 'production'
const isSsr = !!process.env.IS_SSR
const proxyEnabled = !!process.env.PROXY_ENABLED
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: AppConfig,
  srcDir: 'app',
  ssr: isSsr,
  // Rewrite Components Prefix
  components: {
    dirs: [
      {
        global: true,
        path: '~/components/ui',
        pathPrefix: true,
        prefix: 'Ui',
      },
      {
        path: '~/components/layout',
        pathPrefix: true,
        prefix: 'Layout',
      },
      {
        path: '~/components/common',
        pathPrefix: true,
        prefix: 'Common',
      },
      {
        path: '~/components',
        pathPrefix: true,
        prefix: 'App',
      },
    ],
  },
  // import styles
  css: [
    '@/assets/stylesheets/main.scss',
  ],
  // Core Configs
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL || '',
      proxyEnabled: proxyEnabled,
      apiUrl: process.env.API_URL || '',
      isProduction: isProd,
    },
  },
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: process.env.API_URL + '/**' || '',
        cors: true,
      },
    },
  },
  devServer: {
    host: String(process.env.NITRO_DEV_HOST) || '0.0.0.0',
    port: Number(process.env.NITRO_DEV_PORT) || 3000,
  },
  typescript: { shim: false },
  vite: ViteConfig,
  experimental: ExperimentalConfig,
  // Modules
  modules: [
    // https://nuxt.com/modules/pinia
    '@pinia/nuxt',
    // https://nuxt.com/modules/vee-validate
    '@vee-validate/nuxt',
    // https://nuxt.com/modules/icons
    'nuxt-icons',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://nuxt.com/modules/device
    '@nuxtjs/device',
    // https://nuxt.com/modules/swiper
    'nuxt-swiper',
  ],
  // Modules
  googleFonts: TypographyConfig,
  devtools: { enabled: !isProd },
  pinia: {
    storesDirs: ['./app/store/**'],
  },
})
