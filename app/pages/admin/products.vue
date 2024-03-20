<template>
  <div class="admin-products-page w-100 h-100 px-2">
    <AppAdminProductListHeader :product-count="data?.products.length" class="admin-products-page__header" />
    <AppAdminProductList :product-list="data?.products || []" class="admin-products-page__products-table" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppAdminProductList from '~/components/admin/products/product-list/AppAdminProductList.vue'
import AppAdminProductListHeader from '~/components/admin/products/AppAdminProductListHeader.vue'
// Pinia Stores
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

definePageMeta({
  middleware: ['auth'],
  isAdminPage: true,
})

const { data } = await useAsyncData(
  'product-list-admin',
  async () => await getProductPage(),
)
</script>

<style>
.admin-products-page {
  padding: 0 15px;

  .admin-products-page__products-table {
    margin-top: 0.75rem;
  }
}
</style>
