import { component$, useStyles$ } from '@builder.io/qwik'
import { type DocumentHead, Link } from '@builder.io/qwik-city'

import { inlineTranslate } from 'qwik-speak'

import style from './style.scss?inline'
import ExternalLink from '~/components/ExternalLink'

export default component$(() => {
  useStyles$(style)
  const t = inlineTranslate()

  return (
    <main class="container mx-auto p-[20px]">
      <article class="prose prose-zinc max-w-full">
        <ul>
          <li>
            <a href="/galmuri">{t('app.galmuri@@Galmuri')}</a>
          </li>
          <li>
            <Link href="/generator">
              {t('app.generator@@Bitmap font image generator')}
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <ExternalLink
              text={t('app.legacy@@Legacy website')}
              href="https://legacy.quiple.dev"
            />
          </li>
        </ul>
      </article>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'quiple.dev',
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      property: 'og:title',
      content: 'quiple.dev',
    },
    {
      property: 'og:description',
      content: '',
    },
  ],
  links: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/images/q.svg',
    },
    {
      rel: 'mask-icon',
      type: 'image/svg+xml',
      href: '/images/q.svg',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/svg+xml',
      href: '/images/q.png',
    },
  ],
}
