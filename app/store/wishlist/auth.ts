// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'
// Types & Interfaces
import type { TWishlistProductIds } from '~/api/wishlist/getShortData'

export const wishlistOnLoginUser = async (wishlistData: TWishlistProductIds) => {
  try {
    const wishlistStore = useWishlistStore()
    const wishlistToken = useCookie(
      'wishlist-token',
      { maxAge: COOKIE_MAX_LIFE },
    )

    wishlistToken.value = wishlistData.token
    wishlistStore.token = wishlistData.token
    wishlistStore.idsList = wishlistData.items
  } catch (error) {
    throw error
  }
}
