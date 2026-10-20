<script setup lang="ts">
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

provideHeadlessUseId(() => useId())

// lang do documento acompanha o locale ativo (pt-BR por padrão)
const { locale } = useI18n()
useHead({
  htmlAttrs: {
    lang: computed(() => (locale.value === 'en' ? 'en' : 'pt-BR')),
  },
})

const nuxtApp = useNuxtApp()

nuxtApp.hook('page:start', () => {
  Nprogress.start()
})

nuxtApp.hook('page:finish', () => {
  Nprogress.done()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
