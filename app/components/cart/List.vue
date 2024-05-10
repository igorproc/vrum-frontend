<template>
  <div class="app-cart-list">
    <AppCartListHeader class="app-cart-list__header" />

    <div class="app-cart-list__items">
      <div
        v-for="item in cartStore.products"
        :key="item.product.id"
        class="app-cart-list__items-item list-item"
      >
        <AppCartItemResolver
          :product="item"
          @product-remove="productRemove"
        />
        <div class="list-item__divider" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()

const productRemove = (id: number) => {
  cartStore.products = cartStore.products.filter(product => product.product.id !== id)
}
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
