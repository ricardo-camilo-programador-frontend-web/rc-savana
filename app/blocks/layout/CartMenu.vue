<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/Button.vue'

const { t } = useI18n()
const localePath = useLocalePath()

const showMenu = ref(false)
const cartStore = useCartStore()
const cartItems = ref<Array<CartItem>>([])

function toggleNav() {
  showMenu.value = !showMenu.value
}

function setCartItems() {
  cartItems.value = cartStore.getCartItems()
}

function goToCart() {
  showMenu.value = false
  navigateTo(localePath('/cart'))
}

watch(cartStore, () => {
  setCartItems()
})

watch(showMenu, () => {
  setCartItems()
})

onMounted(() => {
  setCartItems()
})
</script>

<template>
  <div
    class="relative flex h-auto w-full content-center items-center transition-all duration-500 ease-out"
  >
    <div class="flex h-full w-full items-center justify-center">
      <span class="sr-only">Toggle menu</span>
      <Button
        type="button"
        class="relative hover:text-primary block h-10 rounded-none border-transparent bg-transparent p-2 text-gray-600 shadow-transparent hover:border-none hover:bg-none hover:shadow-none"
        aria-label="toggle menu"
        icon="mdi:cart"
        icon-style="text-3xl"
        @click="toggleNav"
      />
      <span
        v-if="cartStore.getCartCount() > 0"
        class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white"
      >
        {{ cartStore.getCartCount() }}
      </span>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-show="showMenu"
        class="hover:text-primary/75 fixed inset-0 right-0 z-[99] -mt-1 ml-auto flex h-full min-h-screen w-full min-w-[17rem]"
      >
        <div
          class="z-[90] block h-full min-h-screen w-full min-w-full cursor-pointer bg-black/10 backdrop-blur-sm"
          title="Fechar menu."
          @click="toggleNav"
        />

        <nav
          class="absolute inset-y-0 right-0 z-[9999] mx-auto flex h-full min-h-screen w-[20rem] border-l-2 border-gray-200 bg-white shadow-lg md:items-center md:justify-between"
          role="navigation"
        >
          <div
            class="ml-auto flex h-screen max-h-screen w-[20rem] flex-col overflow-hidden bg-white"
          >
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ $t('menu.links.cart') }}
              </h2>
              <Button
                type="button"
                class="hover:text-primary h-min w-min border-none bg-transparent text-[1.3rem] text-black shadow-transparent hover:border-transparent hover:bg-none hover:shadow-transparent"
                aria-label="Fechar menu."
                title="Fechar menu."
                icon="mdi:close"
                @click="toggleNav"
              />
            </div>

            <!-- Cart Items -->
            <div
              class="flex-1 overflow-hidden overflow-y-auto"
            >
              <div
                v-if="cartItems.length > 0"
                class="p-4"
              >
                <div class="space-y-4">
                  <div
                    v-for="product in cartItems"
                    :key="`cart-item-${product.id}`"
                    class="flex gap-3 rounded-lg border border-gray-100 p-3"
                  >
                    <Image
                      :src="product.imageSrc"
                      :alt="product.altText"
                      width="60"
                      height="60"
                      class="h-16 w-16 rounded-lg object-cover"
                    />

                    <div class="flex flex-1 flex-col">
                      <p class="line-clamp-2 text-sm font-medium text-gray-900">
                        {{ t(product.name) }}
                      </p>
                      <div class="mt-2 flex items-center justify-between">
                        <CartQuantityHandler
                          :product="product"
                          class="scale-90"
                        />
                        <span class="text-sm font-semibold text-gray-900">
                          {{ product.currency }} {{ (product.price * product.quantity).toFixed(2) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty Cart -->
              <div
                v-if="!cartItems.length"
                class="flex h-full flex-col items-center justify-center p-8"
              >
                <Icon
                  name="mdi:cart-outline"
                  class="h-16 w-16 text-gray-300"
                />
                <p class="mt-4 text-gray-500">
                  {{ $t('cart.empty') }}
                </p>
                <Button
                  class="mt-4"
                  size="sm"
                  @click="goToCart"
                >
                  {{ $t('cart.continueShopping') }}
                </Button>
              </div>
            </div>

            <!-- Footer with Summary -->
            <div
              v-if="cartItems.length > 0"
              class="border-t border-gray-200 p-4"
            >
              <!-- Subtotal -->
              <div class="mb-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ $t('cart.subtotal') }}</span>
                  <span class="font-medium">${{ cartStore.getCartSubtotal().toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold">
                  <span>{{ $t('cart.total') }}</span>
                  <span class="text-orange-500">${{ cartStore.getCartTotal().toFixed(2) }}</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="space-y-2">
                <Button
                  class="w-full"
                  @click="goToCart"
                >
                  {{ $t('cart.checkout') }}
                  <Icon
                    name="mdi:arrow-right"
                    class="ml-2 h-4 w-4"
                  />
                </Button>
                <Button
                  variant="outline"
                  class="w-full"
                  @click="goToCart"
                >
                  {{ $t('cart.summary') }}
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
