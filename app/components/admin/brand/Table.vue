<template>
  <table class="app-brands-table">
    <caption
      class="app-brands-table__title"
    >
      Brands
    </caption>

    <thead class="app-brands-table__head">
      <tr class="app-brands-table__head-row head-row">
        <th
          v-for="item in tableRows"
          :key="item.id"
          class="head-row__title"
        >
          {{ item.label }}
        </th>
        <th class="head-row__title">
          Actions
        </th>
      </tr>
    </thead>

    <tbody class="app-brands-table__content">
      <tr
        v-for="brand in brands"
        :key="brand.id"
        class="app-brands-table__content-row content-row"
      >
        <td
          v-for="item in tableRows"
          :key="item.id"
          :data-label="item.target"
          class="content-row__item"
        >
          <span v-if="item.target !== 'image'" class="content-row__item-text">
            {{ brand[item.target] }}
          </span>

          <ui-image
            v-else
            :alt="brand.name"
            :src="brand.image"
            class="content-row__item-image"
          />
        </td>
        <td data-label="actions" class="content-row__item">
          <ui-button
            :disabled="isDisabled"
            prepend-icon="common/close"
            variant="text"
            class="content-row__item-remove-action"
            @click="onDelete(brand.id)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
// Utils
import { generateRandomId } from '~/utils/generate.util'
// Api Methods
import { deleteBrand } from '~/api/brand/delete'
// Types & Interfaces
import type { TBrand } from '~/api/brand/getBrandList'

interface Props {
  brands: TBrand[]
}

interface Emits {
  (name: 'successDelete'): void
}

type TTableRow = {
  id: string,
  label: string,
  target: keyof TBrand,
}

const tableRows: TTableRow[] = [
  {
    id: generateRandomId(),
    label: 'ID',
    target: 'id'
  },
  {
    id: generateRandomId(),
    label: 'Name',
    target: 'name',
  },
  {
    id: generateRandomId(),
    label: 'image',
    target: 'image'
  }
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
  border: 1rem solid map-get($theme-colors, 'secondary-color');
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  &__title {
    font-size: 24rem;
    font-weight: bold;
    margin-bottom: 16rem;
  }

  &__head-row {
    background-color: map-get($gray-color-palette, 'gray-1');
    border: 1px solid map-get($gray-color-palette, 'gray-2');
    padding: .35em;

    .head-row__title {
      padding: .625em;
      text-align: center;

      font-size: 12rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  &__content-row {
    background-color: map-get($gray-color-palette, 'gray-1');
    border: 1px solid map-get($gray-color-palette, 'gray-2');
    padding: .35em;

    .content-row__item {
      padding: .625em;
      text-align: center;

      &[data-label="actions"] {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      &-remove-action .ui-icon {
        font-size: 24rem !important;
      }

      &-image {
        height: 80rem;

        .ui-lazy-image {
          object-fit: contain;
        }
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    &__head-row .head-row__title {
       font-size: 16rem;
    }
  }
}
</style>
