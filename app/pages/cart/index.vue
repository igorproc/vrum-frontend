<template>
  <div class="app-cart-page">
    <AppCartList
      v-if="data"
      class="app-cart-page__product-list"
    />

    <AppCartTotal
      class="app-cart-page__total"
    />
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useCartStore } from '~/store/cart'
// Api Methods
import { getCartProducts } from '~/api/cart/getProducts'

const cartStore = useCartStore()
const onLoad = async () => {
  const productList = await getCartProducts(cartStore.token)
  if (!productList?.items) {
    return []
  }

  cartStore.products = productList.items
  return productList.items
}

const { data } = useAsyncData(
  'user-cart-products',
  async () => await onLoad()
)
</script>

<style lang="scss">
.app-cart-page {
  &__total {
    width: 100%;
    margin-top: 24rem;
  }

  @media #{map-get($display-rules, 'md')} {
    &__total {
      width: 50%;
      margin: 24rem auto;
    }
  }

  @media #{map-get($display-rules, 'lg')} {
    display: flex;
    gap: 24rem;

    &__product-list {
      flex: 0 0 75%;
    }

    &__total {
      margin-top: 0;
    }
  }
}
</style>
