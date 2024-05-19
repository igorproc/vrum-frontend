<template>
  <div class="app-admin-orders-change-status">
    <ui-dropdown
      path="status"
      :disabled="isLoading"
      :options="allowedOptions"
      class="app-admin-orders-change-status__dropdown"
      @change="changeStatusHandler"
    />
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { object, string } from 'yup'
// Api Methods
import { changeCheckoutStatus } from '~/api/checkout/changeStatus'
// Types & Interfaces
import { EOrderStatusSet } from '~/api/checkout/getPage'
import type { TUiDropdownOption } from '~/components/ui/dropdown/dropdown.vue'
import { useForm } from 'vee-validate'

interface Props {
  id: number,
  selectedStatus: EOrderStatusSet,
}

interface Form {
  status: keyof typeof EOrderStatusSet,
}

const props = defineProps<Props>()
const { id, selectedStatus } = toRefs(props)

const selectedStatusKey = () => {
  for (const [label, value] of Object.entries(EOrderStatusSet)) {
    if (value === selectedStatus.value) {
      return label as keyof typeof EOrderStatusSet
    }
  }
}

const validationSchema = object({
  status: string().required(),
})
const form = useForm<Form>({ validationSchema })
form.setFieldValue('status', selectedStatusKey() || 'pending')

const isLoading = ref(false)

const allowedOptions = computed(() => {
  const allowedOptionsList: TUiDropdownOption[] = []

  for (const [label, _] of Object.entries(EOrderStatusSet)) {
    allowedOptionsList.push({
      value: label,
      label: label,
    })
  }

  return allowedOptionsList
})

const changeStatusHandler = async () => {
  isLoading.value = true
  await changeCheckoutStatus({
    id: id.value,
    status: form.values.status,
  })
  isLoading.value = false
}
</script>

<style lang="scss">
.app-admin-orders-change-status {
  &__dropdown {
    justify-content: center !important;
  }
}
</style>
