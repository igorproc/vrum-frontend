// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { create } from '~/api/wishlist/create'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'
// Types & Interfaces
import type { TWishlistProductIds } from '~/api/wishlist/getShortData'

export const wishlistOnLoginUser = async (wishlistData: TWishlistProductIds) => {
  try {
    const wishlistStore = useWishlistStore()
    const wishlistToken = useCookie(
      'wishlist-id',
      { maxAge: COOKIE_MAX_LIFE },
    )

    wishlistToken.value = wishlistData.token
    wishlistStore.token = wishlistData.token
    wishlistStore.idsList = wishlistData.items
  } catch (error) {
    throw error
  }
}

export const onRegisterUser = async (token: string) => {
  try {
    const wishlistStore = useWishlistStore()
    const wishlistToken = useCookie(
      'wishlist-id',
      { maxAge: COOKIE_MAX_LIFE },
    )

    wishlistToken.value = token
    wishlistStore.token = token
  } catch (error) {
    throw error
  }
}

export const wishlistOnLogoutUser = async () => {
  try {
    const wishlistTokenValue = useCookie(
      'wishlist-id',
      { maxAge: COOKIE_MAX_LIFE },
    )

    const newGuestWishlistToken = await create()
    if (!newGuestWishlistToken) {
      return
    }

    wishlistTokenValue.value = newGuestWishlistToken.token
  } catch (error) {
    throw error
  }
}
