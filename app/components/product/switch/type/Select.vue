<template>
  <button
    :disabled="isDisabled"
    :style="{ '--select-color': buttonColor }"
    :class="{ '--is-active': isActive, '--is-color': buttonColor }"
    class="app-product-default-switch"
    @click="selectOption"
  >
    <span v-if="!buttonColor" class="app-product-default-switch__label">
      {{ attribute.data.name }}
    </span>
  </button>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TConfigurableProductOptions } from '~/api/product/configurable/shred.types'

export type TSelectProps = {
  label: TConfigurableProductOptions['name'],
  data: TConfigurableProductOptions['values'][0],
}

interface Props {
  attribute: TSelectProps,
  isActive: boolean,
  isDisabled?: boolean,
}

interface Emits {
  (name: 'optionSelected', optionData: Props['attribute']['data']): void,
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { isDisabled, attribute } = toRefs(props)

const buttonColor = computed(() => {
  if (attribute.value.label.toLowerCase() === 'color') {
    return attribute.value.data.value
  }
})

const selectOption = () => {
  if (isDisabled.value) {
    return
  }

  emits('optionSelected', attribute.value.data)
}
</script>

<style lang="scss">
.app-product-default-switch {
  transition-property: background-color, color;
  transition-duration: 100ms;
  transition-timing-function: ease-in;

  padding: 10rem;
  border: 1rem solid map-get($gray-color-palette, 'gray-3');

  &__label {
    color: map-get($theme-colors, 'primary-color');
  }

  &[disabled] {
    backdrop-filter: brightness(0.8);
    opacity: 0.6;
  }

  &.--is-active {
    background-color: map-get($gray-color-palette, 'gray-3');

    .app-product-default-switch__label {
      color: map-get($white-color-palette, 'white');
    }
  }

  &.--is-color {
    padding: 0;
    width: 40rem;
    height: 40rem;
    background-color: var(--select-color);

    &.--is-active {
      border: 3rem solid map-get($gray-color-palette, 'gray-3');
    }
  }
}
</style>
