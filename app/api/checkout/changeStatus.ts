import { EOrderStatusSet } from '~/api/checkout/getPage'

export type TChangeOrderStatusInput = {
  id: number,
  status: keyof typeof EOrderStatusSet,
}

export type TChangeOrderStatus = {
  id: number,
  status: EOrderStatusSet,
}

export async function changeCheckoutStatus(data: TChangeOrderStatusInput) {
  const asyncQuery = useAsyncQuery()

  return asyncQuery<TChangeOrderStatus>(
    'POST',
    '/api/checkout/update/status',
    { data }
  )
}
