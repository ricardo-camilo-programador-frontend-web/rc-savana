/**
 * Analytics config: env vence, DEFAULTS são fallback.
 * Caminho padrão: gtag direto (GA4). GTM é opt-in (NUXT_PUBLIC_GTM_ENABLED=true).
 * GTM publicando o mesmo GA4 ID suprime o gtag direto (anti-contagem dupla).
 * O container GTM também dispara Clarity (gtmClarityId truthy), então o Clarity
 * direto é suprimido quando o GTM carrega.
 */
export const DEFAULTS = {
  clarityId: 'yyrpq32eik',
  ga4Id: 'G-YKXK0ZDH6B',
  gtmId: 'GTM-5KHXDZ2W',
  gtmEnabled: false,
  gtmGa4Id: 'G-EQEG75QYZ0',
  counterId: 'f30df6f3-776d-4154-959d-0210ac8a8325',
  counterUtcOffset: '-3',
  // truthy = o container GTM já dispara Clarity (suprime o script direto);
  // string (não literal) para o `!== ''` não colidir com o `as const`
  gtmClarityId: 'GTM-5KHXDZ2W' as string,
} as const

type Env = Record<string, unknown>

const PLACEHOLDERS = new Set(['G-XXXXXXXXXX', 'GTM-XXXXXXX'])

// Nuxt runtimeConfig converte "false"/"-3" em boolean/number: normaliza p/ string.
function str(value: unknown): string | undefined {
  return value === undefined || value === null ? undefined : String(value)
}

function pick(...values: Array<unknown>): string {
  for (const value of values) {
    const trimmed = str(value)?.trim()
    if (trimmed && !PLACEHOLDERS.has(trimmed)) {
      return trimmed
    }
  }
  return ''
}

export interface AnalyticsConfig {
  enabled: boolean
  clarityId: string
  loadClarity: boolean
  ga4Id: string
  gtmId: string
  gtmEnabled: boolean
  loadGtag: boolean
  loadGtm: boolean
  counterId: string
  counterUtcOffset: string
}

// Chaves = runtimeConfig.public flat (NUXT_PUBLIC_X sobrescreve a chave X).
// Legados lidos como fallback: GA_MEASUREMENT_ID (GA4), COUNTER_DEV_ID (counter).
export function resolveAnalyticsConfig(env: Env): AnalyticsConfig {
  const enabled = (str(env.ANALYTICS_ENABLED) ?? 'true').trim() !== 'false'
  const ga4Id = pick(env.GA4_ID, env.GA_MEASUREMENT_ID) || DEFAULTS.ga4Id
  const gtmId = pick(env.GTM_ID) || DEFAULTS.gtmId
  const gtmEnabled
    = (str(env.GTM_ENABLED) ?? (DEFAULTS.gtmEnabled ? 'true' : 'false')).trim()
      === 'true'
  const gtmGa4Id = pick(env.GTM_GA4_ID) || DEFAULTS.gtmGa4Id
  const loadGtm = enabled && gtmEnabled && gtmId !== ''
  const loadGtag = enabled && ga4Id !== '' && !(loadGtm && gtmGa4Id === ga4Id)
  const clarityId = pick(env.CLARITY_ID) || DEFAULTS.clarityId
  const loadClarity
    = enabled && clarityId !== '' && !(loadGtm && DEFAULTS.gtmClarityId !== '')
  return {
    enabled,
    clarityId,
    loadClarity,
    ga4Id,
    gtmId,
    gtmEnabled,
    loadGtag,
    loadGtm,
    counterId:
      pick(env.COUNTER_ID, env.COUNTER_DEV_ID) || DEFAULTS.counterId,
    counterUtcOffset:
      pick(env.COUNTER_UTCOFFSET) || DEFAULTS.counterUtcOffset,
  }
}
