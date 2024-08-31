import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { isDev } from '@builder.io/qwik/build'

import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
import { useQwikSpeak } from 'qwik-speak'

import { RouterHead } from '~/components/router-head/router-head'
import '~/global.scss'
import { config } from '~/speak-config'
import { translationFn } from '~/speak-functions'

export default component$(() => {
  /**
   * Init Qwik Speak
   */
  useQwikSpeak({ config, translationFn })

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <>
            <link
              rel="manifest"
              href={`${import.meta.env.BASE_URL}manifest.json`}
            />
            <script
              defer
              src="https://cloud.umami.is/script.js"
              data-website-id="c45c193f-4a46-482e-b87c-6fa40886f3c1"
            />
          </>
        )}
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  )
})
