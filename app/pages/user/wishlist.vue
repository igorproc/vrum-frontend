<template>
  <div class="app-wishlist-page">
    <AppWishlistList :wishlist-items-list="data || []" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppWishlistList from '~/components/wishlist/AppWishlistList.vue'
// Api Methods
import { getWishlistProducts } from '~/api/wishlist/getProducts'

const { data } = await useAsyncData(
  'user-wishlist-products',
  async () => await getWishlistProducts()
)
</script>
