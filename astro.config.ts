import { defineConfig } from 'astro/config'
import AstroPureIntegration from 'astro-pure'
import config from './src/site.config'

export default defineConfig({
  site: 'https://xiiiing.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [AstroPureIntegration(config)],
})
