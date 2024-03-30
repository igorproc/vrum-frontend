<template>
  <div class="app-product-options-tabs">
    <ui-tabs>
      <template #header-append>
        <div class="app-product-options-tabs__add-group add-group">
          <ui-button
            v-if="!addOptionGroupInputIsShow"
            variant="outlined"
            prepend-icon="common/plus"
            label="add"
            class="app-product-options-tabs__add-group-action"
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
        class="app-product-options-tabs__item"
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
// Types & Interfaces
import type {
  TConfigurableProductOptions,
  TConfigurableProductOptionValue,
} from '~/api/product/configurable/shred.types'

interface Props {
  id: number,
  options: TConfigurableProductOptions[],
}

const conditionStore = useConditionStore()

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
    name: item.name
  })
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

watch(addOptionItemModalIsOpen, newVal => {
  if (newVal) {
    conditionStore.showBackdrop()
    return
  }

  conditionStore.hideBackdrop()
})
</script>

<style lang="scss">
.app-product-options-tabs {
  padding: 16rem 24rem;

  &__add-group {
    &-action {
      border-radius: 8rem;
      padding: 8rem 12rem;
    }
  }
}
</style>
