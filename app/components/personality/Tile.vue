<template>
  <div class="app-personality-tile">
    <component
      :is="rootTag"
      v-bind="linkParams"
      class="app-personality-tile__wrapper"
    >
      <ui-image
        :alt="personality.name"
        :src="personality.image"
        class="app-personality-tile__image"
      />

      <span class="app-personality-tile__title">
      {{ personality.name }}
    </span>
    </component>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TBrand } from '~/api/brand/getBrandList'

interface Props {
  personality: TBrand,
  isLink?: boolean
}

const props = withDefaults(
  defineProps<Props>(),
  {
    isLink: false
  }
)
const { personality, isLink } = toRefs(props)

const rootTag = computed(() => {
  if (isLink.value) {
    return defineAsyncComponent(() => import('#app/components/nuxt-link'))
  }
  return 'div'
})

const linkParams = computed(() => {
  if (isLink.value) {
    return {
      to: { name: 'products', query: { brand: personality.value.id } }
    }
  }
  return {}
})
</script>

<style lang="scss">
.app-personality-tile {
  padding: 15rem 20rem;

  &__wrapper {
    text-decoration: unset;
    color: map-get($theme-colors, 'primary-color');
  }

  &__image {
    user-select: none;
    width: 180rem;
    height: 80rem;
    margin-bottom: 12rem;

    .ui-lazy-image {
      object-fit: contain;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 16rem;
  }
}
</style>
