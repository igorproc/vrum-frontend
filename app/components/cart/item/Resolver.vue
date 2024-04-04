<template>
  <component :is="cartTile" :item="product" @product-remove="productRemove" />
</template>

<script setup lang="ts">
import type { TCartProduct } from '~/api/cart/getProducts'

interface Emits {
  (name: 'productRemove', id: number): void
}

interface Props {
  product: TCartProduct,
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { product } = toRefs(props)

const cartTile = computed(() => {
  if (product.value.product.__typename === 'CONFIGURABLE') {
    return defineAsyncComponent(() => import('./Configurable.vue'))
  }
  return defineAsyncComponent(() => import('./_Base.vue'))
})

const productRemove = (id: number) => {
  emit('productRemove', id)
}
</script>
