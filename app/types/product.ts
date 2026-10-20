import type { CategoryId } from './categories'

export interface Product {
  id: string
  imageSrc: string
  name: string
  price: number
  currency: string
  altText: string
  featured: boolean
  bestSelling: boolean
  favorite: boolean
  category: CategoryId
}

export interface CartItem extends Product {
  quantity: number
}
