<template>
  <div class="app-main-page main-page">
    <div class="main-page__slider">
      <AppMainSlider />
    </div>
    <div v-if="data" class="main-page__personality-slider">
      <AppPersonalitySlider :brands="data.brands" />
    </div>
    <div v-if="data" class="main-page__showcase">
      <AppShowcaseList :product-list="data.products" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
import { getBrandList } from '~/api/brand/getBrandList'
// Components
import AppMainSlider from '~/components/main/AppMainSlider.vue'
import AppShowcaseList from '~/components/products/showcase/AppShowcaseList.vue'
import AppPersonalitySlider from '~/components/personality/AppPersonalitySlider.vue'

async function onLoad() {
  const [showcase, brands] = await Promise.all([
    getProductPage(1, 8),
    getBrandList(1, 12)
  ])

  return {
    products: showcase?.products || [],
    brands: brands?.brands || [],
  }
}

const { data } = useLazyAsyncData(
  'index-page-data',
  async () => await onLoad()
)
</script>

<style lang="scss">
.app-main-page {
  .main-page__slider,{
    margin: -10rem -15rem;
  }

  .main-page__showcase,
  .main-page__personality-slider {
    margin-top: 23rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    .main-page__slider {
      margin: -30rem -65rem;
    }

    .main-page__showcase,
    .main-page__personality-slider {
      margin-top: 56rem;
    }
  }

  @media #{map-get($display-rules, 'xxl')} {
    .main-page__slider, {
      margin: -40rem -185rem;
    }
  }
}
</style>
