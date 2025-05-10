/// <reference types="astro/client" />

type ENV = {
  KEYSTATIC_GITHUB_CLIENT_ID: string
  KEYSTATIC_GITHUB_CLIENT_SECRET: string
  KEYSTATIC_SECRET: string
  PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: string
  CHZZK_CLIENTID: string
  CHZZK_CLIENTSECRET: string
  CHZZK_REDIRECTURI: string
  CHZZK_STATE: string
}

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>
declare namespace App {
  interface Locals extends Runtime {}
}
