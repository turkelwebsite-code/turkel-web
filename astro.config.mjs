// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://turkel.com.tr',
  trailingSlash: 'always',
  output: 'server', // API routes için SSR

  build: {
    format: 'file'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: {
          tr: 'tr',
          en: 'en'
        }
      }
    })
  ],

  adapter: netlify()
});