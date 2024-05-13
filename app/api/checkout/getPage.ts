import type { TTimes } from '~/api/shared.types'

export type TGetOrderPageInput = {
  page: number,
}

type TOrder = {
  id: number;
  token: string;
  status: string;
  payment: string;
  times: TTimes;
}

export type TGetOrderPage = {
  orders: TOrder[];
  totalPages: number;
  totalOrders: number;
}

export async function getCheckoutPage (data: TGetOrderPageInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TGetOrderPage>(
    'GET',
    `/api/checkout/list?page=${data.page}`,
  )
}
