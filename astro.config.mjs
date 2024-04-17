import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false }), vue()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
})
