// Pinia stores
import { useUserStore } from '~/store/user/index'
// Api Methods
import { getUserData } from '~/api/user/userData'

export const initializeUser = async () => {
  const userStore = useUserStore()
  const authToken = useCookie('authorization')

  if (!authToken.value) {
    return
  }

  const userData = await getUserData(authToken.value)
  if (!userData) {
    return
  }

  userStore.userData = userData.data
  userStore.isGuest = false
}
