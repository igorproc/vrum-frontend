<template>
  <section class="app-product-block product-block --configurable">
    <div class="product-block__image-container product-image-container">
      <ui-image
        :alt="product.name"
        :src="product.productImage"
        class="product-image-container__image"
      />
    </div>

    <div class="product-block__content-container product-content-container">
      <div class="product-content-container__information content-information">
        <h1 class="content-information__title">
          {{ product.name }}
        </h1>
        <h3 class="content-information__price">
          {{ productPrice }}
        </h3>
      </div>

      <AppProductBlockActions
        :product="product"
        class="product-content-container__actions"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
// Components
import AppProductBlockActions from '~/components/products/product-block/info/AppProductBlockActions.vue'
import AppProductDescriptionResolver from '~/components/products/product-block/info/AppDescriptionResolver.vue'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  product: TProduct
}

const props = defineProps<Props>()
const { product } = toRefs(props)

const productPrice = computed(() => formattedPrice(product.value.price))
</script>

<style lang="scss">
.app-product-block {
  &.--configurable {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 80rem;

    .product-block__content-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16rem;

      .product-content-container__information {
        text-align: center;

        .content-information__title,
        .content-information__price,
        .content-information__description {
          font-family: $poppins-font-family;
        }

        .content-information__price {
          font-weight: normal;
          color: map-get($gray-color-palette, 'gray-2');
        }
      }
    }

    @media #{map-get($display-rules, 'md')} {
      flex-direction: row;

      .product-block__image-container {
        width: 40%;

        .product-image-container__image {
          height: 40%;
        }
      }
    }

    @media #{map-get($display-rules, 'xl')} {
      .product-block__image-container .product-image-container__image {
        width: 500rem;
        height: 500rem;
      }

      .product-block__content-container {
        gap: 32rem;
        width: 610rem;

        .product-content-container__information {
          text-align: start;
          max-width: 420rem;

          .content-information__title {
            font-size: 42rem;
          }

          .content-information__price {
            font-size: 24rem;
          }

          .content-information__description {
            max-width: 420rem;
          }
        }
      }
    }
  }
}
</style>
