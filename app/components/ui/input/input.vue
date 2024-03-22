<template>
  <div
    class="ui-input"
    :class="stateClasses"
    @click="changeFocus(true)"
    @focus="changeFocus(true)"
    @blur="changeFocus(false)"
  >
    <div class="ui-input__area">
      <label v-if="label && !hideLabel" :for="fieldId" class="ui-input__label">
        {{ label }}
      </label>

      <div class="ui-input__field-area">
        <input
          :id="fieldId"
          :type="inputType"
          ref="inputElement"
          class="ui-input__field"
          :disabled="disabled"
          v-model="field.value.value"
          v-bind="$attrs"
          :class="{
            '--with-action': isPassword
          }"
          @input="field.setValue(field.value.value, false)"
          @change="field.handleChange($event, true)"
          @focus="changeFocus(true, $event)"
          @blur="changeFocus(false, $event)"
         />

        <ui-icon
          v-if="isPassword"
          :name="isPasswordShow ? 'auth/eye' : 'auth/eye-close'"
          :size="20"
          class="ui-input__append-icon"
          @click="togglePasswordShow"
        />
      </div>
    </div>

    <div v-if="field.errors.value.length" class="ui-input__errors">
      <p
        v-for="error in [field.errors.value[field.errors.value.length - 1]]"
        :key="error"
        class="ui-input__error-item"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'

interface Props {
  path: string
  type?: string
  label?: string
  required?: boolean
  hideLabel?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  hideLabel: false,
  required: false,
  disabled: false,
})

const {
  type,
  label,
  hideLabel,
  required,
  disabled,
  path,
} = toRefs(props)

const fieldId = useId()

const field = useField<string>(path, undefined)

const inputElement = ref<null | HTMLElement>(null)
const isFocus = ref(false)
const changeFocus = (value: boolean, evt: Event | null = null) => {
  isFocus.value = value
  if (value) {
    nextTick(() => {
      inputElement.value?.focus()
    })
  }
  if (evt && !value) {
    field.handleBlur(evt, true)
  }
}

const stateClasses = computed(() => {
  return {
    '--focused': isFocus.value,
    '--active': isFocus.value || !!field.value.value,
    '--disabled': disabled.value,
    '--required': required.value,
    '--with-errors': !!field.errors.value.length,
  }
})

const isPassword = computed(() => {
  return type.value === 'password'
})
const isPasswordShow = ref(false)
const togglePasswordShow = () => {
  isPasswordShow.value = !isPasswordShow.value
}

const inputType = computed(() => {
  if (isPassword.value) {
    return isPasswordShow.value ? 'text' : 'password'
  }
  return type.value
})
</script>

<style lang="scss">
.ui-input {
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 86rem;
  height: 100%;

  &__area {
    padding: 16rem 14rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 56rem;
    border: 1rem solid map-get($gray-color-palette, 'gray-3');
  }

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

  &__field-area {
    width: 100%;
    display: none;
    opacity: 0;
    transition: all 200ms;
    justify-content: space-between;
    align-items: center;
    gap: 0 8rem;
  }

  &__field {
    width: 100%;
    color: map-get($theme-colors, 'primary-color');
    font-size: 16rem;
    font-style: normal;
    font-weight: 400;
    line-height: 24rem;
    background: transparent;
    border: unset;
    outline: unset;
    box-shadow: unset;

    &.--with-action {
      width: calc(100% - 28rem);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px map-get($theme-colors, 'background-color') inset !important;
      -webkit-text-fill-color: map-get($theme-colors, 'primary-color') !important;
      -webkit-background-clip: text;
      -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
      -webkit-transition-delay: 9999s;
      caret-color: white;
      transition: background-color 5000s ease-in-out 0s;
    }

    &:-webkit-autofill::first-line {
      font-size: 16rem;
    }
  }

  &__append-icon {
    position: absolute;
    right: 14rem;
    top: 18rem;
    bottom: 18rem;
    font-size: 20rem;
    color: map-get($theme-colors, 'primary-color') !important;
  }

  &__error-item {
    margin: 2rem 14rem 0;
    color: map-get($theme-colors, 'error-color');
    font-size: 14rem;
    font-weight: 400;
    line-height: 22rem;
    letter-spacing: 0.28rem;
  }

  &.--focused,
  &.--active {
    .ui-input__label {
      font-size: 12rem;
      line-height: 16rem;
      letter-spacing: 0.24rem;
    }
    .ui-input__field-area {
      opacity: 1;
      display: flex;
    }
  }

  &.--disabled {
    cursor: default;

    .ui-input__label {
      color: map-get($gray-color-palette, 'gray-3');
    }
    .ui-input__field {
      cursor: default;
      color: map-get($gray-color-palette, 'gray-3');
    }
  }

  &.--with-errors {
    .ui-input__area {
      border: 1px solid map-get($theme-colors, 'error-color');
    }
    .ui-input__field {
      color: map-get($theme-colors, 'error-color');
    }
  }

  &.--required {
    .ui-input__label {
      position: relative;

      &::after {
        content: '*';
        padding-left: 6rem;
        display: inline-block;
        color: map-get($theme-colors, 'error-color');
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        transition: font-size 200ms;
      }
    }
  }

  &.--focused.--required,
  &.--active.--required {
    .ui-input__label {
      &::after {
        font-size: 12rem;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0.24rem;
      }
    }
  }
}
</style>
