<template>
  <ui-table
    :items="orders"
    :rows="tableRows"
    title="orders"
    class="app-admin-orders-table"
  >
    <template #item="{ key, value }">
      <div
        v-if="key === tableRows[1].label"
        class="app-admin-orders-table__status"
      >
        <AppAdminOrderChangeStatus :id="value.id" :selected-status="value.status" />
      </div>

      <div
        v-else-if="key === 'times'"
        class="app-admin-orders-table__info"
      >
        <span>{{ formattedTime(value.times.createdAt) }} </span>
      </div>

      <div v-else class="app-admin-orders-table__info">
        <span>{{ value[key] }}</span>
      </div>
    </template>
  </ui-table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { TOrder } from '~/api/checkout/getPage'
import type { TUiTableRow } from '~/components/ui/table/table.vue'

interface Props {
  orders: TOrder[]
}

const tableRows: TUiTableRow<TOrder>[] = [
  {
    label: 'ID',
    target: 'token',
  },
  {
    label: 'status',
    target: 'status',
  },
  {
    label: 'payment',
    target: 'payment',
  },
  {
    label: 'ordered at',
    target: 'times',
  },
]

const props = defineProps<Props>()
const { orders } = toRefs(props)

const formattedTime = computed(() => {
  return (time: string) => dayjs(time).format('MMM D YYYY h:mm A')
})
</script>
