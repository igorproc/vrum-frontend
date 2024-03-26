// Types & Interfaces
import type { IWishlistDataProductId } from '~/api/wishlist/shared.types'

export type TWishlistAddProductInput = {
  token: string,
  id: number,
  variantId?: number,
}

export async function addProduct (productData: TWishlistAddProductInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<IWishlistDataProductId>(
    'POST',
    '/api/wishlist/addItem',
    { data: productData },
  )
}
