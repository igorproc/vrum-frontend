<template>
  <div class="app-admin-brands-page">
    <AppAdminBrandHeader
      :total-products="data?.brands.length || 0"
      class="app-admin-brands-page__header"
    />

    <AppAdminBrandTable
      :brands="data?.brands || []"
      class="app-admin-brands-page__list"
      @success-delete="refresh"
    />
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getBrandList } from '~/api/brand/getBrandList'

const { $listen } = useNuxtApp()
const { data, refresh } = useAsyncData(
  'admin-brands',
  async () => await getBrandList(1, 999)
)

onMounted(() => {
  $listen('brand:add', () => refresh())
})
</script>

<style lang="scss">
.app-admin-brands-page {
  &__list {
    margin-top: 16rem;
  }

  @media #{map-get($display-rules, 'md')} {
    &__list {
      margin-top: 32rem;
    }
  }
}
</style>
