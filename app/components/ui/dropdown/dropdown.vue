<template>
  <div class="ui-dropdown">
    <label :for="selectId" class="ui-dropdown__label">
      {{ label }}
    </label>

    <select
      :id="selectId"
      v-model="field.value.value"
      class="ui-dropdown__select"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="ui-dropdown__select-option"
      >
        {{ option.label }}
      </option>
    </select>

    <div v-if="field.errors.value.length" class="ui-dropdown__errors">
      <p
        v-for="error in [field.errors.value[field.errors.value.length - 1]]"
        :key="error"
        class="ui-dropdown__error-item"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { useField } from 'vee-validate'

export type TDropdownOption = {
  label: string | number,
  value: string | number,
}

interface Props {
  path: string,
  label: string,
  options: TDropdownOption[]
}

const selectId = useId()
const props = defineProps<Props>()
const { path, options } = toRefs(props)

const field = useField<string | number>(path, undefined)
</script>

<style lang="scss">
.ui-dropdown {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 110rem;

  &__label {
    user-select: none;
    color: map-get($gray-color-palette, 'gray-2');
    font-size: 16rem;
    font-style: normal;
    font-weight: 400;
    line-height: 24rem;
    background: transparent;
    transition: all 400ms;
  }

  &__select {
    position: relative;
    width: 100%;
    padding: 16rem 14rem;
    height: 56rem;
    border: 1rem solid map-get($gray-color-palette, 'gray-3');
    font-size: 16rem;

    &-option {
      color: map-get($theme-colors, 'primary-color');
      font-size: 16rem;
    }
  }

  &__error-item {
    margin: 2rem 14rem 0;
    color: map-get($theme-colors, 'error-color');
    font-size: 14rem;
    font-weight: 400;
    line-height: 22rem;
    letter-spacing: 0.28rem;
  }
}
</style>