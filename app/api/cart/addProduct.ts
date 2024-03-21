export type TCartAddProductInput = {
  token: string,
  id: number,
  variantId?: number,
  qty: number,
}

export type TCartAddProduct = {
  id: number,
  productId: number,
  variantId: number | null,
  qty: number,
}

export async function addProduct (productData: TCartAddProductInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCartAddProduct>(
    'POST',
    '/api/cart/addItem',
    { data: productData },
  )
}
