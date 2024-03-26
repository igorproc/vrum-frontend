<template>
  <nuxt-link
    :to="{ name: 'index' }"
    class="app-wishlist-item --base base-item"
  >
    <h5 class="base-item__title">
      {{ product.product.name }}
    </h5>
    <div class="base-item__image">
      <ui-image :src="product.product.productImage" :alt="product.product.name" />
    </div>
    <p class="base-item__price">
      {{ productPrice }}
    </p>
    <AppWishlistItemInteractions
      :operation-with-wishlist-is-processing="operationWithWishlistIsProcessing"
      :operation-with-cart-is-processing="operationWithCartIsProcessing"
      class="base-item__interactions"
      @product-removed-from-wishlist="removeFromWishlist"
      @product-added-to-cart="addToCart"
    />
  </nuxt-link>
</template>

<script setup lang="ts">
// Components
import AppWishlistItemInteractions from '~/components/wishlist/item/Interactions.vue'
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

  & .base-item {
    &__title,
    &__price {
      color: map-get($theme-colors, 'primary-color');
    }

    &__image {
      height: 200rem;

      .ui-lazy-image {
        object-fit: contain;
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr 2fr;
  }
}
</style>
