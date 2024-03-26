<template>
  <div class="app-wishlist-item__interactions">
    <ui-button
      variant="outlined"
      prepend-icon="user/heart"
      :loading="operationWithWishlistIsProcessing"
      @click.prevent.stop="emit('productRemovedFromWishlist')"
    />
    <ui-button
      variant="outlined"
      prepend-icon="user/cart"
      :loading="operationWithCartIsProcessing"
      @click.prevent.stop="emit('productAddedToCart')"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  operationWithWishlistIsProcessing: boolean,
  operationWithCartIsProcessing: boolean,
}

interface Emits {
  (name: 'productRemovedFromWishlist'): void,
  (name: 'productAddedToCart'): void,
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<style lang="scss">
.app-wishlist-item__interactions {
  display: flex;
  align-items: center;
  color: map-get($theme-colors, 'primary-color');

  .ui-button {
    border: transparent;
  }

  @media #{map-get($display-rules, 'md')} {
    justify-content: flex-end;
  }
}
</style>
