<template>
  <component
    :is="currentComponent"
    :attribute="attribute"
    :is-active="isActive"
    :is-disabled="isDisabled"
    @option-selected="emit('optionSelected', attribute.data)"
  />
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TSelectProps } from '~/components/product/switch/type/Select.vue'

export type TSwitchResolverEmit = TSelectProps['data']

enum ESwitchTypes {
  'select' = 'select'
}

interface Props {
  typename: ESwitchTypes,
  attribute: TSelectProps,
  isActive: boolean,
  isDisabled: boolean,
}

interface Emits {
  (name: 'optionSelected', data: TSwitchResolverEmit): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { typename } = toRefs(props)

const currentComponent = computed(() => {
  if (typename.value === ESwitchTypes.select) {
    return defineAsyncComponent(() => import('./Select.vue'))
  }
  return '<div>'
})
</script>
