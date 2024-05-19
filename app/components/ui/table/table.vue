<template>
  <table class="ui-table">
    <caption v-if="title" class="ui-table__title">
      {{ title }}
    </caption>

    <thead class="ui-table__head">
      <tr class="ui-table__head-row">
        <th
          v-for="row in rows"
          :key="generateRandomId()"
          class="ui-table__head-row-title"
        >
          {{ row.label }}
        </th>
      </tr>
    </thead>

    <tbody class="ui-table__body">
      <tr
        v-for="item in items"
        :key="generateRandomId()"
        class="ui-table__body-row"
      >
        <td
          v-for="row in rowsOnlyWithTarget"
          :key="generateRandomId()"
          :data-label="row.target"
          class="ui-table__body-row-item"
        >
          <slot
            :key="row.target"
            :value="item"
            name="item"
          >
            {{ getValueByKey(item, row.target) }}
          </slot>
        </td>

        <td
          v-if="hasAppendColumn"
          data-label="append"
          class="ui-table__body-row-item"
        >
          <slot :item="item" name="item-append" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { generateRandomId } from '~/utils/generate.util'

export type TUiTableRow<T> = {
  label: string,
  target?: keyof T
}

interface Props {
  title?: string,
  items: any,
  hasAppendColumn?: boolean
  rows: TUiTableRow<Props['items']>[]
}

const props = defineProps<Props>()
const { title, items, rows } = toRefs(props)

const rowsOnlyWithTarget = computed(() => rows.value.filter(row => row?.target))

const getValueByKey = (item: Props['items'][0], key?: string | number | symbol) => {
  if (!key || !Object.keys(item).includes(key.toString())) {
    return
  }

  return item[key]
}
</script>

<style lang="scss">
.ui-table {
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

    &-title {
      padding: .625em;
      text-align: center;

      font-size: 12rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  &__body-row {
    background-color: map-get($gray-color-palette, 'gray-1');
    border: 1px solid map-get($gray-color-palette, 'gray-2');
    padding: .35em;

    &-item {
      padding: .625em;
      text-align: center;
    }
  }
}
</style>
