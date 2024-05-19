<template>
  <div class="app-admin-product-main-block">
    <div class="app-admin-product-main-block__image-container">
      <ui-image :src="product.productImage" :alt="product.name" />
    </div>

    <div class="app-admin-product-main-block__info block-info">
      <ui-button
        v-if="!isForm"
        prepend-icon="user/edit"
        variant="outlined"
        label="Edit"
        class="block-info__edit"
        @click="isForm = true"
      />

      <div class="block-info__item">
        <span v-if="!isForm" class="block-info__item-label">
          Name:
        </span>
        <span v-if="!isForm" class="block-info__item-value">
          {{ product.name }}
        </span>
        <ui-input
          v-else
          label="name"
          path="name"
          class="block-info__item-input"
        />
      </div>

      <div class="block-info__item">
        <span v-if="!isForm" class="block-info__item-label">
          Type:
        </span>
        <span v-if="!isForm" class="block-info__item-value">
          {{ product.__typename }}
        </span>
        <ui-dropdown
          v-else
          :options="productTypesDropdownItems"
          label="type"
          path="typename"
          class="block-info__item-input"
        />
      </div>

      <div class="block-info__item">
        <span v-if="!isForm" class="block-info__item-label">
          Price:
        </span>
        <span v-if="!isForm" class="block-info__item-value">
          {{ productPrice }}
        </span>
        <ui-input
          v-else
          label="price"
          path="price"
          class="block-info__item-input"
        />
      </div>

      <ui-button
        v-if="isForm"
        label="Confirm"
        variant="outlined"
        class="block-info__submit"
        @click="submit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { number, object, string } from 'yup'
// Api Methods
import { updateProduct } from '~/api/product/update'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import { EAddProductTypes } from '~/api/product/shared.types'

interface Form {
  typename: keyof typeof EAddProductTypes,
  name: string,
  description: string,
  price: number,
}

interface Props {
  product: TProduct
}

interface Emits {
  (name: 'productUpdate'): void
}

const validationSchema = object({
  typename: string().nullable().min(4),
  name: string().nullable().min(3),
  description: string().nullable().min(5),
  price: number().nullable().min(5),
})

const productTypesDropdownItems = [
  {
    label: EAddProductTypes.base,
    value: 'base',
  },
  {
    label: EAddProductTypes.configurable,
    value: 'configurable',
  },
]

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { product } = toRefs(props)
const isForm = ref(false)
const isLoading = ref(false)

const defaultType = computed(() => {
  const typeCandidate = productTypesDropdownItems.find(item => item.label === product.value.__typename)
  if (!typeCandidate) {
    return 'base'
  }
  return typeCandidate.value as keyof typeof EAddProductTypes
})

const form = useForm<Form>({
  validationSchema,
  initialValues: {
    typename: defaultType.value,
    name: product.value.name,
    description: product.value.description,
    price: product.value.price,
  },
})

const productPrice = computed(() => formattedPrice(product.value.price))

const setCurrentValues = () => {
  form.setFieldValue('typename', defaultType.value)
  form.setFieldValue('name', product.value.name)
  form.setFieldValue('description', product.value.description)
  form.setFieldValue('price', product.value.price)
}

const submit = form.handleSubmit(async values => {
  isLoading.value = true

  const data = await updateProduct({ id: product.value.id, ...values })
  if (!data) {
    isLoading.value = false
    return
  }

  emit('productUpdate')
  isLoading.value = false
  isForm.value = false
})

defineExpose({ setCurrentValues })
</script>

<style lang="scss">
.app-admin-product-main-block {
  display: grid;
  grid-template-columns: 1fr 3fr;

  &__image-container,
  &__info {
    padding: 16rem 24rem;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 8rem;
    border: 1rem solid map-get($theme-colors, 'primary-color');
    border-radius: 8rem;

    .block-info {
      &__item {
        width: 40%;
        display: flex;
        align-items: center;
        gap: 8rem;

        &-label, &-value {
          font-size: 20rem;
          font-weight: bold;
        }

        &-input {
          width: 100%;
        }
      }

      &__edit,
      &__submit {
        align-self: flex-end;
      }
    }
  }
}
</style>
