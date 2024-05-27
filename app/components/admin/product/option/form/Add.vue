<template>
  <form class="app-add-product-option-form" @submit.prevent="submit">
    <div class="app-add-product-option-form__fields-container">
      <ui-input
        tabindex="1"
        required
        path="name"
        label="имя"
        class="app-add-product-option-form__field"
      />
      <ui-input
        tabindex="2"
        required
        path="value"
        label="значение"
        class="app-add-product-option-form__field"
      />
    </div>

    <div class="app-add-product-option-form__actions">
      <ui-button
        tabindex="3"
        :disabled="isLoading"
        variant="outlined"
        label="добавить"
        class="app-add-product-option-form__actions-submit"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
// Node Deps
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
// Api Methods
import { createOptionItem } from '~/api/product/configurable/createOptionItem'
// Types & Interfaces
import type { TConfigurableProductOptionValue } from '~/api/product/configurable/shred.types'

interface Emits {
  (name: 'optionCreated', item: TConfigurableProductOptionValue): void
}

interface Props {
  groupId: number
}

interface Form {
  name: string,
  value: string
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { groupId } = toRefs(props)

const validationSchema = object({
  name: string().required(),
  value: string().required(),
})
const form = useForm<Form>({ validationSchema })

const isLoading = ref(false)
const submit = form.handleSubmit(async values => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  const option = await createOptionItem({ groupId: groupId.value, ...values })

  form.resetForm()
  isLoading.value = false
  if (!option?.item) {
    return
  }

  emit('optionCreated', option.item)
})
</script>

<style lang="scss">
.app-add-product-option-form {

  &__fields-container {
    width: 100%;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
