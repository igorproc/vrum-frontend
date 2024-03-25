<template>
  <div class="ui-backdrop" :class="{ '--is-visible': show }" />
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

const props = defineProps<Props>()
</script>

<style lang="scss">
.ui-backdrop {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;

  &.--is-visible {
    background-color: $backdrop-shadow;
    display: block;
  }
}
</style>
