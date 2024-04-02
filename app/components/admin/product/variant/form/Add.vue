<template>
  <form
    class="app-product-add-variant-form"
    @submit.prevent="submit"
  >
    <div class="app-product-add-variant-form__fields">
      <ui-input
        path="sku"
        label="sku"
        required
        class="app-product-add-variant-form__field"
      />
      <ui-input
        path="price"
        label="price"
        required
        class="app-product-add-variant-form__field"
      />
      <ui-dropzone
        ref="dropzone"
        :typename="EUploadTypes.product"
        class="app-product-add-variant-form__field"
        @image-upload="uploadImage"
      />
    </div>
    <div class="app-product-add-variant-form__actions">
      <ui-button
        :disabled="isLoading"
        type="submit"
        variant="outlined"
        label="add"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
// Node Deps
import { number, object, string } from 'yup'
// Api Methods
import { createVariant } from '~/api/product/configurable/CreateVariant'
// Types & Interfaces
import type { TConfigurableProductVariants } from '~/api/product/configurable/shred.types'
import type { TUploadImage } from '~/api/upload/uploadImage'
import { EUploadTypes } from '~/api/upload/uploadImage'

interface Form {
  sku: string,
  imageUrl: string,
  price: number
}

interface Props {
  id: number
}

interface Emits {
  (name: 'variantAdded', group: TConfigurableProductVariants): void
}

const dropzone = ref<HTMLElement>()

const validationSchema = object({
  sku: string().required(),
  imageUrl: string().required(),
  price: number().required()
})

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { id } = toRefs(props)
const form = useForm<Form>({ validationSchema })

const isLoading = ref(false)

const uploadImage = (data: TUploadImage) => {
  form.setFieldValue('imageUrl', data.path)
}

const submit = form.handleSubmit(async values => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  const data = await createVariant({ id: id.value, ...values })
  if (!data?.group) {
    form.resetForm()

    isLoading.value = false
    return
  }

  emit('variantAdded', data.group)
})
</script>

<style lang="scss">
.app-product-add-variant-form {
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
