// Constants
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '~/shared/const/pagination'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

export type TProductPageFilters = {
  brand?: string,
  sortBy?: string,
}

export type TGetProductPageInput = {
  page: number,
  size: number,
  filters: TProductPageFilters
}

export type TProductPage = {
  products: TProduct[]
}

export async function getProductPage(currentPage?: number, pageSize?: number) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TProductPage>(
    'GET',
    `/api/product/list?page=${currentPage || DEFAULT_PAGE_NUMBER}&size=${pageSize || DEFAULT_PAGE_SIZE}`,
  )
}
