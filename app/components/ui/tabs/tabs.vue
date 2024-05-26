<template>
  <div class="ui-tabs">
    <ul class="ui-tabs__header">
      <div
        v-for="tabTitle in tabTitles"
        :key="generateRandomId()"
        class="ui-tabs__header-item"
      >
        <ui-button
          variant="outlined"
          :label="tabTitle"
          :active="selectedTitle === tabTitle"
          class="ui-tabs__header-tab"
          @click="selectedTitle = tabTitle"
        >
          {{ tabTitle }}
        </ui-button>

        <slot name="header-tab-append" :title="tabTitle" />
      </div>

      <slot name="header-append" />
    </ul>

    <div class="ui-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { provide, useSlots } from 'vue'

interface Props {
  titles?: string[]
}

const props = defineProps<Props>()
const { titles } = toRefs(props)

const slots = useSlots()
const selectedTitle = ref('')

const getTitlesFromSlots = () => {
  if (!slots?.default) {
    return
  }

  const titles: string[] = []
  slots.default().forEach(tabWrapper => {
    if (!tabWrapper.children || !Array.isArray(tabWrapper.children)) {
      return
    }

    tabWrapper.children.map(item => {
      if (typeof item !== 'object' || !item?.props?.title) {
        return
      }

      titles.push(item.props.title)
    })
  })
  return titles
}

const tabTitles = computed(() => {
  if (titles.value) {
    return titles.value
  }

  return getTitlesFromSlots()
})

if (Array.isArray(tabTitles.value)) {
  selectedTitle.value = tabTitles.value[0]
}

provide('selectedTitle', selectedTitle)
</script>

<style lang="scss">
.ui-tabs {
  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16rem;

    &-item {
      position: relative;
    }

    &-tab {
      border-radius: 8rem !important;
      padding: 8rem 12rem !important;
    }
  }

  &__content {
    margin-top: 16rem;
  }
}
</style>
