<script setup lang="ts">
import type { Coupon } from '~/stores/cartStore'
import Button from '~/components/Button.vue'

const { t } = useI18n()
const cartStore = useCartStore()
const localePath = useLocalePath()

const couponCode = ref('')
const couponError = ref('')
const couponSuccess = ref('')

const cartItems = computed(() => cartStore.getCartItems())
const subtotal = computed(() => cartStore.getCartSubtotal())
const shipping = computed(() => cartStore.getShippingCost())
const discount = computed(() => cartStore.getDiscountAmount())
const total = computed(() => cartStore.getCartTotal())
const isEmpty = computed(() => cartStore.isEmpty)

// Available coupons (in real app, this would come from API)
const availableCoupons: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10, discountFixed: 0, minOrderValue: 50 },
  { code: 'FREESHIP', discountPercent: 0, discountFixed: 15.90, minOrderValue: 100 },
  { code: 'SAVE20', discountPercent: 20, discountFixed: 0, minOrderValue: 200 },
]

function updateQuantity(productId: string, quantity: number) {
  cartStore.updateCartItemQuantity(productId, quantity)
}

function removeItem(productId: string) {
  cartStore.removeFromCart(productId)
}

function setShipping(method: 'standard' | 'express' | 'pickup') {
  cartStore.setShippingMethod(method)
}

function applyCouponCode() {
  couponError.value = ''
  couponSuccess.value = ''

  if (!couponCode.value.trim()) {
    couponError.value = t('cart.coupon.enterCode')
    return
  }

  const coupon = availableCoupons.find(
    c => c.code.toLowerCase() === couponCode.value.trim().toLowerCase(),
  )

  if (!coupon) {
    couponError.value = t('cart.coupon.invalid')
    return
  }

  const success = cartStore.applyCoupon(coupon)

  if (success) {
    couponSuccess.value = t('cart.coupon.applied')
    couponCode.value = ''
  }
  else {
    couponError.value = t('cart.coupon.minOrder')
  }
}

function removeCoupon() {
  cartStore.removeCoupon()
  couponError.value = ''
  couponSuccess.value = ''
}

function proceedToCheckout() {
  navigateTo(localePath('/checkout'))
}

function continueShopping() {
  navigateTo(localePath('/shop'))
}

