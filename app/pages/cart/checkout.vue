<template>
  <div class="app-checkout-page">
    <AppCheckoutForm
      ref="checkoutForm"
      class="app-checkout-page__form"
    />
    <AppCheckoutBill
      class="app-checkout-page__bill"
      @proceed-order="submitOrder"
    />
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getCartProducts } from '~/api/cart/getProducts'
import { createOrder, EOrderPaymentType } from '~/api/checkout/createOrder'
// Pinia Actions
import { clearCartData } from '~/store/cart/actions'

definePageMeta({
  middleware: ['need-cart'],
})

const router = useRouter()
const cartStore = useCartStore()
const notificationStore = useNotificationStore()

const onLoad = async () => {
  if (cartStore.products.length) {
    return cartStore.products
  }

  const cartProducts = await getCartProducts(cartStore.token)
  if (!cartProducts?.items) {
    return
  }

  cartStore.products = cartProducts.items
  return cartProducts.items
}

useLazyAsyncData(
  'user-checkout-products',
  async () => await onLoad(),
)

const checkoutForm = ref()
const submitOrder = async () => {
  const data = await checkoutForm.value?.submitFields()
  console.log(data)
  if (!data) {
    return
  }

  const order = await createOrder({
    token: cartStore.token,
    paymentType: EOrderPaymentType.cash,
    user: data,
  })
  if (!order?.status) {
    checkoutForm.value?.resetForm()
    return
  }

  clearCartData()
  notificationStore.openSuccessNotification(
    `the order has been created,\nan email has been sent to your inbox.`,
  )
  await router.push({ name: 'index' })
}
</script>

<style lang="scss">
.app-checkout-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24rem;

  &__form {
    width: 100%;
  }

  @media #{map-get($display-rules, 'md')} {
    padding: 25rem 75rem;
  }

  @media #{map-get($display-rules, 'lg')} {
    padding: 0;
    flex-direction: row;
    align-items: flex-start;

    &__form, &__bill {
      width: 610rem;
    }
  }
}
</style>
