// @ts-check
import cloudflare from '@astrojs/cloudflare'
import markdoc from '@astrojs/markdoc'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  site: 'https://quiple.dev',
  integrations: [mdx(), react(), sitemap(), markdoc()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: import.meta.env.PROD
        ? {
            'react-dom/server': 'react-dom/server.edge',
          }
        : undefined,
    },
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern-compiler',
          additionalData: `
            @use '@/styles/variables.sass' as *
            @use '@/styles/mixins.sass' as *
          `,
        },
      },
    },
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
    ],
  },
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
    },
  }),
})
