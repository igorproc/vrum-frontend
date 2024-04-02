<template>
  <div class="app-wishlist-page">
    <AppWishlistList :wishlist-items-list="data?.items || []" />
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getWishlistProducts } from '~/api/wishlist/getProducts'

const wishlistStore = useWishlistStore()
const { $listen } = useNuxtApp()
const { data, refresh } = await useAsyncData(
  'user-wishlist-products',
  async () => await getWishlistProducts(wishlistStore.token)
)

onMounted(() => {
  $listen('wishlist:remove', () => refresh())
})
</script>
