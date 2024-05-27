<template>
  <div class="app-checkout-bill">
    <AppCheckoutBillHeader class="app-checkout-bill__header" />
    <div class="app-checkout-bill__product-list">
      <AppCheckoutBillItem
        v-for="product in cartStore.products"
        :key="product.product.id"
        :name="product.product.name"
        :price="productPrice(product)"
        :qty="product.qty"
        class="app-checkout-bill__products-list-item"
      />
    </div>
    <AppCheckoutBillTotal :price="cartStore.totalPrice" class="app-checkout-bill__total" />

    <div class="app-checkout-bill__divider" />

    <AppCheckoutBillPayment class="app-checkout-bill__payment" />
    <div class="app-checkout-bill__actions">
      <ui-button
        background-color="#000"
        variant="outlined"
        label="оформить"
        class="app-checkout-bill__actions-submit"
        @click="emit('proceedOrder')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TCartProduct } from '~/api/cart/getProducts'

interface Emits {
  (name: 'proceedOrder'): void
}

const emit = defineEmits<Emits>()

const cartStore = useCartStore()

const productPrice = computed(() => {
  return (product: TCartProduct) => {
    if (!product.selectedVariant || !product.product?.configurable) {
      return product.product.price
    }

    const variantCandidate = product.product.configurable?.variants?.find(item => item.product.id === product.selectedVariant)
    if (!variantCandidate) {
      return product.product.price
    }

    return variantCandidate.product.price
  }
})
</script>

<style lang="scss">
.app-checkout-bill {
  &__divider {
    margin: 23rem 0;
    border-bottom: 1rem solid map-get($gray-color-palette, 'gray-3');
  }

  &__product-list {
    margin-top: 16rem;
  }

  &__total {
    margin-top: 24rem;
  }

  &__actions {
    margin-top: 36rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &-submit {
      border-radius: 8rem;
    }
  }

  @media #{map-get($display-rules, 'lg')} {
    padding: 80rem 35rem;
  }
}
</style>
