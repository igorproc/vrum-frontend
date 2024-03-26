<template>
  <component :is="currentComponent" :product="product" />
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TWishlistProduct } from '~/api/wishlist/getProducts'

interface Props {
  product: TWishlistProduct,
}

const props = defineProps<Props>()
const { product } = toRefs(props)

const currentComponent = computed(() => {
  if (product.value.product.__typename === 'CONFIGURABLE' && product.value.selectedVariant) {
    return defineAsyncComponent(() => import('./Configurable.vue'))
  }
  return defineAsyncComponent(() => import('./_Base.vue'))
})
</script>
