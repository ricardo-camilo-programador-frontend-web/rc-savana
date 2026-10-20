import type { Product } from '~/types/product'
import { acceptHMRUpdate, defineStore } from 'pinia'
import {
  birdCage,
  catFood,
  catFoodPremium,
  dogCollar,
  dogFoodLarge,
  dogFoodMedium,
  dogFoodMini,
  dogFoodOrange,
  fishFilter,
  groomingKit,
  hamsterHabitat,
  litterBox,
  scratchingPost,
} from '~/utils/imageFiles'
import { createProductVariations } from '~/utils/productFactory'

interface ProductStore {
  products: Array<Product>
}

export const useProductStore = defineStore('productStore', {
  state: (): ProductStore => ({
    products: [
      {
        id: 'premium-cat-food-1',
        name: 'products.premiumCatFood',
        price: 24.99,
        imageSrc: catFood,
        favorite: true,
        currency: 'products.currency',
        altText: 'products.premiumCatFoodAltText',
        featured: true,
        bestSelling: true,
        category: 'food',
      },
      {
        id: 'leather-dog-collar',
        name: 'products.leatherDogCollar',
        price: 34.99,
        imageSrc: dogCollar,
        favorite: false,
        currency: 'products.currency',
        altText: 'products.dogCollarAltText',
        featured: false,
        bestSelling: true,
        category: 'accessories',
      },
      {
        id: 'cat-scratching-post',
        name: 'products.catScratchingPost',
        price: 59.99,
        imageSrc: scratchingPost,
        favorite: true,
        currency: 'products.currency',
        altText: 'products.scratchingPostAltText',
        featured: true,
        bestSelling: false,
        category: 'furniture',
      },
      {
        id: 'bird-cage-deluxe',
        name: 'products.birdCageDeluxe',
        price: 89.99,
        imageSrc: birdCage,
        favorite: false,
        currency: 'products.currency',
        altText: 'products.birdCageAltText',
        featured: true,
        bestSelling: true,
        category: 'furniture',
      },
      {
        id: 'hamster-habitat',
        name: 'products.hamsterHabitat',
        price: 45.99,
        imageSrc: hamsterHabitat,
        favorite: false,
        currency: 'products.currency',
        altText: 'products.hamsterHabitatAltText',
        featured: false,
        bestSelling: true,
        category: 'furniture',
      },
      {
        id: 'fish-tank-filter',
        name: 'products.fishTankFilter',
        price: 29.99,
        imageSrc: fishFilter,
        favorite: false,
        currency: 'products.currency',
        altText: 'products.fishFilterAltText',
        featured: true,
        bestSelling: true,
        category: 'accessories',
      },
      {
        id: 'dog-grooming-kit',
        name: 'products.dogGroomingKit',
        price: 49.99,
        imageSrc: groomingKit,
        favorite: true,
        currency: 'products.currency',
        altText: 'products.groomingKitAltText',
        featured: true,
        bestSelling: true,
        category: 'accessories',
      },
      {
        id: 'cat-litter-box',
        name: 'products.catLitterBox',
        price: 39.99,
        imageSrc: litterBox,
        favorite: false,
        currency: 'products.currency',
        altText: 'products.litterBoxAltText',
        featured: true,
        bestSelling: true,
        category: 'furniture',
      },
      ...createProductVariations(
        'products.premiumDogFood',
        18.99,
        'products.premiumDogFoodAltText',
        'food',
        [
          {
            id: 'premium-dog-food-orange-1',
            imageSrc: dogFoodOrange,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-dog-food-mini-1',
            imageSrc: dogFoodMini,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-dog-food-orange-2',
            imageSrc: dogFoodLarge,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-dog-food-mini-2',
            imageSrc: dogFoodMedium,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-dog-food-orange-3',
            imageSrc: dogFoodOrange,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-dog-food-mini-3',
            imageSrc: dogFoodMini,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-dog-food-orange-4',
            imageSrc: dogFoodOrange,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-dog-food-mini-4',
            imageSrc: dogFoodMini,
            featured: false,
            bestSelling: false,
            favorite: true,
          },
          {
            id: 'premium-dog-food-orange-5',
            imageSrc: dogFoodOrange,
            featured: false,
            bestSelling: false,
            favorite: true,
          },
        ],
      ),
      ...createProductVariations(
        'products.premiumCatFood',
        18.99,
        'products.premiumCatFoodAltText',
        'food',
        [
          {
            id: 'premium-cat-food-1',
            imageSrc: catFood,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-cat-food-2',
            imageSrc: catFoodPremium,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-cat-food-3',
            imageSrc: catFood,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-cat-food-4',
            imageSrc: catFood,
            featured: true,
            bestSelling: true,
            favorite: true,
          },
          {
            id: 'premium-cat-food-5',
            imageSrc: catFood,
            featured: false,
            bestSelling: false,
            favorite: true,
          },
        ],
      ),
    ],
  }),
  actions: {
    getProducts() {
      return this.products
    },
    updateProductFavorite(productToUpdate: Product): void {
      this.products = this.products.map(product =>
        product.id === productToUpdate.id
          ? { ...product, favorite: !product.favorite }
          : product,
      )
    },
  },
  getters: {
    getFavoriteProducts(): Array<Product> {
      const favoriteProducts = this.products.filter(
        product => product.favorite,
      )
      const uniqueFavorites = new Map<string, Product>()

      favoriteProducts.forEach((product) => {
        if (!uniqueFavorites.has(product.id)) {
          uniqueFavorites.set(product.id, product)
        }
      })

      return Array.from(uniqueFavorites.values())
    },
    getFeaturedProducts(): Array<Product> {
      return this.products.filter(product => product.featured)
    },
    getBestSellingProducts(): Array<Product> {
      return this.products.filter(product => product.bestSelling)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
