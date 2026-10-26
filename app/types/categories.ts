export type CategoryId = 'accessories' | 'food' | 'furniture' | 'bags'

export interface CategoryItem {
  id: CategoryId
  title: string
  productCount: number
  gradientClass: string
  src: string
  altText: string
}
