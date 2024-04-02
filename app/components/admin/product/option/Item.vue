<template>
  <div class="app-product-option">
    <div class="app-product-option__header">
      <h5 class="app-product-option__header-title">
        {{ option.name }}
      </h5>

      <ui-button
        variant="outlined"
        prepend-icon="common/plus"
        title="add"
        @click="emit('optionAdd', option.id)"
      />
    </div>

    <ui-table
      has-append-column
      :rows="tableRows"
      :items="option.values"
      class="app-product-option__table"
    >
      <template #item-append="{ item }">
        <div class="app-product-option__table-item-actions">
          <ui-button
            prepend-icon="user/edit"
            variant="text"
            @click="emit('optionUpdate', item)"
          />
          <ui-button
            prepend-icon="common/close"
            variant="text"
            @click="deleteOption(item)"
          />
        </div>
      </template>
    </ui-table>
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { deleteConfigurableAttribute, EDeleteProductAttributeTypes } from '~/api/product/configurable/delete'
// Types & Interfaces
import type {
  TConfigurableProductOptions,
  TConfigurableProductOptionValue,
} from '~/api/product/configurable/shred.types'
import type { TUiTableRow } from '~/components/ui/table/table.vue'

interface Props {
  option: TConfigurableProductOptions,
}

interface Emits {
  (name: 'optionAdd', id: number): void,

  (name: 'optionUpdate', data: TConfigurableProductOptionValue): void,

  (name: 'optionDelete', data: { groupId: number, id: number }): void
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { option } = toRefs(props)

const tableRows: TUiTableRow<TConfigurableProductOptionValue>[] = [
  {
    label: 'ID',
    target: 'id',
  },
  {
    label: 'name',
    target: 'name',
  },
  {
    label: 'value',
    target: 'value',
  },
  {
    label: 'action',
  },
]

const deleteOption = async (data: TConfigurableProductOptions) => {
  const isDeleted = await deleteConfigurableAttribute({
    type: EDeleteProductAttributeTypes.option,
    id: data.id,
  })

  if (!isDeleted?.successDelete) {
    return
  }
  emit(
    'optionDelete',
    {
      groupId: option.value.id,
      id: data.id,
    },
  )
}
</script>

<style lang="scss">
.app-product-option {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__table {
    margin-top: 16rem;

    &-item-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8rem;
    }
  }
}
</style>
