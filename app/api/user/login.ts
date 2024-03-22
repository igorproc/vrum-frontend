// Types  & Interfaces
import type { TUserData } from '~/api/user/shared.types'
import type { TWishlistProductIds } from '~/api/wishlist/getShortData'
import type { TCartProductIds } from '~/api/cart/getShortData'

export type TUserLogin = {
  data: TUserData,
  token: string,
  wishlist: TWishlistProductIds,
  cart: TCartProductIds,
}

export type TUserLoginInput = {
  email: string,
  password: string,
}

export async function loginUser(userData: TUserLoginInput) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TUserLogin>(
    'POST',
    '/api/user/login',
    { loginData: userData },
  )
}
