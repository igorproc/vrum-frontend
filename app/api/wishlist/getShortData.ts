import type { IWishlistDataProductId } from '~/api/wishlist/shared.types'

export type TWishlistProductIds = {
  token: string,
  items: IWishlistDataProductId[]
}

export async function getWishlistShorterData(token: string) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TWishlistProductIds>(
    'GET',
    `/api/wishlist/shortData?token=${token}`,
  )
}
