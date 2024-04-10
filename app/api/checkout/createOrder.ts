export enum EOrderPaymentType {
  'cash' = 'cash',
  'card' = 'online.card',
  'btc' = 'online.BTC',
}

interface IUserData {
  name: string,
  surname: string,
  country: string,
  city: string,
  address: string,
  email: string,
}

export type TCreateOrderInput = {
  token: string,
  paymentType: EOrderPaymentType,
  user: IUserData,
}

export type TCreateOrder = {
  status: {
    code: number,
    success: boolean,
  },
}

export async function createOrder(data: TCreateOrderInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCreateOrder>(
    'POST',
    '/api/checkout/create',
    { data },
  )
}
