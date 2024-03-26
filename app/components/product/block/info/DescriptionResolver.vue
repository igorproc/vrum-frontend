<template>
  <section
    v-html="sanitizedDescription"
    class="app-product-main-block-description"
  />
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

interface Props {
  description: string
}

const props = defineProps<Props>()
const sanitizedDescription = computed(() => {
  if (import.meta.server) {
    return props.description
  }
  return DOMPurify.sanitize(props.description)
})
</script>

<style lang="scss">
.app-product-main-block-description {
  .wrapper {
    @include generate-spacing-classes('mt', 'margin-top', 1, 10);
    @include generate-spacing-classes('ml', 'margin-left', 1, 10);
  }
}
</style>
