<template>
  <div class="app-admin-product-page">
    <AppAdminProductBlockMain
      v-if="data"
      :product="data"
      @product-update="refresh"
      class="app-admin-product-page__main"
    />

    <AppAdminProductOptionTabs
      v-if="data?.__typename === EAddProductTypes.configurable"
      :options="data?.configurable?.options || []"
      class="app-admin-product-page__options"
    />
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getProductDataById } from '~/api/product/getProductDataById'
import { EAddProductTypes } from '~/api/product/shared.types'

const router = useRouter()
const onLoad = async () => {
  const productId = Number(router.currentRoute.value.params.id)

  if (!productId) {
    await router.push({ name: 'error' })
    return null
  }

  return await getProductDataById(productId)
}

const { data, refresh } = useAsyncData(
  `admin-product-${router.currentRoute.value.params.id}`,
  async () => await onLoad(),
)
</script>

<style lang="scss">
.app-admin-product-page {
  &__options {
    margin-top: 32rem;
  }
}
</style>
