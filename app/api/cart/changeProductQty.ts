import type { TCartAddProduct } from '~/api/cart/addProduct'

export type TChangeProductQtyInCartInput = {
  token: string,
  id: number,
  qty: number,
}

export type TChangeProductQtyInCart = {
  item: TCartAddProduct
}

export async function changeProductQty(data: TChangeProductQtyInCartInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TChangeProductQtyInCart>(
    'POST',
    '/api/cart/changeQuantity',
    { data },
  )
}
