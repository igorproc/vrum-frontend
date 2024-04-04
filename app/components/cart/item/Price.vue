<template>
  <div class="app-cart-item-price">
    <span class="app-cart-item-price__label">
      Price:
    </span>

    <span class="app-cart-item-price__content">
      {{ productPrice }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { formattedPrice } from '~/utils/getCurrencyFormat.util'

interface Props {
  price: number
}

const props = defineProps<Props>()
const { price } = toRefs(props)

const productPrice = computed(() => formattedPrice(price.value))
</script>

<style lang="scss">
.app-cart-item-price {
  &__label {
    font-size: 20rem;
    font-weight: bold;
  }

  @media #{map-get($display-rules, 'md')} {
    &__label {
      display: none;
    }
  }
}
</style>
