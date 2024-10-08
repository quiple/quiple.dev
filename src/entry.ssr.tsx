import {
  type RenderToStreamOptions,
  renderToStream,
} from '@builder.io/qwik/server'
import { manifest } from '@qwik-client-manifest'

import Root from '@/root'

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    containerAttributes: {
      lang: 'ko-KR',
      ...opts.containerAttributes,
    },
    serverData: {
      ...opts.serverData,
    },
  })
}
