<template>
  <div class="app-brand-header">
    <span class="app-brand-header__total-products">
      {{ totalProductsText }}
    </span>

    <div class="app-brand-header__actions header-actions">
      <AppAdminBrandAddTrigger
        class="header-actions__add-brand"
      />
    </div>
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
.app-brand-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
