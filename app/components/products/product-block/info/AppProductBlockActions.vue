<template>
  <div class="app-product-block-actions">
    <div
      v-if="product.__typename === 'CONFIGURABLE'"
      class="app-product-block-actions__switches"
    >
      <AppConfigurableProductSwitchGroup
        :product-options="product.configurable?.options || []"
        :product-variants="product.configurable?.variants || []"
        @product-variant-is-selected="productVariantIsSelected"
      />
    </div>

    <div class="app-product-block-actions__product actions-product">
      <ui-button
        :disabled="addToWishlistActionIsDisabled"
        background-color="#000"
        prepend-icon="user/heart"
        class="actions-product__wishlist"
        @click="addProductToWishlist"
      />

      <ui-button
        :disabled="addToCartActionIsDisabled"
        background-color="#000"
        variant="outlined"
        prepend-icon="user/cart"
        label="Add To Cart"
        class="actions-product__cart"
        @click="addProductToCart"
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
}

const props = defineProps<Props>()
const { product } = toRefs(props)
const {
  productIsAddedToWishlist,
  configurableProductVariant,
  productIsAddedToCart,
  operationWithWishlistIsProcessing,
  operationWithCartIsProcessing,
  addToWishlist,
  removeFromWishlist,
  addToCart,
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

const addProductToCart = async () => {
  if (addToCartActionIsDisabled.value) {
    return
  }

  return await addToCart()
}

const productVariantIsSelected = (variantId: number | null) => {
  addProductVariant(variantId)
}
</script>

<style lang="scss">
.app-product-block-actions {

  &__product {
    margin-top: 16rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .actions-product {
      &__wishlist {
        border-radius: 8rem;

        &[disabled] {
          cursor: default;
          opacity: 0.6;
        }

        .ui-icon {
          font-size: 20rem !important;
          color: map-get($white-color-palette, 'white');
        }
      }

      &__cart {
        border-radius: 8rem;

        &[disabled] {
          cursor: default;
          opacity: 0.6;
        }

        .ui-icon {
          font-size: 20rem !important;
        }

        .button-content__label {
          font-size: 20rem;
        }
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    &__switches {
      width: 100%;
    }

    &__product {
      margin-top: 32rem;
      gap: 16rem;
      justify-content: center;
    }
  }

  @media #{map-get($display-rules, 'xl')} {
    &__product {
      justify-content: flex-start;

      .ui-button {
        padding: 10rem 13rem;
      }
    }
  }
}
</style>
