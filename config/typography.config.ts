// Types & Interfaces
import type { ModuleOptions } from '@nuxtjs/google-fonts'

export default {
  display: 'swap',
  prefetch: true,
  useStylesheet: true,
  families: {
    'Montserrat': [100, 300, 400, 600],
    'Poppins': [100, 300, 500],
  } as unknown,
} as ModuleOptions
