<template>
  <div class="app-wishlist-page">
    <AppWishlistList :wishlist-items-list="data?.items || []" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppWishlistList from '~/components/wishlist/AppWishlistList.vue'
// Api Methods
import { getWishlistProducts } from '~/api/wishlist/getProducts'
// Pinia Methods
import { useWishlistStore } from '~/store/wishlist'

const wishlistStore = useWishlistStore()
const { data } = await useAsyncData(
  'user-wishlist-products',
  async () => await getWishlistProducts(wishlistStore.token)
)
</script>
