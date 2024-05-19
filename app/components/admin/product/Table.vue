<template>
  <ui-table
    has-append-column
    title="Products"
    :items="products"
    :rows="tableRows"
    class="app-products-table"
  >
    <template #item="{ key, value }">
      <div class="app-products-table__item">
        <span v-if="key === 'price'" class="app-products-table__item-text">
          {{ getFormattedPrice(Number(value.price)) }}
        </span>

        <ui-image
          v-else-if="key === 'productImage'"
          :alt="value.name"
          :src="value.productImage"
          class="app-products-table__item-image"
        />

        <span v-else class="app-products-table__item-text">
          {{ value[key] }}
        </span>
      </div>
    </template>

    <template #item-append="{ item }">
      <div class="app-products-table__item-actions">
        <ui-button
          prepend-icon="user/edit"
          variant="text"
          :link="`product/${item.id}`"
          class="app-products-table__item-actions-route"
        />

        <ui-button
          :disabled="isDisabled"
          prepend-icon="common/close"
          variant="text"
          class="app-products-table__item-actions-remove"
          @click="onDelete(item.id)"
        />
      </div>
    </template>
  </ui-table>
</template>

<script setup lang="ts">
// Api Methods
import { deleteProduct } from '~/api/product/deleteProduct'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import type { TUiTableRow } from '~/components/ui/table/table.vue'

interface Props {
  products: TProduct[]
}

interface Emits {
  (name: 'successDelete'): void
}

const tableRows: TUiTableRow<TProduct>[] = [
  {
    label: 'ID',
    target: 'id',
  },
  {
    label: 'Name',
    target: 'name',
  },
  {
    label: 'Type',
    target: '__typename',
  },
  {
    label: 'image',
    target: 'productImage',
  },
  {
    label: 'Price',
    'target': 'price',
  },
  {
    label: 'Actions',
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
  const data = await deleteProduct(id)
  isDisabled.value = false

  if (!data?.productIsDeleted) {
    return
  }

  emit('successDelete')
}

const getFormattedPrice = computed(() => {
  return (price: number) => formattedPrice(price)
})
</script>

<style lang="scss">
.app-products-table {
  &__item {
    &-image {
      height: 160rem;

      .ui-lazy-image {
        object-fit: contain;
      }
    }

    &-actions {
      display: flex;
      align-items: center;
      justify-content: space-around;

      &-remove .ui-icon {
        font-size: 24rem !important;
      }

      &-route {
        color: map-get($theme-colors, 'primary-color');
        text-decoration: unset;
      }
    }
  }
}
</style>
