<template>
  <div class="app-admin-orders-page">
    <AppAdminOrderTable :orders="data?.orders || []" />
    <AppProductListPagination
      :is-disabled="pending"
      :total-pages="data?.totalPages || 0"
      :current-page="currentPage"
      class="app-admin-orders-page__pagination"
      @update-current-page="updatePageHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { getCheckoutPage } from '~/api/checkout/getPage'

const currentPage = ref(1)

const { data, pending, refresh } = useAsyncData(
  'admin-orders',
  async () => await getCheckoutPage({ page: currentPage.value }),
)

const updatePageHandler = (page: number) => {
  currentPage.value = page
  refresh()
}
</script>

<style lang="scss">
.app-admin-orders-page {
  &__pagination {
    margin-top: 32rem;
  }
}
</style>
