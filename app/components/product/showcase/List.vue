<template>
  <div class="app-product-showcase-list">
    <h1 class="app-product-showcase-list__title">
      Витрина
    </h1>

    <div class="app-product-showcase-list__products products">
      <AppProductTileResolver
        v-for="product in productList"
        :key="product.id"
        :product="product"
        class="products__item"
      />
    </div>

    <div class="app-product-showcase-list__link">
      <ui-button
        label="ещё"
        :link="{ name: 'products', query: { page: 1, size: 12 } }"
        variant="outlined"
        title="Show More"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  productList: TProduct[]
}

defineProps<Props>()
</script>

<style lang="scss">
.app-product-showcase-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    font-family: $poppins-font-family;
    font-size: 24rem;
    font-weight: bold;
  }

  &__products {
    margin-top: 15rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15rem;
  }

  &__link {
    margin-top: 20rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    &__title {
      font-size: 40rem;
    }

    &__products {
      gap: 32rem;
    }

    &__link {
      margin-top: 32rem;
    }
  }
}
</style>
