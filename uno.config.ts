// Minimal subset of Astro Theme Pure's UnoCSS configuration (Apache-2.0).
import { defineConfig, presetMini } from 'unocss'

export default defineConfig({
  presets: [presetMini()],
  theme: {
    colors: {
      primary: 'hsl(var(--primary) / <alpha-value>)',
      foreground: 'hsl(var(--foreground) / <alpha-value>)',
      background: 'hsl(var(--background) / <alpha-value>)',
      muted: { DEFAULT: 'hsl(var(--muted) / <alpha-value>)', foreground: 'hsl(var(--muted-foreground) / <alpha-value>)' },
      border: 'hsl(var(--border) / <alpha-value>)',
    },
  },
})
