import { EAddProductTypes } from '~/api/product/shared.types'

export type TUpdateProductInput = {
  id: number,
  typename?: keyof typeof EAddProductTypes,
  name?: string,
  description?: string,
  price?: number,
}

export type TUpdateProduct = {
  product: {
    id: number
  }
}

export async function updateProduct (data: TUpdateProductInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TUpdateProduct>(
    'POST',
    '/api/product/update',
    { data },
  )
}
