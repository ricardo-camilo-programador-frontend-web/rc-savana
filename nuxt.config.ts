// https://nuxt.com/docs/api/configuration/nuxt-config

import type { NuxtConfig } from 'nuxt/schema'
import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: './app/',

  app: {
    head: {
      script: [
        {
          'src': 'https://cdn.counter.dev/script.js',
          'type': 'text/javascript',
          'defer': true,
          'data-id': process.env.NUXT_PUBLIC_COUNTER_DEV_ID,
          'data-utcoffset': '-3',
          'async': true,
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  modules: [
    '@nuxt/icon',
    'nuxt-headlessui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@netlify/nuxt',
  ],

  future: {
    compatibilityVersion: 4,
  },

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'pt',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        language: 'en',
        name: 'English',
        iso: 'en',
        file: 'en.ts',
      },
      {
        code: 'pt',
        language: 'pt',
        name: 'Português',
        iso: 'pt',
        file: 'pt.ts',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      fallbackLocale: 'pt',
    },
  },

  icon: {
    serverBundle: {
      collections: ['mdi', 'circle-flags', 'ph', 'simple-icons', 'cib'],
    },
  },

  imports: {
    autoImport: true,
    dirs: [
      'blocks',
      'components',
      'stores',
      'plugins',
      'configs',
      'utils',
      'composables',
      'static',
      'types',
      'layouts',
      'pages',
    ],
  },

  nitro: {
    output: {
      publicDir: '.output/public',
    },
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: [
        '/en',
        '/pt',
        '/en/about',
        '/pt/about',
        '/en/blog',
        '/pt/blog',
        '/en/best-sellers',
        '/pt/best-sellers',
        '/en/careers',
        '/pt/careers',
        '/en/contact',
        '/pt/contact',
        '/en/discount',
        '/pt/discount',
        '/en/faq',
        '/pt/faq',
        '/en/privacy-policy',
        '/pt/privacy-policy',
        '/en/gift-cards',
        '/pt/gift-cards',
        '/en/shop',
        '/pt/shop',
        '/en/products',
        '/pt/products',
      ],
    },
  },

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
      {
        path: '~/blocks',
        pathPrefix: false,
      },
    ],
  },

  runtimeConfig: {
    public: {
      FIGMA_USERNAME: process.env.NUXT_PUBLIC_FIGMA_USERNAME,
      FIGMA_ORIGINAL_DESIGN: process.env.NUXT_PUBLIC_FIGMA_ORIGINAL_DESIGN,
      PROJECT_TITLE: process.env.NUXT_PUBLIC_PROJECT_TITLE,
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
      COUNTER_DEV_ID: process.env.NUXT_PUBLIC_COUNTER_DEV_ID,
      TREFLE_API_KEY: process.env.NUXT_PUBLIC_TREFLE_API_KEY,
      FACEBOOK_ID: process.env.NUXT_PUBLIC_FACEBOOK_ID,
      YOUTUBE_USERNAME: process.env.NUXT_PUBLIC_YOUTUBE_USERNAME,
      LIVE_DEMO_VIDEO_URL: process.env.NUXT_PUBLIC_LIVE_DEMO_VIDEO_URL,
      ADSENSE_ID: process.env.NUXT_PUBLIC_ADSENSE_ID,
      EMAIL: process.env.NUXT_PUBLIC_EMAIL,
      GTM_ID: process.env.NUXT_PUBLIC_GTM_ID,
      INSTAGRAM_USERNAME: process.env.NUXT_PUBLIC_INSTAGRAM_USERNAME,
      SITE_URL:
        process.env.NUXT_PUBLIC_SITE_URL
        || 'https://savana-nuxtjs-chronicles-part-1.netlify.app',
      GITHUB_USERNAME: process.env.NUXT_PUBLIC_GITHUB_USERNAME,
      LINKEDIN_USERNAME: process.env.NUXT_PUBLIC_LINKEDIN_USERNAME,
      X_USERNAME: process.env.NUXT_PUBLIC_X_USERNAME,
      WORKANA_USERNAME: process.env.NUXT_PUBLIC_WORKANA_USERNAME,
      TWITTER_USERNAME: process.env.NUXT_PUBLIC_TWITTER_USERNAME,
      GOOGLE_SITE_VERIFICATION:
        process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      PORTFOLIO_URL: process.env.NUXT_PUBLIC_PORTFOLIO_URL,
      BUYMEACOFFEE_USERNAME: process.env.NUXT_PUBLIC_BUYMEACOFFEE_USERNAME,
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  vite: {
    css: {
      devSourcemap: true,
    },
    build: {
      sourcemap: false,
    },
  },
}) satisfies NuxtConfig
