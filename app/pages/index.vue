<template>
  <div class="app-main-page">
    <div class="app-main-page__slider">
      <AppBannersMain />
    </div>

    <div v-if="data?.brands" class="app-main-page__personality-slider">
      <AppPersonalitySlider :brands="data.brands" />
    </div>

    <div v-if="data?.products" class="app-main-page__showcase">
      <AppProductShowcaseList :product-list="data.products" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
import { getBrandList } from '~/api/brand/getBrandList'

async function onLoad() {
  const [showcase, brands] = await Promise.all([
    getProductPage({ page: 1, size: 8 }),
    getBrandList(1, 12),
  ])

  return {
    products: showcase?.products,
    brands: brands?.brands,
  }
}

const { data } = useLazyAsyncData(
  'index-page-data',
  async () => await onLoad(),
)
</script>

<style lang="scss">
.app-main-page {
  &__slider {
    margin: -10rem -15rem;
  }

  &__showcase,
  &__personality-slider {
    margin-top: 23rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    &__slider {
      margin: -30rem -65rem;
    }

    &__showcase,
    &__personality-slider {
      margin-top: 56rem;
    }
  }

  @media #{map-get($display-rules, 'xxl')} {
    &__slider {
      margin: -40rem -185rem;
    }
  }
}
</style>
