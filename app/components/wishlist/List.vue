<template>
  <div class="app-wishlist-items-list wishlist-items-list">
    <div
      v-for="product in wishlistItemsList"
      :key="listKey(product)"
      class="wishlist-items-list__item"
    >
      <AppWishlistItemResolver :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TWishlistProduct } from '~/api/wishlist/getProducts'

interface Props {
  wishlistItemsList: TWishlistProduct[]
}

const props = defineProps<Props>()
const { wishlistItemsList } = toRefs(props)

const listKey = (product: TWishlistProduct) => {
  if (product.product.__typename === 'BASE' || !product.selectedVariant) {
    return product.product.id
  }
  return `${product.product.id}-${product.selectedVariant}`
}
</script>

<style lang="scss">
.app-wishlist-items-list {
  display: flex;
  flex-direction: column;
  gap: 8rem;

  @media #{map-get($display-rules, 'md')} {
    gap: 16rem;
  }
}
</style>
