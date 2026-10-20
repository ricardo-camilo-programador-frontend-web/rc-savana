/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly NUXT_PUBLIC_PROJECT_TITLE: string
  readonly NUXT_PUBLIC_BASE_URL: string
  readonly NUXT_PUBLIC_SITE_URL: string
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
