<template>
  <ui-modal
    with-backdrop
    :open="open"
    class="app-product-option-add-modal"
    @close="onClose"
  >
    <template #header>
      <h5>Добавление опции</h5>
    </template>

    <AppAdminProductOptionFormAdd
      :group-id="groupId"
      class="app-product-option-add-modal__form"
      @option-created="optionCreated"
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
