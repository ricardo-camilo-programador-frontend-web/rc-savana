import type { CartItem, Product } from '~/types/product'
import { acceptHMRUpdate, defineStore, skipHydrate } from 'pinia'
import { ref, computed } from 'vue'

export interface Coupon {
  code: string
  discountPercent: number
  discountFixed: number
  minOrderValue: number
  expiresAt?: string
}

export const useCartStore = defineStore('cartStore', () => {
  const cart = skipHydrate(ref<Array<CartItem>>([]))
  const appliedCoupon = skipHydrate(ref<Coupon | null>(null))
  const shippingMethod = skipHydrate(ref<'standard' | 'express' | 'pickup'>('standard'))

  // Shipping rates
  const shippingRates = {
    standard: 15.90,
    express: 29.90,
    pickup: 0,
  }

  // Persist to localStorage
  function saveToStorage(): void {
    if (import.meta.client) {
      localStorage.setItem('cart', JSON.stringify(cart.value))
      localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon.value))
      localStorage.setItem('shippingMethod', JSON.stringify(shippingMethod.value))
    }
  }

  function loadFromStorage(): void {
    if (import.meta.client) {
      const savedCart = localStorage.getItem('cart')
      const savedCoupon = localStorage.getItem('appliedCoupon')
      const savedShipping = localStorage.getItem('shippingMethod')

      if (savedCart) {
        try {
          cart.value = JSON.parse(savedCart)
        }
        catch {
          cart.value = []
        }
      }

      if (savedCoupon) {
        try {
          appliedCoupon.value = JSON.parse(savedCoupon)
        }
        catch {
          appliedCoupon.value = null
        }
      }

      if (savedShipping) {
        try {
          shippingMethod.value = JSON.parse(savedShipping)
        }
        catch {
          shippingMethod.value = 'standard'
        }
      }
    }
  }

  // Load on init
  if (import.meta.client) {
    loadFromStorage()
  }

  function getCartItems(): Array<CartItem> {
    return cart.value
  }

  function addToCart(product: Product, quantity = 1): void {
    const existingItem = cart.value.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    }
    else {
      cart.value.push({ ...product, quantity })
    }

    saveToStorage()
  }

  function increaseCartItemQuantity(productId: string): void {
    const product = cart.value.find(item => item.id === productId)

    if (product) {
      product.quantity += 1
      saveToStorage()
    }
  }

  function decreaseCartItemQuantity(productId: string): void {
    const product = cart.value.find(item => item.id === productId)

    if (product) {
      if (product.quantity > 1) {
        product.quantity -= 1
        saveToStorage()
        return
      }

      removeFromCart(productId)
    }
  }

  function updateCartItemQuantity(productId: string, quantity: number): void {
    const product = cart.value.find(item => item.id === productId)

    if (product) {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }
      product.quantity = quantity
      saveToStorage()
    }
  }

  function removeFromCart(productId: string): void {
    cart.value = cart.value.filter(item => item.id !== productId)
    saveToStorage()
  }

  function getCartSubtotal(): number {
    return cart.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  }

  function getShippingCost(): number {
    return shippingRates[shippingMethod.value]
  }

  function getDiscountAmount(): number {
    if (!appliedCoupon.value)
      return 0

    const subtotal = getCartSubtotal()

    if (subtotal < appliedCoupon.value.minOrderValue)
      return 0

    if (appliedCoupon.value.discountFixed > 0) {
      return Math.min(appliedCoupon.value.discountFixed, subtotal)
    }

    if (appliedCoupon.value.discountPercent > 0) {
      return subtotal * (appliedCoupon.value.discountPercent / 100)
    }

    return 0
  }

  function getCartTotal(): number {
    const subtotal = getCartSubtotal()
    const shipping = getShippingCost()
    const discount = getDiscountAmount()

    return Math.max(0, subtotal + shipping - discount)
  }

  function getCartCount(): number {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  }

  function getProductQuantity(productId: string): number {
    const product = cart.value.find(item => item.id === productId)
    return product ? product.quantity : 0
  }

  function productExistsInCart(productId: string): boolean {
    return cart.value.some(item => item.id === productId)
  }

  function clearCart(): void {
    cart.value = []
    appliedCoupon.value = null
    saveToStorage()
  }

  function setShippingMethod(method: 'standard' | 'express' | 'pickup'): void {
    shippingMethod.value = method
    saveToStorage()
  }

  function applyCoupon(coupon: Coupon): boolean {
    const subtotal = getCartSubtotal()

    if (subtotal < coupon.minOrderValue) {
      return false
    }

    if (coupon.expiresAt) {
      const expiresAt = new Date(coupon.expiresAt)
      if (expiresAt < new Date()) {
        return false
      }
    }

    appliedCoupon.value = coupon
    saveToStorage()
    return true
  }

  function removeCoupon(): void {
    appliedCoupon.value = null
    saveToStorage()
  }

  // Computed values
  const isEmpty = computed(() => cart.value.length === 0)
  const hasCoupon = computed(() => appliedCoupon.value !== null)

  return {
    cart,
    appliedCoupon,
    shippingMethod,
    isEmpty,
    hasCoupon,
    getCartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    updateCartItemQuantity,
    removeFromCart,
    getCartSubtotal,
    getShippingCost,
    getDiscountAmount,
    getCartTotal,
    getCartCount,
    getProductQuantity,
    clearCart,
    productExistsInCart,
    addToCart,
    setShippingMethod,
    applyCoupon,
    removeCoupon,
    loadFromStorage,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
