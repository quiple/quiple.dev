/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

type ENV = {
  CHZZK_CLIENTID: string
  CHZZK_CLIENTSECRET: string
  CHZZK_REDIRECTURI: string
  CHZZK_STATE: string
}

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>
declare namespace App {
  interface Locals extends Runtime {}
}
