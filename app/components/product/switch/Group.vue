<template>
  <div class="app-configurable-product-switch-list product-switch-list">
    <div
      v-for="optionGroup in productOptions"
      :key="optionGroup.id"
      class="product-switch-list__group group-item"
    >
      <span class="group-item__title">
        {{ optionGroup.name }}
      </span>

      <div class="group-item__options">
        <AppProductSwitchTypeResolver
          v-for="optionItem in optionGroup.values"
          :key="optionItem.id"
          typename="select"
          :attribute="{ label: optionGroup.name, data: optionItem }"
          :is-active="isActiveOption(optionItem.id)"
          :is-disabled="isDisabledOption(optionItem.id)"
          @option-selected="selectOption"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { difference } from 'lodash-es'
// Utils
import { arrayContains } from '~/utils/arrayContains.util'
// Types & Interfaces
import type {
  TConfigurableProductOptions,
  TConfigurableProductVariants,
} from '~/api/product/configurable/shred.types'
import type { TSwitchResolverEmit } from '~/components/product/switch/type/Resolver.vue'

interface Props {
  productOptions: TConfigurableProductOptions[],
  productVariants: TConfigurableProductVariants[],
}

interface Emits {
  (name: 'productVariantIsSelected', variantId: number | null): () => void,
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { productOptions, productVariants } = toRefs(props)

const selectedOptionIds = ref<number[]>([])

const allViableOptionsFromVariants = computed(() => {
  const idsList: Record<string, number[]> = {}

  productVariants.value.forEach(productVariant => {
    productVariant.attributes.forEach(variantItem => {
      const productOptionGroupCandidate = productOptions.value
        .find(optionItem => optionItem.name === variantItem.code)
      if (!productOptionGroupCandidate) {
        return
      }

      const productOptionCandidate = productOptionGroupCandidate
        .values.find(optionItem => optionItem.id === variantItem.valueId)
      if (!productOptionCandidate) {
        return
      }
      if (!idsList[productVariant.product.id]) {
        idsList[productVariant.product.id] = [productOptionCandidate.id]
        return
      }

      idsList[productVariant.product.id] = [
        ...Object.values(idsList[productVariant.product.id]),
        productOptionCandidate.id,
      ]
    })
  })

  return idsList
})
const viableVariantsAndOptionsIdsListBySelected = computed(() => {
  if (
    !allViableOptionsFromVariants.value ||
    !Object.values(allViableOptionsFromVariants.value).length
  ) {
    return {
      variants: [],
      optionIds: [],
    }
  }

  const variantsList: string[] = []
  const idsList: number[] = []

  if (!selectedOptionIds.value.length) {
    for (const [key, value] of Object.entries(allViableOptionsFromVariants.value)) {
      variantsList.push(key)
      idsList.push(...value)
    }
    return {
      variants: [...new Set(variantsList)],
      optionIds: [...new Set(idsList)],
    }
  }

  for (const [key, value] of Object.entries(allViableOptionsFromVariants.value)) {
    if (arrayContains<number>(value, selectedOptionIds.value)) {
      variantsList.push(key)
      idsList.push(...value)
    }
  }

  if (
    variantsList.length === 1 && !difference(idsList, selectedOptionIds.value).length
  ) {
    emits('productVariantIsSelected', Number(variantsList[0]))
  } else {
    emits('productVariantIsSelected', null)
  }

  return {
    variants: [...new Set(variantsList)],
    optionIds: [...new Set(idsList)],
  }
})

const isActiveOption = (optionId: number) => {
  return selectedOptionIds.value.includes(optionId)
}
const isDisabledOption = (optionId: number) => {
  return !viableVariantsAndOptionsIdsListBySelected.value.optionIds
    .includes(optionId) && !selectedOptionIds.value.includes(optionId)
}
const selectOption = (option: TSwitchResolverEmit) => {
  if (!selectedOptionIds.value.includes(option.id)) {
    selectedOptionIds.value.push(option.id)
    return
  }
  selectedOptionIds.value = selectedOptionIds.value.filter(id => id !== option.id)
}
</script>

<style lang="scss">
.app-configurable-product-switch-list {
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 16rem;

  .product-switch-list__group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;

    .group-item__options {
      margin-top: 8rem;
      display: flex;
      align-items: center;
      gap: 16rem;
    }
  }

  @media #{map-get($display-rules, 'md')} {
    align-items: center;

    .product-switch-list__group {
      width: 100%;

      .group-item__options {
        flex-wrap: wrap;
        max-width: 70%;
      }
    }
  }
}
</style>
