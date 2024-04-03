<template>
  <div class="app-cart-list">
    <AppCartListHeader class="app-cart-list__header" />

    <div class="app-cart-list__items">
      <AppCartItemResolver
        v-for="item in items"
        :key-="item.product.id"
        :product="item"
        @product-remove="productRemove"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TCartProduct } from '~/api/cart/getProducts'

interface Props {
  items: TCartProduct[]
}

const props = defineProps<Props>()
const items = ref(props.items)

const productRemove = (id: number) => {
  items.value = items.value.filter(item => item.product.id !== id)
}
</script>

<style lang="scss">
.app-cart-list {
  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16rem;
  }

  @media #{map-get($display-rules, 'md')} {
    &__items {
      padding: 25rem 35rem;
      margin-top: 55rem;
    }
  }
}
</style>
