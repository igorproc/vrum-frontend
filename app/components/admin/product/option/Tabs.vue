<template>
  <div class="app-product-option-tabs">
    <ui-tabs>
      <template #header-tab-append="{ title }">
        <ui-button
          variant="text"
          prepend-icon="common/close"
          class="app-product-option-tabs__tab-append"
          @click="onOptionGroupDelete(title)"
        />
      </template>

      <template #header-append>
        <div class="app-product-option-tabs__add-group">
          <ui-button
            v-if="!addOptionGroupInputIsShow"
            variant="outlined"
            prepend-icon="common/plus"
            label="add"
            class="app-product-option-tabs__add-group-action"
            @click="showAddOptionGroupInput"
          />

          <AppAdminProductOptionFormAddGroup
            v-else
            :product-id="id"
            @group-added="optionGroupAdded"
          />
        </div>
      </template>

      <ui-tab
        v-for="option in options"
        :key="option.id"
        :title="option.name"
        class="app-product-option-tabs__item"
      >
        <AppAdminProductOptionItem
          :option="option"
          @option-add="openAddOptionItemModal"
          @option-delete="optionItemDeleted"
        />
      </ui-tab>
    </ui-tabs>

    <AppAdminProductOptionModalAdd
      :open="addOptionItemModalIsOpen"
      :group-id="itemGroupId"
      @close="closeAddOptionItemModal"
      @option-added="optionItemAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { deleteConfigurableAttribute, EDeleteProductAttributeTypes } from '~/api/product/configurable/delete'
// Types & Interfaces
import type {
  TConfigurableProductOptions,
  TConfigurableProductOptionValue,
} from '~/api/product/configurable/shred.types'

interface Props {
  id: number,
  options: TConfigurableProductOptions[],
}

// const conditionStore = useConditionStore()

const props = defineProps<Props>()
const options = ref(props.options)

const addOptionItemModalIsOpen = ref(false)
const addOptionGroupInputIsShow = ref(false)

const itemGroupId = ref(0)

const showAddOptionGroupInput = () => {
  addOptionGroupInputIsShow.value = true
}

const hideAddOptionGroupInput = () => {
  addOptionGroupInputIsShow.value = false
}

const openAddOptionItemModal = (id: number) => {
  itemGroupId.value = id
  addOptionItemModalIsOpen.value = true
}

const closeAddOptionItemModal = () => {
  itemGroupId.value = 0
  addOptionItemModalIsOpen.value = false
}

const optionItemAdded = (item: TConfigurableProductOptionValue & { groupId: number }) => {
  closeAddOptionItemModal()
  const optionGroupCandidate = options.value.find(optionGroup => optionGroup.id === item.groupId)
  if (!optionGroupCandidate) {
    return
  }

  optionGroupCandidate.values.push({
    id: item.id,
    value: item.value,
    name: item.name,
  })
}

const onOptionGroupDelete = async (title: string) => {
  const groupCandidate = options.value.find(item => item.name === title)
  if (!groupCandidate) {
    return
  }

  const groupIsDeleted = await deleteConfigurableAttribute({
    type: EDeleteProductAttributeTypes.optionGroup,
    id: groupCandidate.id,
  })
  if (!groupIsDeleted?.successDelete) {
    return
  }

  options.value = options.value.filter(item => item.id !== groupCandidate.id)
}

const optionItemDeleted = (data: { groupId: number, id: number }) => {
  const groupCandidate = options.value.find(item => item.id === data.groupId)
  if (!groupCandidate) {
    return
  }

  groupCandidate.values = groupCandidate.values.filter(item => item.id !== data.id)
}

const optionGroupAdded = (data: TConfigurableProductOptions) => {
  hideAddOptionGroupInput()
  options.value.push(data)
}
</script>

<style lang="scss">
.app-product-option-tabs {
  &__tab-append {
    position: absolute;
    top: -15rem;
    right: -10rem;
    padding: unset !important;
  }

  &__add-group-action {
    border-radius: 8rem !important;
    padding: 8rem 12rem !important;
  }
}
</style>
