// Types & Interfaces
import type { IWishlistDataProductId } from '~/api/wishlist/shared.types'

export type TWishlistRemoveProductInput = {
  token: string,
  id: number
}

export async function removeProduct(productData: TWishlistRemoveProductInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<IWishlistDataProductId>(
    'POST',
    '/api/wishlist/removeItem',
    { data: productData },
  )
}
