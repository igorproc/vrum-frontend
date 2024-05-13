<template>
  <div class="ui-image">
    <Suspense>
      <template #default>
        <img
          ref="image"
          :src="src"
          :alt="alt"
          class="ui-image__image"
        >
      </template>

      <template #fallback>
        <ui-skeleton-image class="ui-image__skeleton" />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">

interface Props {
  src: string,
  alt?: string,
}

const props = defineProps<Props>()
const { src, alt } = toRefs(props)
</script>

<style lang="scss">
.ui-image {
  height: 100%;

  &__skeleton {
    display: none;
    height: 100%;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
