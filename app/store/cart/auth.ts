// Pinia Stores
import { useCartStore } from '~/store/cart/index'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'
// Types & Interfaces
import type { TCartProductIds } from '~/api/cart/getShortData'

export const cartOnLoginUser = async (cartData: TCartProductIds) => {
  try {
    const cartStore = useCartStore()
    const cartToken = useCookie(
      'cart-token',
      { maxAge: COOKIE_MAX_LIFE },
    )

    cartToken.value = cartData.token
    cartStore.token = cartData.token
    cartStore.idsList = cartData.items
  } catch (error) {
    throw error
  }
}
