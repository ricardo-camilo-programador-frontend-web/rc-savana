import type { CategoryId } from '~/types/categories'
import type { Product } from '~/types/product'

interface ProductVariation {
  id: string
  imageSrc: string
  featured?: boolean
  bestSelling?: boolean
  favorite?: boolean
}

export function createProductVariations(
  baseName: string,
  basePrice: number,
  baseAltText: string,
  category: CategoryId,
  variations: Array<ProductVariation>,
): Array<Product> {
  return variations.map(variation => ({
    id: variation.id,
    name: baseName,
    price: basePrice,
    imageSrc: variation.imageSrc,
    favorite: variation.favorite ?? false,
    currency: 'products.currency',
    altText: baseAltText,
    featured: variation.featured ?? false,
    bestSelling: variation.bestSelling ?? false,
    category,
  }))
}
