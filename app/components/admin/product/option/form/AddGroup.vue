<template>
  <div class="app-product-options-add-group">
    <ui-input
      path="name"
      label="name"
      class="app-product-options-add-group__input"
      @keyup.enter="submit"
    />
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { object, string } from 'yup'
// Api Methods
import { createOptionGroup } from '~/api/product/configurable/createOptionGroup'
// Types & Interfaces
import type { TConfigurableProductOptions } from '~/api/product/configurable/shred.types'

interface Props {
  productId: number
}

interface Emits {
  (name: 'groupAdded', group: TConfigurableProductOptions): void
}

interface Form {
  name: string
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { productId } = toRefs(props)

const validationSchema = object({
  name: string().required()
})

const form = useForm<Form>({ validationSchema })

const isLoading = ref(false)

const submit = form.handleSubmit(async values => {
  if (isLoading.value) {
    return
  }
  isLoading.value = true

  const data = await createOptionGroup({ productId: productId.value, label: values.name })
  if (!data) {
    isLoading.value = false
    form.resetForm()
    return
  }

  isLoading.value = false
  emit('groupAdded', data.group)
})
</script>

<style lang="scss">
.app-product-options-add-group {
  &__input {
    min-height: auto;
    width: 160rem;

    .ui-input__errors {
      display: none;
    }
  }
}
</style>
