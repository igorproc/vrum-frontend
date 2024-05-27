// Pinia stores
import { useUserStore } from '~/store/user/index'
// Api Methods
import { getUserData } from '~/api/user/userData'
import { createCart } from '~/store/cart/actions'
import { wishlistCreateCart } from '~/store/wishlist/actions'

export const initializeUser = async () => {
  const userStore = useUserStore()
  const authToken = useCookie('authorization')

  if (!authToken.value) {
    return
  }

  const userData = await getUserData(authToken.value)
  if (!userData?.data) {
    authToken.value = null
    await Promise.all([
      createCart(),
      wishlistCreateCart(),
    ])
    return
  }

  userStore.userData = userData.data
  userStore.isGuest = false
}
