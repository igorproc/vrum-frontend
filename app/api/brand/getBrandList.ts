import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from '~/shared/const/pagination'

export type TBrand = {
  id: number,
  name: string,
  image: string,
  times: {
    createdAt: string,
    updatedAt: string,
  }
}

type TBrandResponse = {
  brands: TBrand[]
}

export async function getBrandList(
  page?: number,
  size?: number,
) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TBrandResponse>(
    'GET',
    `/api/brand/list?page=${page || DEFAULT_PAGE_NUMBER}&size=${size || DEFAULT_PAGE_SIZE}`,
  )
}
