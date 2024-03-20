import type { IWishlistDataProductId } from '~/api/user/wishlist/shared.types'

export type TWishlistDataWishProductIds = {
  token: string,
  productIds: IWishlistDataProductId[]
}

export async function getWishlistShorterData() {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TWishlistDataWishProductIds>(
    'GET',
    '/api/wishlist/shortData',
  )
}
