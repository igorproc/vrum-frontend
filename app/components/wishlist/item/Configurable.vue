<template>
  <nuxt-link
    :to="{ name: 'index' }"
    class="app-wishlist-item --configurable configurable-item"
  >
    <h5 class="configurable-item__title">
      {{ product.product.name }}
    </h5>
    <div class="configurable-item__image">
      <ui-image :src="productImage" :alt="product.product.name" />
    </div>
    <p class="configurable-item__price">
      {{ productPrice }}
    </p>
    <AppWishlistItemInteractions
      :operation-with-wishlist-is-processing="operationWithWishlistIsProcessing"
      :operation-with-cart-is-processing="operationWithCartIsProcessing"
      class="configurable-item__interactions"
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
  addProductVariant,
} = useProduct(product.value.product)

addProductVariant(product.value.selectedVariant)

const productImage = computed(() => {
  if (!product.value.selectedVariant || !product.value.product.configurable?.variants) {
    return product.value.product.productImage
  }

  const selectedVariant = product
    .value
    .product
    .configurable
    .variants.find(item => item.product.id === product.value.selectedVariant)

  if (!selectedVariant || !selectedVariant.product.imageUrl) {
    return product.value.product.productImage
  }

  return selectedVariant.product.imageUrl
})
const productPrice = computed(() => formattedPrice(product.value.product.price))
</script>

<style lang="scss">
.app-wishlist-item.--configurable {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8rem;
  text-decoration: none;

  .configurable-item {
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
