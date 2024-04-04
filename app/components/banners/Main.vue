<template>
  <swiper
    loop
    :slides-per-view="1"
    :modules="[SwiperAutoplay]"
    :autoplay="{ delay: 4000, disableOnInteraction: true }"
    class="app-main-offers-slider"
  >
    <swiper-slide v-for="slide in items" :key="slide.id">
      <AppBannersMainSlide
        :title="slide.title"
        :description="slide.description"
        :image="slide.image"
        :link="slide.link"
        :action-title="slide.actionTitle"
        class="app-main-offers-slider__item"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { NuxtLinkProps } from '#app/components/nuxt-link'

type TOfferItem = {
  id: number,
  title: string,
  description: string,
  image: string,
  link: NuxtLinkProps['to'],
  actionTitle: string,
}

const items: TOfferItem[] = [
  {
    id: 1,
    title: 'Original winter wheel assembly',
    description: 'safe on the road in the cold season. Buy winter wheel assemblies at favourable prices right now.',
    image: 'offers/slider-1.jpg',
    actionTitle: 'buy now',
    link: { name: 'products', query: { page: 1, size: 12, brand: 1 } },
  },
  {
    id: 2,
    title: 'Original autumn wheel',
    description: 'drive on wet roads with complete confidence. Buy autumn wheel assemblies at favourable prices right now.',
    image: 'offers/slider-2.jpg',
    actionTitle: 'buy now',
    link: { name: 'products', query: { page: 1, size: 12, brand: 3 } },
  },
]
</script>

<style lang="scss">
.app-main-offers-slider {
  .offers-slider__item {
    width: 100%;
    height: 400rem;

    @media #{map-get($display-rules, 'md')} {
      height: 450rem;
    }


    @media #{map-get($display-rules, 'xl')} {
      height: 717rem;
    }
  }
}
</style>
