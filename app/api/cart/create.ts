export type TCartData = {
  token: string,
  isGuest: boolean,
  userId: number,
}

export async function create() {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCartData>(
    'POST',
    '/api/cart/createCart',
  )
}
