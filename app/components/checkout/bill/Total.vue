<template>
  <div class="app-checkout-total-price">
    <span class="app-checkout-total-price__label">
      Total
    </span>
    <span class="app-checkout-total-price__content">
      {{ totalPrice }}
    </span>
  </div>
</template>

<script setup lang="ts">
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'

interface Props {
  price: number
}

const props = defineProps<Props>()
const { price } =  toRefs(props)

const totalPrice = computed(() => formattedPrice(price.value))
</script>

<style lang="scss">
.app-checkout-total-price {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__label {
    font-family: $poppins-font-family;
    font-size: 24rem;
    font-weight: 400;
  }

  &__content {
    font-family: $poppins-font-family;
    font-size: 24rem;
    font-weight: bold;
  }
}
</style>
