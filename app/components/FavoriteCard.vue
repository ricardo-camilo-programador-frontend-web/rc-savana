<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

interface FavoriteCardProps {
  favoriteProducts: Array<Product>
  showMenu: boolean
  toggleMenu: () => void
}

const props = withDefaults(defineProps<FavoriteCardProps>(), {
  showMenu: false,
})

defineExpose({
  toggleMenu: props.toggleMenu,
})

const favoritesMenu = ref<HTMLDivElement | null>(null)
const { t } = useI18n()

onClickOutside(favoritesMenu, () => {
  if (props.showMenu) {
    props.toggleMenu()
  }
})
</script>

<template>
  <div
    ref="favoritesMenu"
    class="h-full w-full"
  >
    <div
      v-if="favoriteProducts.length > 0"
      class="absolute top-16 right-16 z-[99] h-full w-full"
    >
      <div
        class="absolute right-0 flex h-full w-[17rem] flex-col gap-2 overflow-hidden overflow-y-auto rounded-xl border border-gray-200 bg-white p-2"
      >
        <div
          v-for="product in favoriteProducts"
          :key="product.id"
          class="mx-auto flex w-full items-center justify-start gap-2 border-b pb-2"
        >
          <Image
            :src="product.imageSrc"
            :alt="product.altText"
            width="50"
            height="50"
          />

          <p class="line-clamp-2 text-sm">
            {{ t(product.name) }}
          </p>

          <slot :product="product" />
        </div>
      </div>
    </div>

    <div
      v-if="!favoriteProducts.length"
      class="absolute top-16 right-16 z-[99] flex h-full w-full items-center justify-center rounded-xl border border-gray-200 bg-white"
    >
      <p class="text-black">
        {{ $t('favorites.empty') }}
      </p>
    </div>
  </div>
</template>
