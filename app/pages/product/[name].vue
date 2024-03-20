<template>
  <div v-if="data" class="app-product-page">
    <AppProductMainBlockResolver
      :product="data"
      class="app-product-page__main-block"
    />
    <AppProductDescriptionResolver
      :description="data.description"
      class="app-product-page__description"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductMainBlockResolver from '~/components/products/product-block/Resolver.vue'
import AppProductDescriptionResolver from '~/components/products/product-block/info/AppDescriptionResolver.vue'
// Api Methods
import { getProductData } from '~/api/product/getProductData'

const route = useRoute()
const router = useRouter()

const onLoad = async () => {
  const productName = route.params.name

  if (typeof productName !== 'string' || Array.isArray(route.params.name)) {
    await router.push({ name: 'error' })
    return null
  }

  return await getProductData(productName)
}

const { data } = useLazyAsyncData(
  `product-page-${route.params.name}`,
  async () => await onLoad()
)
</script>

<style lang="scss">
.app-product-page {
  &__description {
    margin-top: 32rem;
  }

  @media #{map-get($display-rules, 'md')} {
    &__main-block {
      padding: 35rem 0;
    }

    &__description {
      margin-top: 50rem;
    }
  }
}
</style>
