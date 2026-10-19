import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { DEFAULTS, resolveAnalyticsConfig } from '../app/lib/analytics/config'

describe('Analytics config (app/lib/analytics/config.ts)', () => {
  it('usa IDs padrão de Clarity e GA4 por padrão', () => {
    const config = resolveAnalyticsConfig({})
    expect(config.clarityId).toBe('yyrpq32eik')
    expect(config.ga4Id).toBe('G-YKXK0ZDH6B')
    expect(DEFAULTS.clarityId).toBe('yyrpq32eik')
    expect(DEFAULTS.ga4Id).toBe('G-YKXK0ZDH6B')
  })

  it('respeita precedência env > default para GA4 e Clarity', () => {
    const config = resolveAnalyticsConfig({
      GA4_ID: 'G-CUSTOM123',
      CLARITY_ID: 'custom_clarity',
    })
    expect(config.ga4Id).toBe('G-CUSTOM123')
    expect(config.clarityId).toBe('custom_clarity')
  })

  it('aceita variáveis legadas como fallback quando chave principal não informada', () => {
    const config = resolveAnalyticsConfig({
      GA_MEASUREMENT_ID: 'G-LEGACY456',
      COUNTER_DEV_ID: 'counter-legacy-id',
    })
    expect(config.ga4Id).toBe('G-LEGACY456')
    expect(config.counterId).toBe('counter-legacy-id')
  })

  it('ignora placeholders e faz fallback para os padrões', () => {
    const config = resolveAnalyticsConfig({
      GA4_ID: 'G-XXXXXXXXXX',
      GTM_ID: 'GTM-XXXXXXX',
    })
    expect(config.ga4Id).toBe('G-YKXK0ZDH6B')
    expect(config.gtmId).toBe('GTM-5KHXDZ2W')
  })

  it('desabilita analytics quando ANALYTICS_ENABLED é false', () => {
    const config = resolveAnalyticsConfig({
      ANALYTICS_ENABLED: 'false',
    })
    expect(config.enabled).toBe(false)
    expect(config.loadGtag).toBe(false)
    expect(config.loadClarity).toBe(false)
  })
})

describe('Sitemap SEO (public/sitemap.xml)', () => {
  const sitemapPath = resolve(__dirname, '../public/sitemap.xml')
  const content = readFileSync(sitemapPath, 'utf-8')

  it('é um documento XML válido', () => {
    expect(content.trim().startsWith('<?xml')).toBe(true)
    expect(content).toContain('<urlset')
    expect(content).toContain('</urlset>')
    expect(content.includes('<url>') && content.includes('</url>')).toBe(true)
    expect(content.includes('<loc>') && content.includes('</loc>')).toBe(true)
  })

  it('contém rotas com /pt e /en', () => {
    expect(content).toMatch(/<loc>.*\/pt<\/loc>/)
    expect(content).toMatch(/<loc>.*\/en<\/loc>/)
  })
})

describe('Robots SEO (public/robots.txt)', () => {
  const robotsPath = resolve(__dirname, '../public/robots.txt')
  const content = readFileSync(robotsPath, 'utf-8')

  it('contém a linha de Sitemap apontando para sitemap.xml', () => {
    expect(content).toMatch(/^Sitemap:\s*https?:\/\/.+\/sitemap\.xml/m)
  })
})
