<template>
  <button
    :disabled="isDisabled"
    :style="{ '--select-color': buttonColor }"
    :class="{ '--is-active': isActive, '--is-color': buttonColor }"
    class="app-product-default-switch app-default-switch"
    @click="selectOption"
  >
    <span v-if="!buttonColor" class="app-default-switch__label">
      {{ optionData.name }}
    </span>
  </button>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TConfigurableProductOptions } from '~/api/product/configurable/shred.types'
interface Props {
  optionLabel: TConfigurableProductOptions['name'],
  optionData: TConfigurableProductOptions['values'][0],
  isActive: boolean,
  isDisabled?: boolean,
}

interface Emits {
  (name: 'optionSelected', optionData: Props['optionData']): void,
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { isDisabled, optionLabel, optionData } = toRefs(props)

const buttonColor = computed(() => {
  if (optionLabel.value.toLowerCase() === 'color') {
    return optionData.value.value
  }
})

const selectOption = () => {
  if (isDisabled.value) {
    return
  }

  emits('optionSelected', optionData.value)
}
</script>

<style lang="scss">
.app-product-default-switch {
  transition-property: background-color, color;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  padding: 10rem;

  .app-default-switch__label {
    color: map-get($theme-colors, 'primary-color');
  }

  &[disabled] {
    backdrop-filter: brightness(0.8);
    opacity: 0.6;
  }

  &.--is-active {
    background-color: map-get($gray-color-palette, 'gray-3');
    color: map-get($theme-colors, 'primary-color');

    .app-default-switch__label {
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
