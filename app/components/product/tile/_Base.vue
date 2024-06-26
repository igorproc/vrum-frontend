<template>
  <ui-card
    hoverable
    :title="product.name"
    :subtitle="product.brand?.name || ''"
    class="app-product-tile --base base-product"
    :link="{ path: 'product/' + product.name.toLowerCase() }"
  >
    <template #cover>
      <div class="base-product__image-container">
        <ui-image
          :src="product.productImage"
          :alt="product.name"
        />
      </div>
    </template>

    <template #content-expand>
      <div class="base-product__price-container price-container">
        <span class="price-container__actual-price">
          {{ productPrice }}
        </span>
      </div>
    </template>

    <template #hover-effect>
      <div class="base-product__hover-container hover-container">
        <ui-button
          label="Add To Cart"
          class="hover-container__add-to-cart-action"
          @click.prevent="addProductToCart"
        />

        <div class="hover-container__additional-actions additional-actions">
          <ui-button
            variant="text"
            label="Share"
            prepend-icon="user/share"
            @click.prevent="shareProductUrl"
          />
          <ui-button
            variant="text"
            label="Like"
            prepend-icon="user/heart"
            @click.prevent="addProductToWishlist"
          />
        </div>
      </div>
    </template>
  </ui-card>
</template>

<script setup lang="ts">
// Composables
import { useProduct } from '~/composables/useProduct'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  product: TProduct
}

const props = defineProps<Props>()
const { product } = toRefs(props)

const notificationStore = useNotificationStore()
const runtimeConfig = useRuntimeConfig()
const {
  productIsAddedToCart,
  productIsAddedToWishlist,
  operationWithCartIsProcessing,
  operationWithWishlistIsProcessing,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
} = useProduct(product.value)

const productPrice = computed(() => {
  return formattedPrice(product.value.price)
})

const productUrl = computed(() => `${runtimeConfig.public.appUrl}/product/${product.value.name}`)

const addProductToWishlist = () => {
  if (operationWithWishlistIsProcessing.value) {
    return
  }

  if (productIsAddedToWishlist.value) {
    removeFromWishlist()
    return
  }
  addToWishlist()
}
const addProductToCart = () => {
  if (operationWithCartIsProcessing.value) {
    return
  }

  if (productIsAddedToCart.value) {
    removeFromCart()
    return
  }
  addToCart()
}

const shareProductUrl = () => {
  if (import.meta.server || !window) {
    return
  }

  navigator
    .clipboard
    .writeText(productUrl.value)

  notificationStore.openInfoNotification('Link was copied to clipboard')
}
</script>

<style lang="scss">
.app-product-tile.--base {

  & .base-product {
    &__image-container {
      height: 300rem;

      .ui-image .ui-lazy-image  {
        object-fit: contain;
      }
    }

    &__price-container {
      height: 30rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price-container__actual-price {
        font-size: 16rem;
        font-weight: bold;
      }
    }

    &__hover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .hover-container__add-to-cart-action {
        background-color: map-get($white-color-palette, 'white-5');
        border: none;

        .button-content__label {
          color: map-get($theme-colors, 'accent-color');
        }
      }

      .hover-container__additional-actions {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .ui-button {
          .nuxt-icon,
          .button-content__label {
            color: map-get($white-color-palette, 'white-5');
          }
        }
      }
    }

    @media #{map-get($display-rules, 'xl')} {
      &__image-container {
        height: 301rem;
      }

      &__price-container {
        .price-container__actual-price {
          font-size: 16rem;
        }
      }

      &__hover-container {
        .hover-container__additional-actions {
          margin-top: 24rem;
        }
      }
    }
  }
}
</style>
