<template>
  <div class="app-cart-list">
    <AppCartListHeader class="app-cart-list__header" />

    <div class="app-cart-list__items">
      <div
        v-for="item in cartStore.idsList"
        :key="item.id"
        class="app-cart-list__items-item list-item"
      >
        <AppCartItemResolver
          v-if="getProductByCartItem(item)"
          :product="getProductByCartItem(item) as TCartProduct"
        />
        <div class="list-item__divider" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TCartProductIds } from '~/api/cart/getShortData'
import type { TCartProduct } from '~/api/cart/getProducts'

const cartStore = useCartStore()

const getProductByCartItem = computed(() => {
  return (item: TCartProductIds['items'][0]) => {
    let productData: TCartProduct | null = null

    if (!item.variantId) {
      productData = cartStore.products.find(product => product.product.id === item.productId) || null
    } else {
      productData = cartStore.products.find(product => product.product.id === item.productId && product.selectedVariant === item.variantId) || null
    }

    return productData
  }
})
</script>

<style lang="scss">
.app-cart-list {
  &__header {
    display: none;
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24rem;

    .list-item {
      width: 100%;

      &__divider {
        padding: 5rem 0;
        border-bottom: 1rem solid map-get($theme-colors, 'primary-color');
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    &__header {
      display: block;
    }

    &__items {
      margin-top: 35rem;
    }
  }

  @media #{map-get($display-rules, 'lg')} {
    &__items {
      padding: 25rem 35rem;
      margin-top: 55rem;
    }
  }
}
</style>
