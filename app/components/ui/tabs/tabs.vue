<template>
  <div class="ui-tabs">
    <ul class="ui-tabs__header">
      <ui-button
        v-for="tabTitle in tabTitles"
        :key="tabTitle"
        variant="outlined"
        :label="tabTitle"
        :active="selectedTitle === tabTitle"
        class="ui-tabs__header-item"
        @click="selectedTitle = tabTitle"
      >
        {{ tabTitle }}
      </ui-button>

      <slot name="header-append" />
    </ul>

    <div class="ui-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Node Deps
import { useSlots, provide } from 'vue'

const slots = useSlots()
const tabTitles = ref([])


slots.default().map(tabWrapper => {
  tabWrapper.children.map(item => {
    if (!item.props.title) {
      return
    }

    tabTitles.value.push(item.props.title)
  })
})
const selectedTitle = ref(tabTitles.value[0].title)

provide('selectedTitle', tabTitles.value.length && selectedTitle ? selectedTitle : '')
</script>

<style lang="scss">
.ui-tabs {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rem;

    &-item {
      border-radius: 8rem;
      padding: 8rem 12rem;
    }
  }

  &__content {
    margin-top: 16rem;
  }
}
</style>
