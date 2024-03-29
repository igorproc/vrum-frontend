// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import { EAddProductTypes } from '~/api/product/shared.types'

export type TAddProductInput = {
  name: string,
  description: string,
  price: number,
  typename: keyof typeof EAddProductTypes,
  brandId: number,
  productImage: string,
}

export async function createProduct(productData: TAddProductInput) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TProduct>(
    'POST',
    '/api/product/create',
    { productData },
  )
}
