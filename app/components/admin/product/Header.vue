<template>
  <div class="app-product-header">
    <span class="app-product-header__total-products">
     {{ totalProductsText }}
    </span>

    <AppAdminProductAddItemTrigger />
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalProducts: number
}

const props = defineProps<Props>()

const totalProductsText = computed(() => `Total products: ${props.totalProducts}`)
</script>

<style lang="scss">
.app-product-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
