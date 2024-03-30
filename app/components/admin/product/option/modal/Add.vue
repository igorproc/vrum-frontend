<template>
  <ui-modal
    :open="open"
    @close="onClose"
    class="app-product-option-add-modal"
  >
    <AppAdminProductOptionFormAdd
      :group-id="groupId"
      @option-created="optionCreated"
      class="app-product-option-add-modal__form"
    />
  </ui-modal>
</template>

<script setup lang="ts">
import type { TConfigurableProductOptionValue } from '~/api/product/configurable/shred.types'

interface Props {
  open: boolean,
  groupId: number,
}

interface Emits {
  (name: 'close'): void,
  (name: 'optionAdded', data: TConfigurableProductOptionValue & { groupId: number }): void,
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { groupId, open } = toRefs(props)

const onClose = () => {
  emit('close')
}

const optionCreated = (item: TConfigurableProductOptionValue) => {
  emit('optionAdded', { ...item, groupId: groupId.value })
}
</script>
