<template>
  <div class="app-product-variant-item-header">
    <h5 class="app-product-variant-item-header__title">
      {{ sku }}
    </h5>

    <ui-button
      variant="outlined"
      prepend-icon="common/plus"
      class="app-product-variant-item-header__action"
      @click="emit('addOption')"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  sku: string,
}

interface Emits {
  (name: 'addOption'): void
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { sku } = toRefs(props)
</script>

<style lang="scss">
.app-product-variant-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
