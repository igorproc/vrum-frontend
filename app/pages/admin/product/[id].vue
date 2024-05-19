<template>
  <div class="app-admin-product-page">
    <AppAdminProductBlockMain
      v-if="data"
      ref="edit"
      :product="data"
      class="app-admin-product-page__main"
      @product-update="productUpdateHandler"
    />

    <AppAdminProductOptionTabs
      v-if="data?.__typename === EAddProductTypes.configurable"
      :id="data?.id || 0"
      :options="data?.configurable?.options || []"
      class="app-admin-product-page__options"
    />

    <AppAdminProductVariantTabs
      v-if="data?.__typename === EAddProductTypes.configurable"
      :id="data.id || 0"
      :options="data?.configurable?.options || []"
      :variants="data?.configurable?.variants || []"
      class="app-admin-product-page__variants"
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

const edit = ref<{ setCurrentValues: () => void } | null>(null)

const productUpdateHandler = async () => {
  await refresh()
  edit.value?.setCurrentValues()
}
</script>

<style lang="scss">
.app-admin-product-page {
  &__options, &__variants {
    margin-top: 32rem;
    padding: 16rem 24rem;
  }
}
</style>
