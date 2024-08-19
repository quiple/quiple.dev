import { Slot, component$, useStyles$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import galmuri from './fonts.scss?inline'
import { info } from './info'
import noscript from './noscript.scss?inline'
import style from './style.scss?inline'

export default component$(() => {
  useStyles$(galmuri)
  useStyles$(style)

  return (
    <>
      <noscript>
        <style dangerouslySetInnerHTML={noscript} />
      </noscript>
      <main>
        <Slot />
      </main>
      <footer>
        <small>
          &copy; {info.copyrightDate} {info.author}. quiple은 {info.author}의
          상표입니다.
        </small>
        <small>
          닌텐도 DS는 Nintendo의 상표이며 이 프로젝트는 Nintendo와 어떠한 관련도
          없습니다. 또한 각 폰트 및 게임은 해당 소유자 및 사용 허가자의 상표 및
          저작권 자산입니다.
        </small>
      </footer>
    </>
  )
})

export const head: DocumentHead = {
  links: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/images/galmuri.svg',
    },
    {
      rel: 'mask-icon',
      type: 'image/svg+xml',
      href: '/images/galmuri.svg',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/svg+xml',
      href: '/images/galmuri.png',
    },
  ],
}
