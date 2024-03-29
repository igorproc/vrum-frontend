// Tpyes & Interfaces
import type { TProduct } from '~/api/product/shared.types'

export async function getProductDataById(id: number) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TProduct>(
    'GET',
    `/api/product/admin/${id}`,
  )
}
