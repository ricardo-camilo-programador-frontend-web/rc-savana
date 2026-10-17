import type { AnalyticsConfig } from '~/lib/analytics/config'
import { resolveAnalyticsConfig } from '~/lib/analytics/config'

const GTM_SCRIPT_ID = 'gtm-script'

export const ANALYTICS_CONSENT_KEY = 'analytics-enabled'

interface AnalyticsWindow {
  dataLayer?: Array<unknown>
}

export function useAnalyticsConfig(): AnalyticsConfig {
  const runtimeConfig = useRuntimeConfig()
  return resolveAnalyticsConfig(
    runtimeConfig.public as unknown as Record<string, string | undefined>,
  )
}

function injectGtmScript(inline: string): HTMLScriptElement {
  const script = document.createElement('script')
  script.async = true
  script.id = GTM_SCRIPT_ID
  script.text = inline
  document.head.appendChild(script)
  return script
}

// Idempotente: só injeta se o config libera o GTM e ele ainda não está no DOM.
export function enableGtm(config: AnalyticsConfig) {
  if (config.loadGtm && !document.getElementById(GTM_SCRIPT_ID)) {
    const window_ = window as AnalyticsWindow
    window_.dataLayer = window_.dataLayer ?? []
    injectGtmScript(
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.gtmId}');`,
    )
  }
}

export function disableGtm() {
  document.getElementById(GTM_SCRIPT_ID)?.remove()
  const window_ = window as AnalyticsWindow
  window_.dataLayer = []
  document.querySelector('iframe[src*="googletagmanager"]')?.remove()
}

export function useGTM() {
  const enableGTM = () => {
    enableGtm(useAnalyticsConfig())
  }

  return {
    enableGTM,
    disableGTM: disableGtm,
  }
}
