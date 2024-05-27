<template>
  <div class="app-cart-total">
    <div class="app-cart-total__container">
      <h2 class="app-cart-total__title">
        Итоговая корзина
      </h2>
      <div class="app-cart-total__price-container">
        <h4 class="app-cart-total__price-label">
          итого
        </h4>
        <span class="app-cart-total__price-content">
          {{ formattedTotalPrice }}
        </span>
      </div>
      <div class="app-cart-total__actions">
        <ui-button
          :link="{ name: 'cart-checkout' }"
          variant="outlined"
          background-color="#fff"
          label="оформить"
          class="app-cart-total__actions-checkout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'

const cartStore = useCartStore()

const formattedTotalPrice = computed(() => formattedPrice(cartStore.totalPrice))
</script>

<style lang="scss">
.app-cart-total {
  height: 300rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: map-get($theme-colors, 'surface-color');

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24rem;
  }

  &__title {
    font-family: $poppins-font-family;
    font-weight: 400;
    color: map-get($white-color-palette, 'white-5');
  }

  &__price-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__price {
    &-label {
      color: map-get($white-color-palette, 'white-5');
    }

    &-content {
      font-family: $poppins-font-family;
      color: map-get($white-color-palette, 'white-5');
      font-size: 18rem;
    }
  }

  &__actions-checkout {
    border-radius: 8rem;

    .button-content__label {
      color: map-get($white-color-palette, 'white-5') !important;
    }
  }
}
</style>
