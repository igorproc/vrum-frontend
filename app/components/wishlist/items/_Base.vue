<template>
  <nuxt-link
    :to="{ name: 'index' }"
    class="app-wishlist-item --base"
  >
    <h5 class="app-wishlist-item__title">
      {{ product.product.name }}
    </h5>
    <div class="app-wishlist-item__image">
      <ui-image :src="product.product.productImage" :alt="product.product.name" />
    </div>
    <p class="app-wishlist-item__price">
      {{ productPrice }}
    </p>
    <AppWishlistItemInteractions
      :operation-with-wishlist-is-processing="operationWithWishlistIsProcessing"
      :operation-with-cart-is-processing="operationWithCartIsProcessing"
      @product-removed-from-wishlist="removeFromWishlist"
      @product-added-to-cart="addToCart"
    />
  </nuxt-link>
</template>

<script setup lang="ts">
// Components
import AppWishlistItemInteractions from '~/components/wishlist/items/Interactions.vue'
// Composables
import { useProduct } from '~/composables/useProduct'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TWishlistProduct } from '~/api/wishlist/getProducts'

interface Props {
  product: TWishlistProduct
}

const props = defineProps<Props>()
const { product } = toRefs(props)

const {
  operationWithWishlistIsProcessing,
  operationWithCartIsProcessing,
  addToCart,
  removeFromWishlist,
  addProductVariant,
} = useProduct(product.value.product)

const productPrice = computed(() => formattedPrice(product.value.product.price))
</script>

<style lang="scss">
.app-wishlist-item.--base {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8rem;
  text-decoration: none;

  .app-wishlist-item__title,
  .app-wishlist-item__price {
    color: map-get($theme-colors, 'primary-color');
  }

  .app-wishlist-item__image {
    height: 200rem;

    .ui-lazy-image {
      object-fit: contain;
    }
  }

  @media #{map-get($display-rules, 'md')} {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr 2fr;
  }
}
</style>
