import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false }), vue()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    optimizeDeps: {
      exclude: ['olso'],
    },
  },
  experimental: {
    security: {
      csrfProtection: {
        origin: true,
      },
    },
  },
})
