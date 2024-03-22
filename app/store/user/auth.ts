// Pinia Stores
import { useUserStore } from '~/store/user/index'
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'
// Pinia Actions
import { wishlistOnLoginUser } from '~/store/wishlist/auth'
import { cartOnLoginUser } from '~/store/cart/auth'
// Api Methods
import { loginUser as apiLoginUser } from '~/api/user/login'
import { createUser as apiCreateUser } from '~/api/user/create'
import { logoutUser as apiLogoutUser } from '~/api/user/logout'
// Utils
import { prettyBearerToken } from '~/utils/bearer.util'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'
// Types & Interfaces
import type { TUserLogin, TUserLoginInput } from '~/api/user/login'
import type { TUserRegister, TUserRegisterInputWithoutTokens } from '~/api/user/create'

export const fillStoreData = (userData: TUserLogin | TUserRegister) => {
  const userStore = useUserStore()
  const authToken = useCookie(
    'Authorization',
    {
      watch: 'shallow',
      maxAge: COOKIE_MAX_LIFE,
    },
  )

  authToken.value = prettyBearerToken(userData.token)
  userStore.isGuest = false
  userStore.token = authToken.value
  userStore.userData = userData.data
}

export const loginUser = async (loginData: TUserLoginInput) => {
  const userData = await apiLoginUser(loginData)
  if (!userData) {
    return false
  }

  fillStoreData(userData)
  await Promise.all([
    wishlistOnLoginUser(userData.wishlist),
    cartOnLoginUser(userData.cart),
  ])

  return true
}

export const createUser = async (registerData: TUserRegisterInputWithoutTokens) => {
  try {
    const wishlistStore = useWishlistStore()
    const cartStore = useCartStore()

    const userData = await apiCreateUser(
      Object.assign(
        registerData,
        {
          cartToken: cartStore.token,
          wishlistToken: wishlistStore.token,
        },
      ),
    )
    if (!userData) {
      return false
    }

    fillStoreData(userData)
    return true
  } catch (error) {
    throw error
  }
}

export const logoutUser = async () => {
  try {
    const userStore = useUserStore()
    const cookieTokenValue = useCookie('Authorization')

    await apiLogoutUser()

    userStore.isGuest = true
    userStore.userData = null
    cookieTokenValue.value = ''

    return true
  } catch (error) {
    throw error
  }
}
