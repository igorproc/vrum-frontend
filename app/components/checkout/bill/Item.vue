<template>
  <div v-if="name && qty" class="app-checkout-product-item">
    <div class="app-checkout-product-item__info">
      <span class="app-checkout-product-item__info-name">
        {{ name }}
      </span>
      <ui-icon
        name="common/close"
        class="app-checkout-product-item__info-divider"
      />
      <span class="app-checkout-product-item__info-quantity">
        {{ qty }}
      </span>
    </div>

    <span class="app-checkout-product-item__price">
      {{ totalPrice }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { formattedPrice } from '~/utils/getCurrencyFormat.util'

interface Props {
  name: string,
  qty: number,
  price: number,
}

const props = defineProps<Props>()
const { name, qty, price } = toRefs(props)

const totalPrice = computed(() => formattedPrice(price.value * qty.value))
</script>

<style lang="scss">
.app-checkout-product-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__info {
    &-name {
      font-family: $poppins-font-family;
      color: map-get($theme-colors, 'secondary-color');
      font-weight: 400;
    }

    &-quantity {
      font-family: $poppins-font-family;
      font-size: 14rem;
      font-weight: 500;
    }
  }

  &__price {
    font-family: $poppins-font-family;
    font-weight: 400;
  }
}
</style>
