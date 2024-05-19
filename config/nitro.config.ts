import type { NuxtOptions } from '@nuxt/schema'

export default {
  routeRules: {
    '/api/**': {
      proxy: process.env.API_URL + '/**' || '',
      cors: true,
    },
    '/storage/**': {
      proxy: process.env.API_URL + '/**' || '',
      cors: true,
    },
  },
} as NuxtOptions['nitro']
