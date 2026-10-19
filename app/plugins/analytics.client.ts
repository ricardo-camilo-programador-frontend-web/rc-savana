// Analytics client-only (GA4 gtag, GTM, Clarity, counter.dev).
// DEFAULTS e precedência env>legado>default em ~/lib/analytics/config.ts.

import {
  ANALYTICS_CONSENT_KEY,
  disableGtm,
  enableGtm,
  useAnalyticsConfig,
} from '~/composables/useGTM'

interface AnalyticsWindow {
  dataLayer?: Array<unknown>
  gtag?: (...args: Array<unknown>) => void
}

function injectScript(attributes: Record<string, string>, inline = ''): void {
  const script = document.createElement('script')
  script.async = true
  if (inline !== '') {
    script.text = inline
  }
  for (const [name, value] of Object.entries(attributes)) {
    script.setAttribute(name, value)
  }
  document.head.appendChild(script)
}

export default defineNuxtPlugin(() => {
  const config = useAnalyticsConfig()
  if (!config.enabled) {
    return
  }

  // Consentimento pré-existente (IntroWarning): 'false' desliga o GTM.
  if (localStorage.getItem(ANALYTICS_CONSENT_KEY) === 'false') {
    // Opt-out explícito: não carrega nenhum provedor direto (GA4, Clarity, counter.dev).
    disableGtm()
    return
  }
  enableGtm(config)

  if (config.loadGtag) {
    injectScript({
      src: `https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`,
    })
    const window_ = window as AnalyticsWindow
    window_.dataLayer = window_.dataLayer ?? []
    // gtag.js só processa objetos `arguments`; arrays simples são ignorados
    // e nenhum hit /g/collect era enviado.
    window_.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      // biome-ignore lint/complexity/noArguments: gtag.js requires the arguments object
      window_.dataLayer?.push(arguments)
    }
    window_.gtag('js', new Date())
    window_.gtag('config', config.ga4Id)
  }

  if (config.loadClarity) {
    injectScript(
      {},
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${config.clarityId}");`,
    )
  }

  if (config.counterId !== '') {
    injectScript({
      'src': 'https://cdn.counter.dev/script.js',
      'data-id': config.counterId,
      'data-utcoffset': config.counterUtcOffset,
    })
  }
})