// SEO
useHead({
  title: t('cart.title'),
  meta: [
    { name: 'description', content: t('cart.description') },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ $t('cart.title') }}
        </h1>
        <p class="mt-2 text-gray-600">
          {{ $t('cart.subtitle', { count: cartStore.getCartCount() }) }}
        </p>
      </div>

      <!-- Empty Cart -->
      <div
        v-if="isEmpty"
        class="rounded-lg bg-white p-12 text-center shadow"
      >
        <Icon
          name="mdi:cart-outline"
          class="mx-auto h-24 w-24 text-gray-300"
        />
        <h2 class="mt-4 text-xl font-semibold text-gray-900">
          {{ $t('cart.empty') }}
        </h2>
        <p class="mt-2 text-gray-600">
          {{ $t('cart.emptyMessage') }}
        </p>
        <Button
          class="mt-6"
          @click="continueShopping"
        >
          {{ $t('cart.continueShopping') }}
        </Button>
      </div>

      <!-- Cart Content -->
      <div
        v-else
        class="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="rounded-lg bg-white shadow">
            <!-- Items List -->
            <ul class="divide-y divide-gray-200">
              <li
                v-for="item in cartItems"
                :key="item.id"
                class="p-6"
              >
                <div class="flex gap-4">
                  <!-- Product Image -->
                  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      :src="item.imageSrc"
                      :alt="item.altText"
                      class="h-full w-full object-cover"
                    />
                  </div>

                  <!-- Product Info -->
                  <div class="flex flex-1 flex-col">
                    <div class="flex justify-between">
                      <div>
                        <h3 class="text-lg font-medium text-gray-900">
                          {{ t(item.name) }}
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.currency }} {{ item.price.toFixed(2) }}
                        </p>
                      </div>
                      <button
                        class="text-gray-400 hover:text-red-500"
                        :aria-label="$t('cart.removeItem')"
                        @click="removeItem(item.id)"
                      >
                        <Icon
                          name="mdi:trash-can-outline"
                          class="h-5 w-5"
                        />
                      </button>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="mt-4 flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <button
                          class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                          :disabled="item.quantity <= 1"
                          @click="cartStore.decreaseCartItemQuantity(item.id)"
                        >
                          <Icon
                            name="mdi:minus"
                            class="h-4 w-4"
                          />
                        </button>
                        <span class="w-12 text-center font-medium">
                          {{ item.quantity }}
                        </span>
                        <button
                          class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                          @click="cartStore.increaseCartItemQuantity(item.id)"
                        >
                          <Icon
                            name="mdi:plus"
                            class="h-4 w-4"
                          />
                        </button>
                      </div>

                      <p class="text-lg font-semibold text-gray-900">
                        {{ item.currency }} {{ (item.price * item.quantity).toFixed(2) }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <!-- Continue Shopping -->
            <div class="border-t border-gray-200 p-6">
              <Button
                variant="outline"
                @click="continueShopping"
              >
                <Icon
                  name="mdi:arrow-left"
                  class="mr-2 h-4 w-4"
                />
                {{ $t('cart.continueShopping') }}
              </Button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 rounded-lg bg-white shadow">
            <div class="p-6">
              <h2 class="text-lg font-medium text-gray-900">
                {{ $t('cart.summary') }}
              </h2>

              <!-- Shipping Options -->
              <div class="mt-6">
                <h3 class="text-sm font-medium text-gray-900">
                  {{ $t('cart.shipping') }}
                </h3>
                <div class="mt-3 space-y-3">
                  <label class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
                    <div class="flex items-center gap-3">
                      <input
                        v-model="cartStore.shippingMethod"
                        type="radio"
                        value="standard"
                        class="h-4 w-4 text-orange-500"
                        @change="setShipping('standard')"
                      >
                      <div>
                        <p class="text-sm font-medium text-gray-900">
                          {{ $t('cart.shippingStandard') }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ $t('cart.shippingStandardDays') }}
                        </p>
                      </div>
                    </div>
                    <span class="text-sm font-medium text-gray-900">
                      $15.90
                    </span>
                  </label>

                  <label class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
                    <div class="flex items-center gap-3">
                      <input
                        v-model="cartStore.shippingMethod"
                        type="radio"
                        value="express"
                        class="h-4 w-4 text-orange-500"
                        @change="setShipping('express')"
                      >
                      <div>
                        <p class="text-sm font-medium text-gray-900">
                          {{ $t('cart.shippingExpress') }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ $t('cart.shippingExpressDays') }}
                        </p>
                      </div>
                    </div>
                    <span class="text-sm font-medium text-gray-900">
                      $29.90
                    </span>
                  </label>

                  <label class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
                    <div class="flex items-center gap-3">
                      <input
                        v-model="cartStore.shippingMethod"
                        type="radio"
                        value="pickup"
                        class="h-4 w-4 text-orange-500"
                        @change="setShipping('pickup')"
                      >
                      <div>
                        <p class="text-sm font-medium text-gray-900">
                          {{ $t('cart.shippingPickup') }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ $t('cart.shippingPickupDays') }}
                        </p>
                      </div>
                    </div>
                    <span class="text-sm font-medium text-green-600">
                      {{ $t('cart.free') }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Coupon -->
              <div class="mt-6">
                <h3 class="text-sm font-medium text-gray-900">
                  {{ $t('cart.coupon.title') }}
                </h3>

                <!-- Applied Coupon -->
                <div
                  v-if="cartStore.hasCoupon"
                  class="mt-3 flex items-center justify-between rounded-lg bg-green-50 p-3"
                >
                  <div class="flex items-center gap-2">
                    <Icon
                      name="mdi:check-circle"
                      class="h-5 w-5 text-green-500"
                    />
                    <span class="text-sm font-medium text-green-700">
                      {{ cartStore.appliedCoupon?.code }}
                    </span>
                  </div>
                  <button
                    class="text-sm text-red-500 hover:text-red-700"
                    @click="removeCoupon"
                  >
                    {{ $t('cart.coupon.remove') }}
                  </button>
                </div>

                <!-- Coupon Input -->
                <div
                  v-else
                  class="mt-3"
                >
                  <div class="flex gap-2">
                    <input
                      v-model="couponCode"
                      type="text"
                      :placeholder="$t('cart.coupon.placeholder')"
                      class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      @keyup.enter="applyCouponCode"
                    >
                    <Button
                      size="sm"
                      @click="applyCouponCode"
                    >
                      {{ $t('cart.coupon.apply') }}
                    </Button>
                  </div>
                  <p
                    v-if="couponError"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ couponError }}
                  </p>
                  <p
                    v-if="couponSuccess"
                    class="mt-2 text-sm text-green-500"
                  >
                    {{ couponSuccess }}
                  </p>
                </div>
              </div>

              <!-- Totals -->
              <div class="mt-6 space-y-3 border-t border-gray-200 pt-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ $t('cart.subtotal') }}</span>
                  <span class="font-medium text-gray-900">${{ subtotal.toFixed(2) }}</span>
                </div>

                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ $t('cart.shipping') }}</span>
                  <span
                    class="font-medium"
                    :class="shipping === 0 ? 'text-green-600' : 'text-gray-900'"
                  >
                    {{ shipping === 0 ? $t('cart.free') : `$${shipping.toFixed(2)}` }}
                  </span>
                </div>

                <div
                  v-if="discount > 0"
                  class="flex justify-between text-sm"
                >
                  <span class="text-gray-600">{{ $t('cart.discount') }}</span>
                  <span class="font-medium text-green-600">-${{ discount.toFixed(2) }}</span>
                </div>

                <div class="flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold">
                  <span class="text-gray-900">{{ $t('cart.total') }}</span>
                  <span class="text-gray-900">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Checkout Button -->
              <Button
                class="mt-6 w-full"
                size="lg"
                @click="proceedToCheckout"
              >
                {{ $t('cart.checkout') }}
                <Icon
                  name="mdi:arrow-right"
                  class="ml-2 h-5 w-5"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
