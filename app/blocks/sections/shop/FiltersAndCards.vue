<script setup lang="ts">
import { availableCategories } from '~/utils/productFilters'

const { t, locale } = useI18n()
const productStore = useProductStore()
const categoriesStore = useCategoriesStore()

const {
  search,
  category,
  maxPrice,
  highestProductPrice,
  sort,
  filteredProducts,
  clearFilters,
} = useProductFilters()

const categoryOptions = computed(() => {
  const usedCategories = availableCategories(productStore.products)

  return categoriesStore.categories.filter(item => usedCategories.includes(item.id))
})

const sortOptions = [
  { value: 'featured', label: 'shop.filters.sortFeatured' },
  { value: 'price-asc', label: 'shop.filters.sortPriceAsc' },
  { value: 'price-desc', label: 'shop.filters.sortPriceDesc' },
  { value: 'name-asc', label: 'shop.filters.sortNameAsc' },
] as const
</script>

<template>
  <section
    aria-labelledby="filters-and-cards-title"
    class="mx-auto flex w-full max-w-[95vw] flex-col items-center gap-8 py-8"
  >
    <h2
      id="filters-and-cards-title"
      class="text-center text-2xl font-bold"
    >
      {{ t('shop.filters.title') }}
    </h2>

    <div
      class="flex w-full flex-wrap items-end justify-center gap-6 rounded-lg border border-gray-100 bg-white p-6 shadow-md"
    >
      <div class="flex w-full max-w-xs flex-col gap-2">
        <label
          for="product-search"
          class="text-sm font-semibold text-gray-700"
        >
          {{ t('shop.filters.search') }}
        </label>
        <input
          id="product-search"
          v-model="search"
          type="search"
          :placeholder="t('shop.filters.searchPlaceholder')"
          :aria-label="t('shop.filters.search')"
          class="rounded-md border border-gray-200 p-3 text-sm focus:border-orange-400 focus:outline-none"
        >
      </div>

      <div class="flex w-full max-w-xs flex-col gap-2">
        <label
          for="product-category"
          class="text-sm font-semibold text-gray-700"
        >
          {{ t('shop.filters.category') }}
        </label>
        <select
          id="product-category"
          v-model="category"
          :aria-label="t('shop.filters.category')"
          class="rounded-md border border-gray-200 bg-white p-3 text-sm focus:border-orange-400 focus:outline-none"
        >
          <option value="all">
            {{ t('shop.filters.allCategories') }}
          </option>
          <option
            v-for="categoryItem in categoryOptions"
            :key="categoryItem.id"
            :value="categoryItem.id"
          >
            {{ t(categoryItem.title) }}
          </option>
        </select>
      </div>

      <div class="flex w-full max-w-xs flex-col gap-2">
        <label
          for="product-max-price"
          class="text-sm font-semibold text-gray-700"
        >
          {{ t('shop.filters.maxPrice') }}: {{ maxPrice.toLocaleString(locale) }}
        </label>
        <input
          id="product-max-price"
          v-model.number="maxPrice"
          type="range"
          min="0"
          :max="highestProductPrice"
          step="1"
          :aria-label="t('shop.filters.maxPrice')"
          class="accent-orange-500"
        >
      </div>

      <div class="flex w-full max-w-xs flex-col gap-2">
        <label
          for="product-sort"
          class="text-sm font-semibold text-gray-700"
        >
          {{ t('shop.filters.sort') }}
        </label>
        <select
          id="product-sort"
          v-model="sort"
          :aria-label="t('shop.filters.sort')"
          class="rounded-md border border-gray-200 bg-white p-3 text-sm focus:border-orange-400 focus:outline-none"
        >
          <option
            v-for="sortOption in sortOptions"
            :key="sortOption.value"
            :value="sortOption.value"
          >
            {{ t(sortOption.label) }}
          </option>
        </select>
      </div>

      <Button
        :label="t('shop.filters.clear')"
        :aria-label="t('shop.filters.clear')"
        id="clear-filters-button"
        label-style="text-gray-600"
        @click="clearFilters"
      />
    </div>

    <p
      class="text-sm text-gray-600"
      role="status"
    >
      {{ t('shop.filters.resultsCount', filteredProducts.length) }}
    </p>

    <div
      v-if="filteredProducts.length > 0"
      role="list"
      :aria-label="t('shop.filters.listAriaLabel')"
      class="mx-auto grid w-full min-w-[17rem] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
    >
      <FeatureCard
        v-for="product in filteredProducts"
        :key="product.id"
        :image-src="product.imageSrc"
        :product-name="product.name"
        :product-price="product.price.toString()"
        :alt-text="product.altText"
        class="mx-auto max-h-[20rem] w-full min-w-[17rem] pb-24"
        role="listitem"
      >
        <FavoriteShortcut :product="product" />

        <template #actions>
          <CartQuantityHandler :product="product" />
        </template>
      </FeatureCard>
    </div>

    <p
      v-else
      class="py-16 text-center text-lg text-gray-600"
    >
      {{ t('shop.filters.empty') }}
    </p>
  </section>
</template>
