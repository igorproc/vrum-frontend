<template>
  <div class="ui-menu">
    <div class="ui-menu__activator">
      <slot name="activator" />
    </div>

    <div
      v-if="open"
      ref="menu"
      class="ui-menu__items"
      :style="{ bottom: `-${(menu?.offsetHeight || 0) + 5}rem` }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

interface Props {
  open: boolean,
}

interface Emits {
  (name: 'update:open', open: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const menu = ref<null | HTMLElement>(null)

useClientOnly(() => {
  onClickOutside(menu, () => {
    emit('update:open', false)
  })
})
</script>

<style lang="scss">
.ui-menu {
  position: relative;

  &__items {
    position: absolute;
    right: 0;
    background-color: map-get($theme-colors, 'secondary-color');
    padding: 6rem 8rem;
  }
}
</style>
