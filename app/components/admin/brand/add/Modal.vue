<template>
  <ui-modal
    v-model:open="adminAddBrandModalIsOpen"
    wrap-class-name="app-add-brand-modal"
  >
    <template #header>
      <h4 class="app-add-brand-modal__title">
        Add Brand
      </h4>
    </template>

    <AppAdminBrandAddForm @success-added="productWasAdded" />
  </ui-modal>
</template>

<script setup lang="ts">

const { $emit } = useNuxtApp()
const conditionStore = useConditionStore()
const { adminAddBrandModalIsOpen } = storeToRefs(conditionStore)

watch(adminAddBrandModalIsOpen, newVal => {
  if (newVal) {
    return
  }

  conditionStore.closeAdminAddBrandModal()
})

const productWasAdded = () => {
  conditionStore.closeAdminAddBrandModal()
  $emit('brand:add')
}
</script>

<style lang="scss">
.app-add-brand-modal {
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
