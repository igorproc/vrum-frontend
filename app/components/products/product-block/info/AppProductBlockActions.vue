<template>
  <div class="app-product-block-actions">
    <div
      v-if="product.__typename === 'CONFIGURABLE'"
      class="app-product-block-actions__switches"
    >
      <AppConfigurableProductSwitchGroup
        :product-options="product.configurable?.options || []"
        :product-variants="product.configurable?.variants || []"
      />
    </div>

    <div class="app-product-block-actions__product">
      <ui-button
        :disabled="addToCartActionIsDisabled"
        background-color="#000"
        variant="outlined"
        label="Add To Cart"
      />
      <ui-button
        :disabled="addToWishlistActionIsDisabled"
        background-color="#000"
        variant="outlined"
        label="Wishlist"
        prepend-icon="user/heart"
        @click="addProductToWishlist"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import AppConfigurableProductSwitchGroup
  from '~/components/products/product-tile/swith/AppConfigurableProductSwitchGroup.vue'

interface Props {
  product: TProduct,
  variantId?: number,
}

const props = defineProps<Props>()
const { product, variantId } = toRefs(props)
const {
  productIsAddedToWishlist,
  configurableProductVariant,
  productIsAddedToCart,
  operationWithWishlistIsProcessing,
  operationWithCartIsProcessing,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  addProductVariant,
} = useProduct(product.value)

const addToCartActionIsDisabled = computed(() => {
  if (operationWithCartIsProcessing.value) {
    return true
  }
  return product.value.__typename === 'CONFIGURABLE' && !configurableProductVariant.value
})

const addToWishlistActionIsDisabled = computed(() => {
  if (operationWithWishlistIsProcessing.value) {
    return true
  }
  return product.value.__typename === 'CONFIGURABLE' && !configurableProductVariant.value
})

const addProductToWishlist = async () => {
  if (addToWishlistActionIsDisabled.value) {
    return
  }

  if (productIsAddedToWishlist.value) {
    return await removeFromWishlist()
  }
  return await addToWishlist()
}

watch(variantId, newVal => {
  addProductVariant(newVal || null)
})
</script>

<style lang="scss">
.app-product-block-actions {

  &__product {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ui-button {
      border-radius: 15rem;
    }
  }

  @media #{map-get($display-rules, 'md')} {
    &__switches {
      width: fit-content;
    }

    &__product {
      margin-top: 8rem;
      gap: 16rem;
      justify-content: center;
    }
  }

  @media #{map-get($display-rules, 'xl')} {
    &__product {
      justify-content: flex-start;

      .ui-button {
        padding: 17rem 48rem;
      }
    }

  }
}
</style>
