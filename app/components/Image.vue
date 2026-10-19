<script lang="ts" setup>
interface Props {
  src: string
  alt: string
  width: number | string
  height: number | string
  ariaHidden?: boolean
  title?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  ariaHidden: true,
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :title="title"
    :aria-hidden="ariaHidden"
    :loading="loading"
    :fetchpriority="fetchPriority"
    :aria-label="ariaLabel"
    :width="width"
    :height="height"
  >
</template>
