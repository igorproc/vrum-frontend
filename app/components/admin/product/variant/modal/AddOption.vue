<template>
  <ui-modal
    :open="open"
    with-backdrop
    wrap-class-name="app-product-add-variant-modal"
    @close="onClose"
  >
    <template #header>
      <h5>выбор возможной опции</h5>
    </template>

    <AppAdminProductVariantFormAddOption
      :id="variantId"
      :variants="variants"
      :options="options"
      class="app-product-add-variant-modal__form"
      @option-added="optionAdded"
    />
  </ui-modal>
</template>

<script setup lang="ts">
import type {
  TConfigurableProductOptions,
  TConfigurableProductVariantAttribute,
} from '~/api/product/configurable/shred.types'

interface Props {
  open: boolean,
  variantId: number,
  variants: TConfigurableProductVariantAttribute[],
  options: TConfigurableProductOptions[],
}

interface Emits {
  (name: 'close'): void,
  (name: 'optionAdded', data: TConfigurableProductVariantAttribute & { groupId: number }): void,
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { open, variantId, options, variants } = toRefs(props)

const onClose = () => {
  emit('close')
}

const optionAdded = (data: TConfigurableProductVariantAttribute) => {
  emit('optionAdded', { ...data, groupId: variantId.value })
}
</script>
