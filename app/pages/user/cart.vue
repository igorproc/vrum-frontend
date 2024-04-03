<template>
  <div class="app-cart-page">
    <AppCartList :items="data?.items || []" class="app-cart-page__product-list" />
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useCartStore } from '~/store/cart'
// Api Methods
import { getCartProducts } from '~/api/cart/getProducts'

const cartStore = useCartStore()
const { data } = useLazyAsyncData(
  'user-cart-products',
  async () => getCartProducts(cartStore.token)
)
</script>
