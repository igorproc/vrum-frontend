// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { create } from '~/api/wishlist/create'
import { getWishlistShorterData } from '~/api/wishlist/getShortData'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'

export const initializeWishlist = async () => {
  const wishlistStore = useWishlistStore()
  const wishlistToken = useCookie(
    'wishlist-token',
    {
      watch: 'shallow',
      maxAge: COOKIE_MAX_LIFE,
    },
  )

  if (!wishlistToken.value) {
    const wishlistData = await create()
    if (!wishlistData) {
      return
    }

    wishlistStore.token = wishlistData.token
    wishlistToken.value = wishlistData.token
    return
  }

  const wishlistData = await getWishlistShorterData(wishlistToken.value)
  if (!wishlistData) {
    return
  }

  wishlistStore.token = wishlistData.token || ''
  wishlistStore.idsList = wishlistData.items
}
