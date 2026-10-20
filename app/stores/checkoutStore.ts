import type {
  BillingAddress,
  CheckoutFormData,
  CheckoutState,
  PaymentMethodType,
} from '~/types/checkout'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCheckoutStore = defineStore('checkoutStore', () => {
  const cartStore = useCartStore()

  // State
  const step = ref<CheckoutState['step']>('customer')
  const formData = ref<Partial<CheckoutFormData>>({
    sameAsBilling: true,
    paymentMethod: 'credit_card',
    customer: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      documentType: 'cpf',
      documentNumber: '',
    },
    billingAddress: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
    shippingAddress: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
    creditCard: {
      number: '',
      holderName: '',
      expiryDate: '',
      cvv: '',
    },
  })
  const isProcessing = ref(false)
  const orderId = ref<string | undefined>()
  const error = ref<string | undefined>()

  // Computed
  const currentStep = computed(() => step.value)

  const steps = computed(() => [
    {
      key: 'customer',
      label: 'Personal Info',
      completed: !!formData.value.customer,
    },
    {
      key: 'shipping',
      label: 'Shipping',
      completed: !!formData.value.shippingAddress,
    },
    {
      key: 'payment',
      label: 'Payment',
      completed: !!formData.value.paymentMethod,
    },
    { key: 'review', label: 'Review', completed: false },
  ])

  const canProceed = computed(() => {
    switch (step.value) {
      case 'customer':
        return !!(
          formData.value.customer?.email
          && formData.value.customer?.firstName
          && formData.value.customer?.lastName
          && formData.value.customer?.documentNumber
        )
      case 'shipping':
        return !!(
          formData.value.shippingAddress?.zipCode
          && formData.value.shippingAddress?.street
          && formData.value.shippingAddress?.number
          && formData.value.shippingAddress?.city
          && formData.value.shippingAddress?.state
        )
      case 'payment':
        if (formData.value.paymentMethod === 'credit_card') {
          return !!(
            formData.value.creditCard?.number
            && formData.value.creditCard?.holderName
            && formData.value.creditCard?.expiryDate
            && formData.value.creditCard?.cvv
          )
        }
        return !!formData.value.paymentMethod
      default:
        return true
    }
  })

  // Actions
  function setStep(newStep: CheckoutState['step']) {
    step.value = newStep
  }

  const stepOrder: Array<CheckoutState['step']> = ['customer', 'shipping', 'payment', 'review']

  function nextStep() {
    const currentIndex = stepOrder.indexOf(step.value)
    const upcomingStep = stepOrder[currentIndex + 1]
    if (upcomingStep) {
      step.value = upcomingStep
    }
  }

  function prevStep() {
    const currentIndex = stepOrder.indexOf(step.value)
    const previousStep = stepOrder[currentIndex - 1]
    if (previousStep) {
      step.value = previousStep
    }
  }

  function updateCustomer(customer: Partial<CheckoutFormData['customer']>) {
    formData.value.customer = {
      ...formData.value.customer,
      ...customer,
    } as CheckoutFormData['customer']
  }

  function updateBillingAddress(address: Partial<CheckoutFormData['billingAddress']>) {
    formData.value.billingAddress = {
      ...formData.value.billingAddress,
      ...address,
    } as CheckoutFormData['billingAddress']
  }

  function updateShippingAddress(address: Partial<CheckoutFormData['shippingAddress']>) {
    formData.value.shippingAddress = {
      ...formData.value.shippingAddress,
      ...address,
    } as CheckoutFormData['shippingAddress']

    if (formData.value.sameAsBilling) {
      formData.value.billingAddress = formData.value.shippingAddress as BillingAddress
    }
  }

  function setPaymentMethod(method: PaymentMethodType) {
    formData.value.paymentMethod = method
  }

  function updateCreditCard(card: Partial<CheckoutFormData['creditCard']>) {
    formData.value.creditCard = {
      ...formData.value.creditCard,
      ...card,
    } as CheckoutFormData['creditCard']
  }

  function setNotes(notes: string) {
    formData.value.notes = notes
  }

  function toggleSameAsBilling() {
    formData.value.sameAsBilling = !formData.value.sameAsBilling
    if (formData.value.sameAsBilling && formData.value.shippingAddress) {
      formData.value.billingAddress = formData.value.shippingAddress
    }
  }

  async function processPayment(): Promise<{
    success: boolean
    orderId?: string
    error?: string
  }> {
    isProcessing.value = true
    error.value = undefined

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate order ID
      const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      orderId.value = newOrderId

      // Clear cart after successful payment
      cartStore.clearCart()

      return { success: true, orderId: newOrderId }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Payment processing failed'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      isProcessing.value = false
    }
  }

  function resetCheckout() {
    step.value = 'customer'
    formData.value = {
      sameAsBilling: true,
      paymentMethod: 'credit_card',
    }
    isProcessing.value = false
    orderId.value = undefined
    error.value = undefined
  }

  return {
    // State
    step,
    formData,
    isProcessing,
    orderId,
    error,
    // Computed
    currentStep,
    steps,
    canProceed,
    // Actions
    setStep,
    nextStep,
    prevStep,
    updateCustomer,
    updateBillingAddress,
    updateShippingAddress,
    setPaymentMethod,
    updateCreditCard,
    setNotes,
    toggleSameAsBilling,
    processPayment,
    resetCheckout,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckoutStore, import.meta.hot))
}
