interface LocalizedContent {
  pt: string
  en: string
}

interface SEOContent {
  titles: LocalizedContent | string
  descriptions: LocalizedContent | string
  keywords: string
  paths: {
    pt: string
    en: string
  }
  ogUrl?: string
  ogImage?: string
  includeXDefault?: boolean
  includeAuthor?: boolean
}

const BASE_URL = 'https://savana-nuxtjs-chronicles-part-1.netlify.app'
const DEFAULT_OG_IMAGE = `${BASE_URL}/imagem-compartilhamento.jpg`
const SUPPORTED_LOCALES = ['pt', 'en'] as const

function getLocalizedValue(
  content: LocalizedContent | string,
  locale: string,
): string {
  if (typeof content === 'string') {
    return content
  }
  if (locale === 'pt') {
    return content.pt
  }
  return content.en
}

function generateAlternateLinks(
  paths: SEOContent['paths'],
  includeXDefault = false,
) {
  const links: Array<{ rel: 'alternate', hreflang: string, href: string }> = [
    {
      rel: 'alternate' as const,
      hreflang: 'pt',
      href: `${BASE_URL}/pt${paths.pt}`,
    },
    {
      rel: 'alternate' as const,
      hreflang: 'en',
      href: `${BASE_URL}/en${paths.en}`,
    },
  ]

  if (includeXDefault) {
    links.push({
      rel: 'alternate' as const,
      hreflang: 'x-default',
      href: `${BASE_URL}/`,
    })
  }

  return links
}

// Tipo de entrada do useHead (unhead 3 restringe name/property a literais conhecidos)
type HeadInput = Parameters<typeof useHead>[0]

export function createSEO(locale: string, content: SEOContent): HeadInput {
  const title = getLocalizedValue(content.titles, locale)
  const description = getLocalizedValue(content.descriptions, locale)
  const localePath = locale === 'en' ? content.paths.en : content.paths.pt
  const ogUrl = content.ogUrl || `${BASE_URL}/${locale === 'en' ? 'en' : 'pt'}${localePath}`
  const ogImage = content.ogImage || DEFAULT_OG_IMAGE
  const alternateLocales = SUPPORTED_LOCALES.filter(lang => lang !== locale)
  const includeAuthor = content.includeAuthor !== false

  const meta: Array<{ name?: string, property?: string, content: string }> = [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: content.keywords,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    { property: 'og:type', content: 'website' },
    { name: 'robots', content: 'index, follow' },
    {
      property: 'og:url',
      content: ogUrl,
    },
    {
      property: 'og:image',
      content: ogImage,
    },
    { property: 'og:locale', content: locale },
    ...alternateLocales.map(alternate => ({
      property: 'og:locale:alternate',
      content: alternate,
    })),
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'language', content: locale },
    { name: 'revisit-after', content: '7 days' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: ogImage,
    },
  ]

  if (includeAuthor) {
    const alternateIndex = meta.findLastIndex(
      m => m.property === 'og:locale:alternate',
    )
    if (alternateIndex !== -1) {
      meta.splice(alternateIndex + 1, 0, {
        name: 'author',
        content: 'Savana Pet Shop',
      })
    }
  }

  return {
    title,
    meta,
    // hreflang é <link>, não <meta>
    link: generateAlternateLinks(content.paths, content.includeXDefault),
  } as HeadInput
}
