<template>
  <div class="app-product-variant-tabs">
    <ui-tabs :titles="tabsTitles">
      <template #header-append>
        <ui-button
          variant="outlined"
          prepend-icon="common/plus"
          label="add"
          class="app-product-variant-tabs__add-group-action"
          @click="openAddVariantModal"
        />
      </template>

      <ui-tab
        v-for="variant in variants"
        :key="variant.product.id"
        :title="variant.product.sku"
        class="app-product-variant-tabs__item"
      >
        <AppAdminProductVariantItem
          :variant="variant"
          :options="options"
          @variant-delete="variantOptionIsDeleted"
          @variant-option-add="openAddVariantOptionModal"
        />
      </ui-tab>
    </ui-tabs>

    <AppAdminProductVariantModalAdd
      :id="id"
      :open="addVariantModalIsOpen"
      @close="closeAddVariantModal"
      @variant-added="variantIsAdded"
    />
    <AppAdminProductVariantModalAddOption
      :variant-id="addVariantOptionGroup"
      :open="addVariantOptionModalIsOpen"
      :options="options"
      :variants="optionsGroupsBySelectedVariantGroup || []"
      @close="closeAddVariantOptionModal"
      @option-added="variantOptionIsAdded"
    />
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type {
  TConfigurableProductVariantAttribute,
  TConfigurableProductOptions,
  TConfigurableProductVariants
} from '~/api/product/configurable/shred.types'

interface Props {
  id: number,
  variants: TConfigurableProductVariants[],
  options: TConfigurableProductOptions[],
}

const props = defineProps<Props>()
const { options } = toRefs(props)
const variants = ref(props.variants)

const addVariantOptionGroup = ref(0)
const addVariantModalIsOpen = ref(false)
const addVariantOptionModalIsOpen = ref(false)

const tabsTitles = computed(() => variants.value.map(item => item.product.sku))

const optionsGroupsBySelectedVariantGroup = computed(() => {
  if (!addVariantOptionGroup.value || !addVariantOptionModalIsOpen.value) {
    return []
  }

  const variantCandidate = variants
    .value
    .find(item => item.product.id === addVariantOptionGroup.value)
  return variantCandidate?.attributes || []
})

const openAddVariantModal = () => {
  addVariantModalIsOpen.value = true
}

const closeAddVariantModal = () => {
  addVariantModalIsOpen.value = false
}

const openAddVariantOptionModal = (id: number) => {
  addVariantOptionGroup.value = id
  addVariantOptionModalIsOpen.value = true
}

const closeAddVariantOptionModal = () => {
  addVariantOptionGroup.value = 0
  addVariantOptionModalIsOpen.value = false
}

const variantIsAdded = (variant: TConfigurableProductVariants) => {
  variants.value.push(variant)
  closeAddVariantModal()
}

const variantOptionIsDeleted = (data: { id: number, optionId: number }) => {
  const variantCandidate = variants.value.find(variant => variant.product.id === data.id)
  if (!variantCandidate) {
    return
  }

  variantCandidate.attributes = variantCandidate.attributes.filter(attribute => attribute.id !== data.optionId)
}

const variantOptionIsAdded = (data: TConfigurableProductVariantAttribute & { groupId: number }) => {
  closeAddVariantOptionModal()
  const variantCandidate = variants.value.find(variant => variant.product.id === data.groupId)
  if (!variantCandidate) {
    return
  }

  variantCandidate.attributes.push({
    id: data.id,
    valueId: data.valueId,
    code: data.code,
  })
}
</script>

<style lang="scss">
.app-product-variant-tabs {
  &__add-group-action {
    border-radius: 8rem;
    padding: 8rem 12rem;
  }
}
</style>
