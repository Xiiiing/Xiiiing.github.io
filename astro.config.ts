import { defineConfig, fontProviders } from 'astro/config'
import AstroPureIntegration from 'astro-pure'
import config from './src/site.config'

export default defineConfig({
  site: 'https://xiiiing.github.io',
  output: 'static',
  trailingSlash: 'always',
  fonts: [{
    provider: fontProviders.fontshare(),
    name: 'Satoshi',
    cssVariable: '--font-satoshi',
    styles: ['normal', 'italic'],
    weights: [400, 500],
    subsets: ['latin'],
  }],
  integrations: [AstroPureIntegration(config)],
})
