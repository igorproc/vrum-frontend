<template>
  <div class="app-product-list product-list">
    <ui-skeleton-card
      v-if="isLoading"
      v-for="index in pageSize"
      :key="generateRandomId() + index"
    />

    <AppProductTilesResolver
      v-else
      v-for="product in productList"
      :key="product.id"
      :product="product"
      class="product-list__item"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductTilesResolver from '~/components/product/tile/Resolver.vue'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import AppProductListFilters from '~/components/product/list/Header.vue'
import AppProductListPagination from '~/components/product/list/Pagination.vue'
import { generateRandomId } from '~/utils/generate.util'

interface Props {
  productList: TProduct[] | null,
  isLoading: boolean,
  pageSize: number,
}

const props = defineProps<Props>()
const { productList } = toRefs(props)
</script>

<style lang="scss">
.app-product-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12rem;

  @media #{map-get($display-rules, 'md')} {
    justify-content: space-between;
    gap: 24rem;
  }

  @media #{map-get($display-rules, 'lg')} {
    justify-content: flex-start;
  }

  @media #{map-get($display-rules, 'xl')} {
    gap: 51rem;
  }

  @media #{map-get($display-rules, 'xxl')} {
    gap: 27rem;
  }
}
</style>
