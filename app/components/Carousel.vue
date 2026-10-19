<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
interface CarouselButtonConfig {
  color?: string
  icon?: string
  class?: string
}

interface ResponsiveConfig {
  base?: number | string
  sm?: number | string
  md?: number | string
  lg?: number | string
  xl?: number | string
}

interface CarouselProps {
  items?: Array<T>
  dir?: 'ltr' | 'rtl'
  arrows?: boolean
  indicators?: boolean
  wrapperClass?: string
  containerClass?: string
  itemClass?: string
  autoplay?: boolean
  loop?: boolean
  dots?: boolean
  autoplayInterval?: number
  prevButton?: CarouselButtonConfig
  nextButton?: CarouselButtonConfig
  indicatorsPosition?: 'inside' | 'outside'
  indicatorsClass?: string
  itemsPerView?: ResponsiveConfig
  autoScroll?: boolean
  autoScrollInterval?: number
  autoScrollDirection?: 'left' | 'right'
  autoScrollEasing?: string
  autoScrollSnap?: boolean
}

defineSlots<{
  default(props: { item: T; index?: number }): unknown
}>()

const props = withDefaults(defineProps<CarouselProps>(), {
  items: () => [],
  dir: 'ltr',
  arrows: true,
  indicators: true,
  wrapperClass: '',
  containerClass: '',
  itemClass: '',
  autoplay: true,
  loop: true,
  dots: true,
  autoplayInterval: 3000,
  autoScroll: true,
  autoScrollInterval: 3000,
  autoScrollDirection: 'left',
  autoScrollEasing: 'ease-in-out',
  autoScrollSnap: true,
  indicatorsPosition: 'outside',
  indicatorsClass: '',
  itemsPerView: () => ({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  }),
})

function computeItemClasses(itemsPerView: ResponsiveConfig): string {
  return `flex flex-none snap-center basis-full/${itemsPerView.base}
    sm:basis-1/${itemsPerView.sm}
    md:basis-1/${itemsPerView.md}
    lg:basis-1/${itemsPerView.lg}
    xl:basis-1/${itemsPerView.xl}`
}

function computeDotsPosition(
  position: 'inside' | 'outside',
  indicatorsClass: string,
): string {
  const baseClasses = `flex items-center justify-center gap-3 inset-x-0 ${indicatorsClass}`
  return position === 'inside'
    ? `${baseClasses} absolute bottom-4`
    : `${baseClasses} relative bottom-0 mt-4`
}

const carouselUI = computed(() => ({
  root: `relative ${props.wrapperClass}`,
  viewport: `relative w-full flex overflow-hidden snap-x snap-mandatory scroll-smooth ${props.containerClass}`,
  container: '',
  item: `${computeItemClasses(props.itemsPerView)} ${props.itemClass}`,
  arrows: 'flex items-center justify-between',
  prev:
    props.prevButton?.class
    ?? 'absolute start-4 top-1/2 transform -translate-y-1/2',
  next:
    props.nextButton?.class
    ?? 'absolute end-4 top-1/2 transform -translate-y-1/2',
  dots: computeDotsPosition(props.indicatorsPosition, props.indicatorsClass),
  dot: 'rounded-full h-3 w-3 bg-primary-500 dark:bg-primary-400',
}))

interface CarouselInstance {
  page: number
  pages: number
  select: (index: number) => void
  next: () => void
}

function setupAutoplay(
  carouselRef: Ref<CarouselInstance | undefined>,
  interval: number,
) {
  if (!props.autoplay) {
    return
  }

  const intervalId = setInterval(() => {
    const carousel = carouselRef.value
    if (!carousel) {
      return
    }

    if (carousel.page >= carousel.pages - 1) {
      carousel.select(0)
    }
    else {
      carousel.next()
    }
  }, interval)

  onUnmounted(() => clearInterval(intervalId))
}

const carouselRef = ref()
onMounted(() => setupAutoplay(carouselRef, props.autoplayInterval))
</script>

<template>
  <UCarousel
    ref="carouselRef"
    :items="items"
    :dir="dir"
    :ui="carouselUI"
    :arrows="arrows"
    :indicators="indicators"
    :loop="loop"
    :autoplay="autoplay"
    :autoplay-interval="autoplayInterval"
    :dots="dots"
    :auto-scroll="autoScroll"
  >
    <template #default="slotProps">
      <slot
        :item="(slotProps.item as unknown as T)"
        :index="slotProps.index"
      />
    </template>
  </UCarousel>
</template>
