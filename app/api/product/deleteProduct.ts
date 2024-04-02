export type TProductRemove = {
  productIsDeleted: boolean
}

export async function deleteProduct (productId: number) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TProductRemove>(
    'POST',
    `/api/product/delete?id=${productId}`,
  )
}
