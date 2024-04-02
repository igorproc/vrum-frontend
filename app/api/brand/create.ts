// Types & interfaces
import type { TBrand } from '~/api/brand/getBrandList'

export type TCreateBrandInput = {
  name: string,
  imageUrl: string,
}

export type TCreateBrand = {
  data: TBrand
}

export async function createBrand (brandData: TCreateBrandInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCreateBrand>(
    'POST',
    '/api/brand/create',
    { data: brandData }
  )
}
