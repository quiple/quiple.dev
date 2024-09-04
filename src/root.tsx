import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { isDev } from '@builder.io/qwik/build'

import { QwikPartytown } from '@/components/partytown/partytown'
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
            <QwikPartytown forward={['gtag', 'dataLayer.push']} />
            <script
              async
              type="text/partytown"
              src="https://www.googletagmanager.com/gtag/js?id=GTM-PQDW5FKR"
            />
            <script
              type="text/partytown"
              dangerouslySetInnerHTML={`
                window.dataLayer = window.dataLayer || [];
                window.gtag = function() {
                  dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', 'GTM-PQDW5FKR');
              `}
            />
          </>
        )}
        <RouterHead />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQDW5FKR"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          />
        </noscript>
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  )
})
