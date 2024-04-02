<template>
  <form class="app-product-add-variant-option-form" @submit.prevent="submit">
    <div class="app-product-add-variant-option-form__container-fields">
      <ui-dropdown
        :options="optionGroups"
        label="group"
        path="optionGroupId"
        class="app-product-add-variant-option-form__field"
      />
      <ui-dropdown
        :options="availableOptionsBySelectedGroup"
        label="option"
        path="optionId"
        class="app-product-add-variant-option-form__field"
      />
    </div>
    <div class="app-product-add-variant-option-form__actions">
      <ui-button
        type="submit"
        :disabled="isLoading"
        variant="outlined"
        label="add"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
// Types & Interfaces
import type {
  TConfigurableProductOptions,
  TConfigurableProductVariantAttribute
} from '~/api/product/configurable/shred.types'
import type { TDropdownOption } from '~/components/ui/dropdown/dropdown.vue'
import { number, object } from 'yup'
import { createVariantItem } from '~/api/product/configurable/createVariantItem'

interface Form {
  optionGroupId: number,
  optionId: number,
}

interface Props {
  id: number,
  variants: TConfigurableProductVariantAttribute[],
  options: TConfigurableProductOptions[],
}

interface Emits {
  (name: 'optionAdded', data: TConfigurableProductVariantAttribute): void
}

const validationSchema = object({
  optionGroupId: number().required(),
  optionId: number().required(),
})

const form = useForm<Form>({ validationSchema })

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { id, variants, options } = toRefs(props)
const isLoading = ref(false)

const optionGroups = computed(() => {
  const groups: TDropdownOption[] = []

  options.value.forEach(option => {
    groups.push({ label: option.name, value: option.id })
  })
  return groups
})

const availableOptionsBySelectedGroup = computed(() => {
  if (!form.values.optionGroupId) {
    return []
  }
  let groups: TDropdownOption[] = []
  const optionGroupCandidate = options.value.find(option => option.id === form.values.optionGroupId)
  if (!optionGroupCandidate) {
    return groups
  }

  optionGroupCandidate.values.forEach(option => {
    groups.push({ label: option.name, value: option.id })
  })
  groups = groups.filter(group => !variants.value.find(variant => variant.valueId === group.value))

  return groups
})

const submit = form.handleSubmit(async values => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  const data = await createVariantItem({ variantGroupId: id.value, ...values })
  if (!data?.item) {
    form.resetForm()
    isLoading.value = false
    return
  }

  isLoading.value = false
  emit('optionAdded', data.item)
})
</script>

<style lang="scss">
.app-product-add-variant-option-form {
  &__fields-container {
    width: 100%;
  }

  &__actions {
    margin-top: 16rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
