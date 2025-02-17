/// <reference types="astro/client" />

type ENV = {
  chzzk: {
    clientId: string
    redirectUri: string
    state: string
  }
}

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>
declare namespace App {
  interface Locals extends Runtime {}
}
