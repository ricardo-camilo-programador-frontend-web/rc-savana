import type { CategoryId } from '~/types/categories'
import type { Product } from '~/types/product'

export type ProductSort = 'featured' | 'price-asc' | 'price-desc' | 'name-asc'

export interface ProductFilterCriteria {
  search: string
  category: CategoryId | 'all'
  maxPrice: number
}

export function maxProductPrice(products: Array<Product>): number {
  return products.reduce((highest, product) => Math.max(highest, product.price), 0)
}

export function availableCategories(products: Array<Product>): Array<CategoryId> {
  const usedCategories = new Set(products.map(product => product.category))
  return [...usedCategories]
}

export function filterProducts(
  products: Array<Product>,
  { search, category, maxPrice }: ProductFilterCriteria,
): Array<Product> {
  const normalizedSearch = search.trim().toLocaleLowerCase()

  return products.filter(product => {
    const matchesSearch = product.name.toLocaleLowerCase().includes(normalizedSearch)
    const matchesCategory = category === 'all' || product.category === category
    const matchesPrice = product.price <= maxPrice

    return matchesSearch && matchesCategory && matchesPrice
  })
}

export function sortProducts(
  products: Array<Product>,
  sort: ProductSort,
  nameOf: (product: Product) => string = product => product.name,
): Array<Product> {
  const comparators: Record<ProductSort, (a: Product, b: Product) => number> = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => nameOf(a).localeCompare(nameOf(b)),
    featured: (a, b) => Number(b.featured) - Number(a.featured),
  }

  return [...products].sort(comparators[sort])
}
