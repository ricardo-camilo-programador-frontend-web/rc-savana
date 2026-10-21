import { describe, expect, it } from 'vitest'
import type { Product } from '../app/types/product'
import {
  availableCategories,
  filterProducts,
  maxProductPrice,
  sortProducts,
} from '../app/utils/productFilters'

function createProduct(overrides: Partial<Product>): Product {
  return {
    id: 'product-1',
    imageSrc: 'image.jpg',
    name: 'Alimento Premium para Cachorro',
    price: 24.99,
    currency: 'products.currency',
    altText: 'Alimento Premium para Cachorro',
    featured: false,
    bestSelling: false,
    favorite: false,
    category: 'food',
    ...overrides,
  }
}

const products = [
  createProduct({ id: 'a', name: 'Arranhador para Gatos', price: 59.99, category: 'furniture', featured: true }),
  createProduct({ id: 'b', name: 'Coleira de Couro', price: 34.99, category: 'accessories' }),
  createProduct({ id: 'c', name: 'Alimento Premium para Cachorro', price: 18.99, category: 'food' }),
]

describe('productFilters (app/utils/productFilters.ts)', () => {
  it('filtra por categoria', () => {
    const result = filterProducts(products, { search: '', category: 'food', maxPrice: 100 })
    expect(result.map(product => product.id)).toEqual(['c'])
  })

  it('categoria "all" mantém todos os produtos', () => {
    const result = filterProducts(products, { search: '', category: 'all', maxPrice: 100 })
    expect(result).toHaveLength(3)
  })

  it('filtra por preço máximo (inclusivo)', () => {
    const result = filterProducts(products, { search: '', category: 'all', maxPrice: 34.99 })
    expect(result.map(product => product.id)).toEqual(['b', 'c'])
  })

  it('busca por nome é insensível a caixa e ignora espaços', () => {
    const result = filterProducts(products, { search: '  coleira ', category: 'all', maxPrice: 100 })
    expect(result.map(product => product.id)).toEqual(['b'])
  })

  it('busca por nome traduzido via callback nameOf', () => {
    const result = filterProducts(
      products,
      { search: 'Cat Tree', category: 'all', maxPrice: 100 },
      product => (product.id === 'a' ? 'Cat Tree Deluxe' : product.name),
    )
    expect(result.map(product => product.id)).toEqual(['a'])
  })

  it('combina busca + categoria + preço', () => {
    const result = filterProducts(products, { search: 'alimento', category: 'food', maxPrice: 20 })
    expect(result.map(product => product.id)).toEqual(['c'])
  })

  it('ordena por preço crescente e decrescente', () => {
    expect(sortProducts(products, 'price-asc').map(product => product.price)).toEqual([18.99, 34.99, 59.99])
    expect(sortProducts(products, 'price-desc').map(product => product.price)).toEqual([59.99, 34.99, 18.99])
  })

  it('ordena por nome e mantém array original intacto', () => {
    const sorted = sortProducts(products, 'name-asc')
    expect(sorted.map(product => product.name[0])).toEqual(['A', 'A', 'C'])
    expect(products[0].id).toBe('a')
  })

  it('ordena por nome traduzido via callback nameOf (chaves de i18n)', () => {
    const sorted = sortProducts(products, 'name-asc', product => `${product.id}-nome`)
    expect(sorted.map(product => product.id)).toEqual(['a', 'b', 'c'])
  })

  it('destaques vêm primeiro na ordenação padrão', () => {
    expect(sortProducts(products, 'featured')[0].id).toBe('a')
  })

  it('calcula o maior preço e as categorias em uso', () => {
    expect(maxProductPrice(products)).toBe(59.99)
    expect(availableCategories(products)).toEqual(['furniture', 'accessories', 'food'])
  })
})
