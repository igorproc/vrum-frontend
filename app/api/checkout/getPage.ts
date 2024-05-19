import type { TTimes } from '~/api/shared.types'

export enum EOrderStatusSet {
  'pending' = 'PENDING',
  'shipping' = 'SHIPPING',
  'received' = 'RECEIVED',
}

export type TGetOrderPageInput = {
  page: number,
}

export type TOrder = {
  id: number,
  token: string,
  status: EOrderStatusSet,
  payment: string,
  times: TTimes,
}

export type TGetOrderPage = {
  orders: TOrder[],
  totalPages: number,
  totalOrders: number,
}

export async function getCheckoutPage(data: TGetOrderPageInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TGetOrderPage>(
    'GET',
    `/api/checkout/list?page=${data.page}`,
  )
}
