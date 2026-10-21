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

type CategoryFilter = CategoryId | 'all'

function parseSort(value: unknown): ProductSort {
  return SORT_OPTIONS.includes(value as ProductSort) ? (value as ProductSort) : 'featured'
}

function isFiniteInRange(value: number, highest: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= highest
}

/**
 * Filtros da loja com a URL como fonte única da verdade:
 * os valores são computados a partir de route.query e cada alteração
 * grava na query via router.replace — back/forward e links compartilháveis
 * (?q=&category=&maxPrice=&sort=) funcionam nos dois sentidos.
 *
 * A busca e a ordenação por nome comparam nomes traduzidos (o catálogo
 * guarda chaves de i18n), mas o retorno preserva os produtos originais —
 * a tradução de exibição é papel do card.
 */
export function useProductFilters() {
  const route = useRoute()
  const router = useRouter()
  const productStore = useProductStore()
  const categoriesStore = useCategoriesStore()

  const highestProductPrice = computed(() => maxProductPrice(productStore.products))

  const allowedCategories = computed<Set<CategoryFilter>>(() => {
    const used = new Set<CategoryId>()
    for (const product of productStore.products) {
      used.add(product.category)
    }
    for (const category of categoriesStore.categories) {
      used.add(category.id)
    }
    return new Set<CategoryFilter>(['all', ...used])
  })

  const search = computed({
    get: () => String(route.query.q ?? ''),
    set: (value: string) => writeQuery({ q: value || undefined }),
  })

  const category = computed<CategoryFilter>({
    get: () => {
      const value = route.query.category
      return typeof value === 'string' && allowedCategories.value.has(value as CategoryFilter)
        ? (value as CategoryFilter)
        : 'all'
    },
    set: (value: CategoryFilter) => writeQuery({ category: value === 'all' ? undefined : value }),
  })

  const maxPrice = computed({
    get: () => {
      const parsed = Number(route.query.maxPrice)
      return route.query.maxPrice !== undefined && isFiniteInRange(parsed, highestProductPrice.value)
        ? parsed
        : highestProductPrice.value
    },
    set: (value: number) =>
      writeQuery({
        maxPrice: isFiniteInRange(value, highestProductPrice.value) && value < highestProductPrice.value
          ? String(value)
          : undefined,
      }),
  })

  const sort = computed<ProductSort>({
    get: () => parseSort(route.query.sort),
    set: (value: ProductSort) => writeQuery({ sort: value === 'featured' ? undefined : value }),
  })

  function writeQuery(patch: Record<string, string | undefined>) {
    void router.replace({
      query: {
        ...route.query,
        ...patch,
      },
    })
  }

  /** Normaliza a query de entrada inválida uma única vez (link compartilhado). */
  onMounted(() => {
    const normalized: Record<string, string | undefined> = {}
    if (route.query.q !== undefined && String(route.query.q) === '') {
      normalized.q = undefined
    }
    if (route.query.category !== undefined && !allowedCategories.value.has(route.query.category as CategoryFilter)) {
      normalized.category = undefined
    }
    const parsedMaxPrice = Number(route.query.maxPrice)
    if (route.query.maxPrice !== undefined && !isFiniteInRange(parsedMaxPrice, highestProductPrice.value)) {
      normalized.maxPrice = undefined
    }
    if (route.query.sort !== undefined && parseSort(route.query.sort) !== route.query.sort) {
      normalized.sort = undefined
    }
    if (Object.keys(normalized).length > 0) {
      writeQuery(normalized)
    }
  })

  const translatedNames = computed(() => {
    const namesById = new Map<string, string>()
    for (const product of useTranslateProducts(productStore.products)) {
      namesById.set(product.id, product.name)
    }
    return namesById
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
    const matched = productStore.products.filter(product => matchedIds.has(product.id))

    return sortProducts(matched, sort.value, product => translatedNames.value.get(product.id) ?? product.name)
  })

  function clearFilters() {
    writeQuery({ q: undefined, category: undefined, maxPrice: undefined, sort: undefined })
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
