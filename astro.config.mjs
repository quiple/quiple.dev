// @ts-check
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import paraglide from '@inlang/paraglide-astro'
import { defineConfig } from 'astro/config'
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
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide',
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'ko'],
  },
  vite: {
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
})
