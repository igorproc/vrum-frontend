<template>
  <ui-table
    has-append-column
    title="Бренды"
    :items="brands"
    :rows="tableRows"
    class="app-brands-table"
  >
    <template #item="{ key, value }">
      <div class="app-brands-table__item">
        <ui-image
          v-if="key === 'image'"
          :alt="value.name"
          :src="value.image"
          class="app-brands-table__item-image"
        />

        <span v-else class="app-brands-table__item-text">
          {{ value[key] }}
        </span>
      </div>
    </template>

    <template #item-append="{ item }">
      <div class="app-brands-table__item-actions">
        <ui-button
          :disabled="isDisabled"
          prepend-icon="common/close"
          variant="text"
          class="app-brands-table__item-actions-remove"
          @click="onDelete(item.id)"
        />
      </div>
    </template>
  </ui-table>
</template>

<script setup lang="ts">
// Api Methods
import { deleteBrand } from '~/api/brand/delete'
// Types & Interfaces
import type { TBrand } from '~/api/brand/getBrandList'
import type { TUiTableRow } from '~/components/ui/table/table.vue'

interface Props {
  brands: TBrand[]
}

interface Emits {
  (name: 'successDelete'): void
}

const tableRows: TUiTableRow<TBrand>[] = [
  {
    label: 'ID',
    target: 'id',
  },
  {
    label: 'имя',
    target: 'name',
  },
  {
    label: 'изображение',
    target: 'image',
  },
]

defineProps<Props>()
const emit = defineEmits<Emits>()
const isDisabled = ref(false)

const onDelete = async (id: number) => {
  if (isDisabled.value) {
    return
  }

  isDisabled.value = true
  const data = await deleteBrand(id)
  isDisabled.value = false

  if (!data?.brandIsDeleted) {
    return
  }

  emit('successDelete')
}
</script>

<style lang="scss">
.app-brands-table {
  &__item {
    height: 80rem;

    &-image .ui-lazy-image {
      object-fit: contain;
    }

    &-actions {
      display: flex;
      align-items: center;
      justify-content: space-around;

      &-remove .ui-icon {
        font-size: 24rem !important;
      }
    }
  }
}
</style>
