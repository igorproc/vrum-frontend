// Types & Interfaces
import type { TUserData } from '~/api/user/shared.types'

export type TUserRegisterInputWithoutTokens = Omit<TUserRegisterInput, 'cartToken' | 'wishlistToken'>

export type TUserRegisterInput = {
  email: string,
  password: string,
  role?: string,
  wishlistToken: string,
  cartToken: string,
}

export type TUserRegister = {
  data: TUserData,
  token: string,
}

export async function createUser(userData: TUserRegisterInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TUserRegister>(
    'POST',
    '/api/user/create',
    { registerData: userData },
  )
}
