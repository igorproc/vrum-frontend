<template>
  <component :is="tileComponent" :product="product" />
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  product: TProduct
}

const props = defineProps<Props>()
const { product } = toRefs(props)

const tileComponent = computed(() => {
  if (product.value.__typename === 'CONFIGURABLE') {
    return defineAsyncComponent(() => import('./Configurable.vue'))
  }
  return defineAsyncComponent(() => import('./_Base.vue'))
})
</script>
