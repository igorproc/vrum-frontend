<template>
  <ui-tabs class="app-product-options-tabs">
    <template #header-append>
      <div class="app-product-options-tabs__add-group add-group">
        <ui-button variant="outlined" prepend-icon="common/plus" label="add" class="add-group__action" />
      </div>
    </template>

    <ui-tab
      v-for="option in options"
      :key="option.id"
      :title="option.name"
      class="app-product-options-tabs__item"
    >
      <h5>{{ option }}</h5>
    </ui-tab>
  </ui-tabs>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TConfigurableProductOptions } from '~/api/product/configurable/shred.types'

interface Props {
  options: TConfigurableProductOptions[]
}

const props = defineProps<Props>()
const { options } = toRefs(props)
</script>

<style lang="scss">
.app-product-options-tabs {
  &__add-group {

    .add-group__action {
      border-radius: 8rem;
      padding: 8rem 12rem;
    }
  }
}
</style>
