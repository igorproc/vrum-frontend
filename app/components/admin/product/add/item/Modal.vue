<template>
  <ui-modal
    with-backdrop
    :open="conditionStore.adminAddProductModalIsOpen"
    :on-close="conditionStore.closeAdminAddProductModal"
    wrap-class-name="app-add-product-modal"
  >
    <template #header>
      <h4 class="app-add-product-modal__title">
        Add Product
      </h4>
    </template>

    <AppAdminProductAddItemForm
      class="app-add-product-modal__form"
      @product-added="onAddProduct"
    />
  </ui-modal>
</template>

<script setup lang="ts">
const { $emit } = useNuxtApp()
const conditionStore = useConditionStore()

const onAddProduct = () => {
  conditionStore.closeAdminAddProductModal()
  $emit('product:add')
}
</script>
