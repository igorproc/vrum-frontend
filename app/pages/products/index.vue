<template>
  <div class="app-products-page">
    <AppProductListHeader
      :total-products="data?.totalProducts || 0"
      :page-size="filterParams.size"
      :current-page="filterParams.page"
      :sort-by="filterParams.sortBy"
      class="app-products-page__filters"
      @page-size-updated="updatePageSize"
      @page-sort-updated="updateSort"
    />

    <AppProductList
      :is-loading="pending"
      :page-size="filterParams.size"
      :product-list="data?.products || []"
      class="app-products-page__list"
    />

    <AppProductListPagination
      :is-disabled="pending"
      :total-pages="data?.totalPages || 0"
      :current-page="filterParams.page"
      class="app-products-page__pagination"
      @update-current-page="updateCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
// Constants
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SORT,
} from '~/shared/const/pagination'
// Types & Interfaces
import type { TGetProductPageInput, TPageSortCondition } from '~/api/product/getProductPage'

const router = useRouter()

const filterParams = reactive<TGetProductPageInput>({
  page: DEFAULT_PAGE_NUMBER,
  size: DEFAULT_PAGE_SIZE,
  sortBy: DEFAULT_PAGE_SORT,
  brand: null,
})

const checkRouteParams = () => {
  const objectMaps = {
    page: 'page',
    size: 'size',
    brand: 'brand',
    sort: 'sortBy',
  }
  const queries = router.currentRoute.value.query

  for (const [key, value] of Object.entries(queries)) {
    if (!Object.keys(objectMaps).includes(key)) {
      continue
    }

    // @ts-ignore
    filterParams[objectMaps[key]] = Number(value) || value
  }
}

const changeRouteQueries = () => {
  const queries: {
    page: number,
    size: number,
    brand?: number | string,
    sort?: string,
  } = {
    page: filterParams.page,
    size: filterParams.size,
  }

  if (filterParams.brand) {
    queries.brand = filterParams.brand
  }
  if (filterParams.sortBy) {
    queries.sort = filterParams.sortBy
  }

  router.replace({ query: queries })
}

checkRouteParams()
const { data, pending } = useLazyAsyncData(
  'product-page',
  async () => getProductPage(filterParams),
  {
    watch: [filterParams],
  },
)

const updatePageSize = (size: number) => {
  filterParams.page = 1
  filterParams.size = size
}

const updateCurrentPage = (page: number) => {
  filterParams.page = page
}

const updateSort = (sort: string) => {
  filterParams.sortBy = sort as TPageSortCondition
}

watch(filterParams, () => changeRouteQueries())
</script>

<style lang="scss">
.app-products-page {
  @media #{map-get($display-rules, 'md')} {
    &__list,
    &__pagination {
      margin-top: 32rem;
    }
  }
}
</style>
