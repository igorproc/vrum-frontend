import type { TProduct } from '~/api/product/shared.types'

export type TWishlistProduct = {
  product: TProduct,
  selectedVariant: number | null
}

export async function getWishlistProducts(token: string) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<{ items: TWishlistProduct[] }>(
    'GET',
    `/api/wishlist/list?token=${token}`,
  )
}
