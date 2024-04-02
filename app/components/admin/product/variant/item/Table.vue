<template>
  <ui-table
    has-append-column
    :rows="tableRows"
    :items="tableItems"
    class="app-product-variant-item-table"
  >
    <template #item-append="{ item }">
      <div class="app-product-variant-item-table__actions">
        <ui-button
          :disabled="isDisabled"
          variant="text"
          prepend-icon="common/close"
          @click="deleteOption(item)"
        />
      </div>
    </template>
  </ui-table>
</template>

<script setup lang="ts">
// Api Methods
import { deleteConfigurableAttribute, EDeleteProductAttributeTypes } from '~/api/product/configurable/delete'
// Types & Interfaces
import type {
  TConfigurableProductOptions,
  TConfigurableProductVariantAttribute,
  TConfigurableProductVariants,
} from '~/api/product/configurable/shred.types'
import type { TUiTableRow } from '~/components/ui/table/table.vue'

interface TableRow {
  id: number,
  name: string,
  value: string,
}

interface Emits {
  (name: 'variantDelete', id: number): void,
}

interface Props {
  variant: TConfigurableProductVariants,
  options: TConfigurableProductOptions[],
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { variant, options } = toRefs(props)

const isDisabled = ref(false)

const tableItems = computed(() => {
  const rows: TableRow[] = []

  variant.value.attributes.forEach(item => {
    const optionGroupCandidate = options.value.find(option => option.name === item.code)
    if (!optionGroupCandidate) {
      return
    }
    const optionItem = optionGroupCandidate.values.find(option => option.id === item.valueId)
    if (!optionItem) {
      return
    }

    rows.push({ id: item.id, name: item.code, value: optionItem.name })
  })
  return rows
})

const tableRows: TUiTableRow<TableRow>[] = [
  {
    label: 'Group',
    target: 'name',
  },
  {
    label: 'Option Name',
    target: 'value',
  },
  {
    label: 'Actions'
  }
]

const deleteOption = async (option: TConfigurableProductVariantAttribute) => {
  if (isDisabled.value) {
    return
  }

  isDisabled.value = true
  const data = await deleteConfigurableAttribute({
    id: option.id,
    type: EDeleteProductAttributeTypes.variant
  })

  if (!data?.successDelete) {
    isDisabled.value = false
    return
  }

  emit('variantDelete', option.id)
  isDisabled.value = false
}
</script>

<style lang="scss">
.app-product-variant-item-table {
  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
