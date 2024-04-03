<template>
  <div class="app-cart-item-preview">
    <ui-image :alt="name" :src="imageUrl" class="app-cart-item-preview__image" />
    <h5 class="app-cart-item-preview__name">{{ name }}</h5>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string,
  imageUrl: string,
}

const props = defineProps<Props>()
const { name, imageUrl } = toRefs(props)
</script>

<style lang="scss">
.app-cart-item-preview {
  display: flex;
  align-items: center;
  gap: 16rem;

  &__image {
    width: 120rem;
    height: 120rem;

    .ui-lazy-image {
      border-radius: 8rem;
    }
  }

  &__name {
    width: 60%;
    font-weight: bold;
  }
}
</style>
