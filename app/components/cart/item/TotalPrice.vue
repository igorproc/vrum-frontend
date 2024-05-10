<template>
  <div class="app-cart-item-total-price">
    <span class="app-cart-item-total-price__label">
      Total Price:
    </span>
    <span class="app-cart-item-total-price__content">
      {{ totalPrice }}
    </span>
  </div>
</template>

<script setup lang="ts">
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'

interface Props {
  productPrice: number,
  quantity: number,
}

const props = defineProps<Props>()
const { productPrice, quantity } = toRefs(props)

const totalPrice = computed(() => formattedPrice(productPrice.value * quantity.value))
</script>

<style lang="scss">
.app-cart-item-total-price {
  &__label {
    font-size: 16rem;
    font-weight: bold;
  }

  @media #{map-get($display-rules, 'md')} {
   &__label {
     display: none;
   }
  }
}
</style>
