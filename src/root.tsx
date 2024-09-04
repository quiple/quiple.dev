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
              type="text/partytown"
              dangerouslySetInnerHTML={`
                (function(){
                  var fullres = document.createElement('script');
                  fullres.async = true;
                  fullres.src = 'https://t.fullres.net/quiple.js?'+(new Date()-new Date()%43200000);
                  document.head.appendChild(fullres);
                })();
              `}
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
