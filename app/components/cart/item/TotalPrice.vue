<template>
  <div class="app-cart-item-total-price">
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
