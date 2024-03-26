<template>
  <component
    :is="link ? nuxtLinkComponent : 'button'"
    v-bind="buttonState"
    class="ui-button"
  >
    <div class="ui-button__prepend button-prepend">
      <ui-icon v-if="prependIcon" :name="prependIcon" />
      <slot name="prepend" />
    </div>

    <div v-if="label" class="ui-button__content button-content">
      <span class="button-content__label">
        {{ label }}
      </span>
    </div>
  </component>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TUiIconNames } from '#build/types/ui-icon'
import type { NuxtLinkProps } from '#app/components/nuxt-link'

type ButtonType = 'text' | 'outlined'

interface Props {
  label?: string,
  variant?: ButtonType,
  disabled?: boolean
  link?: NuxtLinkProps['to'],
  backgroundColor?: string,
  prependIcon?: TUiIconNames,
}

interface IButtonState {
  to?: NuxtLinkProps['to'],
  disabled?: boolean,
  style?: Record<string, unknown>,
  class?: string,
}

const nuxtLinkComponent = defineAsyncComponent(() => import('#app/components/nuxt-link'))
const props = withDefaults(
  defineProps<Props>(),
  {
    disabled: false,
  },
)

const { variant, link, backgroundColor, disabled } = toRefs(props)

const buttonState = computed(() => {
  const state: IButtonState = {
    class: '',
  }

  if (link.value) {
    state.to = link.value
  }

  if (backgroundColor.value) {
    state.style = { '--ui-button-background-color': backgroundColor }
    state.class += '--custom-background '
  }

  if (variant.value) {
    state.class += ` --is-${variant.value}`
  }

  state.disabled = disabled.value
  return state
})
</script>

<style lang="scss">
.ui-button {
  padding: 8rem 12rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: map-get($theme-colors, 'accent-color') 1rem solid;
  background-color: map-get($theme-colors, 'accent-color');
  text-decoration: unset;

  &__content {
    margin: 0 8rem;

    .button-content__label {
      color: map-get($theme-colors, 'primary-color');
      font-size: 16rem;
      font-weight: bold;
    }
  }

  &.--custom-background {
    background-color: var(--ui-button-background-color);
    border: 1px solid var(--ui-button-background-color);
  }

  &.--is-outlined {
    background-color: transparent;
  }

  &.--is-text {
    background-color: transparent;
    border: unset;
  }

  @media #{map-get($display-rules, 'xl')} {
    padding: 12rem 32rem;
  }
}
</style>
