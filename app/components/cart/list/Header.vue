<template>
  <div class="app-cart-list-header">
    <div class="app-cart-list-header__wrapper">
      <div v-for="title in headerTitles" :key="title.id" class="app-cart-list-header__item">
      <span class="app-cart-list-header__item-label">
        {{ title.label }}
      </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateRandomId } from '~/utils/generate.util'

const headerTitles = [
  {
    id: generateRandomId(),
    label: 'Product',
  },
  {
    id: generateRandomId(),
    label: 'Price',
  },
  {
    id: generateRandomId(),
    label: 'Quantity',
  },
  {
    id: generateRandomId(),
    label: 'Subtotal',
  },
]
</script>

<style lang="scss">
.app-cart-list-header {
  padding: 10rem 20rem;
  background-color: map-get($theme-colors, 'secondary-color');

  &__wrapper {
    width: 100%;
    display: flex;
  }

  &__item {
    flex: 1 1 25%;

    &-label {
      font-family: $poppins-font-family;
      font-size: 18rem;
      font-weight: 500;
      color: map-get($theme-colors, 'primary-color');
    }
  }

  @media #{map-get($display-rules, 'lg')} {
    padding: 25rem 35rem;
  }
}
</style>
