<template>
  <div class="app-product-variant-item-info">
    <ui-image
      :alt="variant.product.sku"
      :src="variant.product.imageUrl"
      class="app-product-variant-item-info__image"
    />

    <div class="app-product-variant-item-info__content">
      <h5 class="app-product-variant-item-info__content__name">
        sku: {{ variant.product.sku }}
      </h5>
      <h5 class="app-product-variant-item-info__content__price">
        price: {{ variantPrice }}
      </h5>
    </div>
  </div>
</template>

<script setup lang="ts">
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TConfigurableProductVariants } from '~/api/product/configurable/shred.types'

interface Props {
  variant: TConfigurableProductVariants,
}

const props = defineProps<Props>()
const { variant } = toRefs(props)

const variantPrice = computed(() => formattedPrice(variant.value.product.price))
</script>

<style lang="scss">
.app-product-variant-item-info {
  display: flex;
  align-items: center;
  gap: 16rem;

  &__image {
    width: 150rem;
    height: 150rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rem;
  }
}
</style>
