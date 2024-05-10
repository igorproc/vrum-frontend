<template>
  <img
    :src="src"
    :alt="alt"
    class="ui-lazy-image"
    @load="emit('loaded')"
  >
</template>

<script setup lang="ts">
interface Props {
  src: string,
  alt: string,
}

interface Emits {
  (name: 'loaded'): void
  (name: 'error'): void
}

const emit = defineEmits<Emits>()
defineProps<Props>()
</script>

<style lang="scss">
.ui-lazy-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

