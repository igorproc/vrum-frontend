<template>
  <ui-modal
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

<style lang="scss">
.app-add-product-modal {
  width: 85vw;

  .modal-content__header .ui-icon {
    font-size: 24rem !important;
  }

  @media #{map-get($display-rules, 'md')} {
    width: 70vw;
  }

  @media #{map-get($display-rules, 'lg')} {
    width: 40vw;
  }

  @media #{map-get($display-rules, 'xl')} {
    width: 25vw;
  }
}
</style>
