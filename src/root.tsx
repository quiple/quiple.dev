import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { isDev } from '@builder.io/qwik/build'

import { RouterHead } from '@/components/router-head/router-head'
import '@/global.scss'
import 'prism-themes/themes/prism-vsc-dark-plus.min.css'

export default component$(() => {
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
              async
              src={`https://t.fullres.net/quiple.js?${Number(new Date()) - (Number(new Date()) % 43200000)}`}
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
