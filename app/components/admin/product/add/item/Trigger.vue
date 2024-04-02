<template>
  <ui-button
    variant="outlined"
    label="Add"
    prepend-icon="common/plus"
    class="app-add-brand-modal-trigger"
    @click="conditionStore.openAdminAddProductModal"
  />
</template>

<script setup lang="ts">
const conditionStore = useConditionStore()
</script>

<style lang="scss">
.app-add-brand-modal-trigger {
  .ui-button__content {
    display: none;
  }

  @media #{map-get($display-rules, 'md')} {
    .ui-button__content {
      display: block;
    }
  }
}
</style>
