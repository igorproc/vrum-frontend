// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { getWishlistShorterData } from '~/api/wishlist/getShortData'
import { create } from '~/api/wishlist/create'

export const wishlistOnLoginUser = async (token: string) => {
  try {
    const wishlistStore = useWishlistStore()
    const wishlistTokenValue = useCookie(
      'wishlist-id',
      { maxAge: 60 * 60 * 24 * 14 },
    )

    wishlistTokenValue.value = token
    wishlistStore.wishlistToken = token

    const idsList = await getWishlistShorterData()
    if (!idsList) {
      return
    }

    wishlistStore.idsList = idsList.items
    wishlistStore.productList = []
  } catch (error) {
    throw error
  }
}

export const wishlistOnLogoutUser = async () => {
  try {
    const wishlistTokenValue = useCookie(
      'wishlist-id',
      { maxAge: 60 * 60 * 24 * 14 },
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
