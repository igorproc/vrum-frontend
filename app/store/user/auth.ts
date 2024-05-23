// Pinia Stores
import { useUserStore } from '~/store/user/index'
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'
// Pinia Actions
import { createCart } from '~/store/cart/actions'
import { wishlistOnLoginUser } from '~/store/wishlist/auth'
import { cartOnLoginUser } from '~/store/cart/auth'
// Types & Interfaces
import type { TUserLogin, TUserLoginInput } from '~/api/user/login'
// Api Methods
import { loginUser as apiLoginUser } from '~/api/user/login'
import type { TUserRegister, TUserRegisterInputWithoutTokens } from '~/api/user/create'
import { createUser as apiCreateUser } from '~/api/user/create'
import { logoutUser as apiLogoutUser } from '~/api/user/logout'
// Utils
import { prettyBearerToken } from '~/utils/bearer.util'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'
import { wishlistCreateCart } from '~/store/wishlist/actions'

export const fillStoreData = (userData: TUserLogin | TUserRegister) => {
  const userStore = useUserStore()
  const authToken = useCookie(
    'authorization',
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
    const authToken = useCookie('authorization')
    const router = useRouter()

    const isSuccessLogout = await apiLogoutUser()

    if (!isSuccessLogout?.success) {
      return false
    }

    authToken.value = null
    userStore.isGuest = true
    userStore.userData = null

    await Promise.all([
      createCart(),
      wishlistCreateCart(),
    ])

    await router.push({ name: 'index' })
    return true
  } catch (error) {
    throw error
  }
}
