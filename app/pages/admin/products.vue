<template>
  <div class="app-admin-products-page">
    <AppAdminProductHeader
      :total-products="data?.totalProducts || 0"
      class="app-admin-products-page__header"
    />
    <AppAdminProductTable
      :products="data?.products || []"
      class="app-admin-products-page__list"
      @success-delete="refresh"
    />
    <AppProductListPagination
      :is-disabled="pending"
      :total-pages="data?.totalPages || 0"
      :current-page="currentPage"
      class="app-admin-products-page__pagination"
      @update-current-page="updatePage"
    />
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'

const currentPage = ref(1)

const { $listen } = useNuxtApp()
const { data, refresh, pending } = useAsyncData(
  'admin-product-list',
  async () => await getProductPage({
    page: currentPage.value,
    size: 16
  })
)

$listen('product:add', () => refresh())

const updatePage = (page: number) => {
  currentPage.value = page
  refresh()
}
</script>

<style lang="scss">
.app-admin-products-page {
  &__list, &__pagination {
    margin-top: 16rem;
  }

  @media #{map-get($display-rules, 'md')} {
    &__list, &__pagination {
      margin-top: 32rem;
    }
  }
}
</style>
