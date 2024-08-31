import type { RequestHandler } from '@builder.io/qwik-city'

import { config } from '../speak-config'

/**
 * This middleware function must only contain the logic to set the locale,
 * because it is invoked on every request to the server.
 * Avoid redirecting or throwing errors here, and prefer layouts or pages
 */
export const onRequest: RequestHandler = ({ request, locale }) => {
  const acceptLanguage = request.headers.get('accept-language')

  let lang: string | null | undefined = null

  // Try to use user language
  if (acceptLanguage) {
    const locales = acceptLanguage.split(',').map((l) => l.split(';')[0])
    for (let i = 0; i < locales.length; i++) {
      lang = config.supportedLocales.find((value) =>
        value.lang.startsWith(locales[i]),
      )?.lang
      if (lang) break
    }
  }

  // Set Qwik locale
  locale(lang || config.defaultLocale.lang)
}
