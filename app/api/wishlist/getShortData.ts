import type { IWishlistDataProductId } from '~/api/wishlist/shared.types'

export type TWishlistDataWishProductIds = {
  token: string,
  items: IWishlistDataProductId[]
}

export async function getWishlistShorterData(token: string) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TWishlistDataWishProductIds>(
    'GET',
    `/api/wishlist/shortData?token=${token}`,
  )
}
