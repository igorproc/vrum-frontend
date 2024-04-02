<template>
  <ui-modal
    with-backdrop
    :open="open"
    wrap-class-name="app-product-add-variant-modal"
    @close="emit('close')"
  >
    <template #header>
      <div class="app-product-add-variant-modal__header">
        <h5>Add Variant</h5>
      </div>
    </template>

    <AppAdminProductVariantFormAdd
      :id="id"
      class="app-product-add-variant-modal__form"
      @variant-added="variantAdded"
    />
  </ui-modal>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TConfigurableProductVariants } from '~/api/product/configurable/shred.types'

interface Props {
  id: number,
  open: boolean,
}

interface Emits {
  (name: 'close'): void,
  (name: 'variantAdded', data: TConfigurableProductVariants): void,
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { id, open } = toRefs(props)

const variantAdded = (variant: TConfigurableProductVariants) => {
  emit('variantAdded', variant)
}
</script>
