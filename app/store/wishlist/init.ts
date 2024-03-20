// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { createWishlist } from '~/api/user/wishlist/createWishlist'
import { getWishlistShorterData } from '~/api/user/wishlist/wishlistShortData'

export const initializeWishlist = async () => {
  const wishlistStore = useWishlistStore()
  const wishlistToken = useCookie('wishlist-token')

  if (!wishlistToken.value) {
    const wishlistData = await createWishlist()
    if (!wishlistData) {
      return
    }

    wishlistStore.wishlistToken = wishlistData.token
    wishlistToken.value = wishlistData.token
    return
  }

  const wishlistData = await getWishlistShorterData()
  if (!wishlistData) {
    return
  }

  wishlistStore.wishlistToken = wishlistData.token
  wishlistStore.idsList = wishlistData.productIds
}
