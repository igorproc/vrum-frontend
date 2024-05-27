<template>
  <form class="app-add-brand-form" @submit.prevent="submit">
    <div class="app-add-brand-form__fields-container">
      <ui-input
        label="имя"
        path="name"
        class="app-add-brand-form__field"
      />

      <ui-dropzone
        :typename="EUploadTypes.brand"
        @image-upload="uploadImage"
      />
    </div>

    <div class="app-add-brand-form__actions">
      <ui-button
        type="submit"
        label="Добавить"
        variant="outlined"
        class="app-add-brand-form__actions-create"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
// Node Deps
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
// Api Methods
import { createBrand } from '~/api/brand/create'
// Types & Interfaces
import type { TUploadImage } from '~/api/upload/uploadImage'
import { EUploadTypes } from '~/api/upload/uploadImage'

interface Form {
  name: string,
  imageUrl: string,
}

interface Emits {
  (name: 'successAdded'): void
}

const emit = defineEmits<Emits>()
const isDisabled = ref(false)

const validationSchema = object({
  name: string().required().min(3),
  imageUrl: string().required(),
})

const form = useForm<Form>({
  validationSchema,
})

const uploadImage = (data: TUploadImage) => {
  form.setFieldValue('imageUrl', data.path)
}

const submit = form.handleSubmit(async values => {
  isDisabled.value = true
  const brand = await createBrand(values)
  form.resetForm()
  isDisabled.value = false

  if (!brand?.data) {
    return
  }

  emit('successAdded')
})
</script>

<style lang="scss">
.app-add-brand-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rem;

  &__fields-container {
    width: 100%;
  }

  &__actions {
    margin-top: 16rem;
  }

  @media #{map-get($display-rules, 'md')} {
    &__actions {
      margin-top: 32rem;
    }
  }
}
</style>
