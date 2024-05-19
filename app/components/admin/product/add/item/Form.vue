<template>
  <form class="app-add-product-form" @submit.prevent="submit">
    <div class="app-add-product-form__fields-container">
      <ui-input
        path="name"
        label="name"
        class="app-add-product-form__field"
      />
      <ui-input
        path="description"
        label="description"
        class="app-add-product-form__field"
      />
      <ui-input
        path="price"
        label="price"
        class="app-add-product-form__field"
      />
      <ui-dropdown
        path="typename"
        :options="productTypes"
        label="type"
        class="app-add-product-form__field"
      />
      <ui-input
        type="number"
        path="brandId"
        label="Brand Id"
        class="app-add-product-form__field"
      />
      <ui-dropzone ref="dropzone" :typename="EUploadTypes.product" @image-upload="uploadImage" />
    </div>

    <div class="app-add-product-form__actions">
      <ui-button
        type="submit"
        label="Create"
        variant="outlined"
        class="app-add-product-form__actions-create"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
// Node Deps
import { useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import { createProduct } from '~/api/product/addProduct'
// Types & Interfaces
import { EAddProductTypes } from '~/api/product/shared.types'
import type { TUploadImage } from '~/api/upload/uploadImage'
import { EUploadTypes } from '~/api/upload/uploadImage'
import type { TUiDropzoneExposes } from '~/components/ui/dropzone/dropzone.vue'

interface Form {
  name: string,
  description: string,
  typename: keyof typeof EAddProductTypes,
  price: number,
  brandId: number,
  productImage: string,
}

interface Emits {
  (name: 'product-added'): void
}

const productTypes = [
  {
    value: 'base',
    label: 'Base',
  },
  {
    value: 'configurable',
    label: 'Configurable',
  },
]

const emit = defineEmits<Emits>()
const validationSchema = object({
  name: string().required().min(3),
  description: string().required(),
  typename: string().required(),
  price: number().required(),
  brandId: number().required(),
  productImage: string().required(),
})

const isDisabled = ref(false)
const dropzone = ref<TUiDropzoneExposes | null>(null)
const form = useForm<Form>({ validationSchema })

const uploadImage = (data: TUploadImage) => {
  form.setFieldValue('productImage', data.path)
}

const submit = form.handleSubmit(async values => {
  if (isDisabled.value) {
    return
  }

  isDisabled.value = true
  const data = await createProduct(values)
  if (!data) {
    form.resetForm()
    dropzone.value?.clearFiles()
    isDisabled.value = false
    return
  }

  emit('product-added')
  form.resetForm()
  isDisabled.value = false
})
</script>

<style lang="scss">
.app-add-product-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rem;

  &__fields-container {
    width: 100%;
  }
}
</style>
