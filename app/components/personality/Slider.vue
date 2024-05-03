<template>
  <div class="app-personality-slider">
    <h1 class="app-personality-slider__title">
      Partner Brands
    </h1>

    <div class="app-personality-slider__wrapper wrapper">
      <swiper
        hide-before-init
        :slides-per-view="10"
        class="wrapper__slider"
      >
        <swiper-slide v-for="personality in brands" :key="personality.id" class="wrapper__slider-slide">
          <AppPersonalityTile
            is-link
            :personality="personality"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
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

  &__title {
    font-family: $poppins-font-family;
  }

  &__wrapper {
    .wrapper__slider-slide {
      width: auto !important;
      min-width: 220rem !important;
    }
  }
}
</style>
