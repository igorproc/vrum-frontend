// Constants
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '~/shared/const/pagination'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

enum EPageSort {
  'asc' = 'asc',
  'desc' = 'desc',
}

export type TPageSortCondition = keyof typeof EPageSort

export type TGetProductPageInput = {
  page: number,
  size: number,
  brand?: string | null,
  sortBy?: keyof typeof EPageSort,
}

export type TProductPage = {
  products: TProduct[],
  totalPages: number,
  totalProducts: number,
}

export async function getProductPage(filters: TGetProductPageInput) {
  const asyncQuery = useAsyncQuery()

  const setFilters = () => {
    let filterString = `?page=${filters.page || DEFAULT_PAGE_NUMBER}&size=${filters.size || DEFAULT_PAGE_SIZE}`

    if (filters.brand) {
      filterString += `&brand=${filters.brand}`
    }
    if (filters.sortBy) {
      filterString += `&sort=${EPageSort[filters.sortBy]}`
    }

    return filterString
  }

  return await asyncQuery<TProductPage>(
    'GET',
    `/api/product/list${setFilters()}`,
  )
}
