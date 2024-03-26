export type TCartRemoveProductInput = {
  token: string,
  id: number,
}

export type TCartRemoveProduct = {
  success: boolean,
  id: number,
}

export async function removeProduct(cartData: TCartRemoveProductInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCartRemoveProduct>(
    'POST',
    '/api/cart/removeProduct',
    { data: cartData },
  )
}
