interface ICartProduct {
  id: number,
  productId: number,
  variantId: number,
  qty: number,
}

export type TCartProductIds = {
  token: string,
  items: ICartProduct[],
}

export async function getShortData(token: string) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCartProductIds>(
    'GET',
    `/api/cart/shortData?token=${token}`,
  )
}
