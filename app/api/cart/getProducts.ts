// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

export type TCartProduct = {
  product: TProduct,
  selectedVariant: number | null,
  qty: number
}

export async function getCartProducts(token: string) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<{ items: TCartProduct[] }>(
    'GET',
    `/api/cart/list?token=${token}`,
  )
}
