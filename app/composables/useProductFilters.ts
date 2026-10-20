import type { CategoryId } from '~/types/categories'
import type { Product } from '~/types/product'
import { useTranslateProducts } from '~/composables/useTranslateProduct'
import {
  filterProducts,
  maxProductPrice,
  sortProducts,
  type ProductSort,
} from '~/utils/productFilters'

const SORT_OPTIONS: Array<ProductSort> = ['featured', 'price-asc', 'price-desc', 'name-asc']

function parseSort(value: unknown): ProductSort {
  return SORT_OPTIONS.includes(value as ProductSort) ? (value as ProductSort) : 'featured'
}

function parseCategory(value: unknown): CategoryId | 'all' {
  return typeof value === 'string' && value !== '' ? (value as CategoryId) : 'all'
}

/**
 * Filtros da loja sincronizados com a URL: o estado vira query
 * (?q=&category=&maxPrice=&sort=) via router.replace e o valor inicial
 * é lido da query, permitindo entrar por link compartilhado.
 *
 * A busca compara nomes traduzidos (o catálogo guarda chaves de i18n),
 * mas devolve os produtos originais — a tradução de exibição é papel do card.
 */
export function useProductFilters() {
  const route = useRoute()
  const router = useRouter()
  const productStore = useProductStore()

  const highestProductPrice = computed(() => maxProductPrice(productStore.products))

  const search = ref(String(route.query.q ?? ''))
  const category = ref<CategoryId | 'all'>(parseCategory(route.query.category))
  const maxPrice = ref(Number(route.query.maxPrice) || highestProductPrice.value)
  const sort = ref<ProductSort>(parseSort(route.query.sort))

  watch([search, category, maxPrice, sort], () => {
    void router.replace({
      query: {
        ...route.query,
        q: search.value || undefined,
        category: category.value === 'all' ? undefined : category.value,
        maxPrice:
          maxPrice.value >= highestProductPrice.value ? undefined : String(maxPrice.value),
        sort: sort.value === 'featured' ? undefined : sort.value,
      },
    })
  })

  const filteredProducts = computed<Array<Product>>(() => {
    const translatedProducts = useTranslateProducts(productStore.products)
    const matchedIds = new Set(
      filterProducts(translatedProducts, {
        search: search.value,
        category: category.value,
        maxPrice: maxPrice.value,
      }).map(product => product.id),
    )

    return sortProducts(
      productStore.products.filter(product => matchedIds.has(product.id)),
      sort.value,
    )
  })

  function clearFilters() {
    search.value = ''
    category.value = 'all'
    maxPrice.value = highestProductPrice.value
    sort.value = 'featured'
  }

  return {
    search,
    category,
    maxPrice,
    highestProductPrice,
    sort,
    filteredProducts,
    clearFilters,
  }
}
