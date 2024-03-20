<template>
  <div class="app-personality-slider personality-slider">
    <h1 class="personality-slider__title">
      Partner Brands
    </h1>

    <div class="personality-slider__wrapper wrapper">
      <Flicking
        hide-before-init
        :options="{ align: 'prev', circular: true,  }"
        class="wrapper__slider"
      >
        <AppPersonalityTile
          v-for="personality in brands"
          :key="personality.id"
          is-link
          :personality="personality"
        />
      </Flicking>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import AppPersonalityTile from '~/components/personality/tile/AppPersonalityTile.vue'
// Types & Interfaces
import type { TBrand } from '~/api/brand/getBrandList'

interface Props {
  brands: TBrand[]
}

const props = defineProps<Props>()
const { brands } = toRefs(props)
</script>

<style lang="scss">
.app-personality-slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .personality-slider {
    &__wrapper {
      width: 100%;
    }
  }
}
</style>
