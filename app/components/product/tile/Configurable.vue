<template>
  <UiCard
    :title="product.name"
    :subtitle="product.brand?.name || ''"
    :link="{ path: 'product/' + product.name.toLowerCase() }"
    class="app-product-tile --configurable configurable-product"
  >
    <template #cover>
      <div class="configurable-product__image-container">
        <ui-image :src="product.productImage" :alt="product.name" />
      </div>
    </template>

    <template #content-expand>
      <div class="configurable-product__price-container price-container">
        <span class="price-container__actual-price">
          {{ productPrice }}
        </span>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  product: TProduct
}

const runtimeConfig = useRuntimeConfig()

const props = defineProps<Props>()
const { product } = toRefs(props)

const productPrice = computed(() => {
  return formattedPrice(product.value.price)
})

const productUrl = computed(() => `${runtimeConfig.public.appUrl}/product/${product.value.name}`)

const shareProductUrl = () => {
  if (import.meta.server || !window) {
    return
  }

  navigator
    .clipboard
    .writeText(productUrl.value)
}
</script>

<style lang="scss">
.app-product-tile.--configurable {

  & .configurable-product {
    &__image-container {
      padding: 8rem;
      height: 300rem;

      .ui-image .ui-lazy-image {
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
