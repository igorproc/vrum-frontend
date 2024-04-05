<template>
  <div class="app-checkout-page">
    <AppCheckoutForm ref="checkoutForm" class="app-checkout-page__form" />
    <AppCheckoutBill v-if="data" class="app-checkout-page__bill" @proceed-order="submitOrder" />
  </div>
</template>

<script setup lang="ts">
import { getCartProducts } from '~/api/cart/getProducts'

const onLoad = async () => {
  const cartStore = useCartStore()

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

const { data } = useLazyAsyncData(
  'user-checkout-products',
  async () => await onLoad()
)

const checkoutForm = ref()

const submitOrder = async () => {
  const data = await checkoutForm.value.submitFields()
  console.log(data)
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
