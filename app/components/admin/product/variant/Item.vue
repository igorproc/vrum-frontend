<template>
  <div class="app-product-variant-item">
    <AppAdminProductVariantItemHeader
      :sku="variant.product.sku"
      @add-option="optionAdd(variant.product.id)"
    />

    <div class="app-product-variant-item__wrapper">
      <AppAdminProductVariantItemTable
        :options="options"
        :variant="variant"
        class="app-product-variant-item__table"
        @variant-delete="optionDeleted"
      />

      <AppAdminProductVariantItemInfo
        :variant="variant"
        class="app-product-variant-item__info"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TConfigurableProductOptions, TConfigurableProductVariants } from '~/api/product/configurable/shred.types'

interface Emits {
  (name: 'variantDelete', data: { id: number, optionId: number }): void,
  (name: 'variantOptionAdd', id: number): void,
}

interface Props {
  variant: TConfigurableProductVariants,
  options: TConfigurableProductOptions[],
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { variant, options } = toRefs(props)

const optionDeleted = (id: number) => {
  emit('variantDelete', { id: variant.value.product.id, optionId: id })
}

const optionAdd = (id: number) => {
  emit('variantOptionAdd', id)
}
</script>

<style lang="scss">
.app-product-variant-item {
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 16rem;
    margin-top: 16rem;
  }

  &__table {
    max-width: 60%;
  }
}
</style>
