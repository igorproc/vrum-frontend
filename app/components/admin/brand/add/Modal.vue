<template>
  <ui-modal
    v-model:open="adminAddBrandModalIsOpen"
    with-backdrop
    wrap-class-name="app-add-brand-modal"
  >
    <template #header>
      <h4 class="app-add-brand-modal__title">
        добавление бренда
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
