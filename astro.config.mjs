// @ts-check
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import {defineConfig} from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  site: 'https://quiple.dev',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  vite: {
    resolve: {
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
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
  adapter: cloudflare(),
})
