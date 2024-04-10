// Api Methods
import { getShortData } from '~/api/cart/getShortData'
import { create } from '~/api/cart/create'
// Pinia Stores
import { useCartStore } from '~/store/cart/index'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'

export const initializeCart = async () => {
  const cartStore = useCartStore()
  const cartToken = useCookie(
    'cart-token',
    {
      watch: 'shallow',
      maxAge: COOKIE_MAX_LIFE,
    },
  )

  if (!cartToken.value) {
    const createdCartToken = await create()
    if (!createdCartToken) {
      return
    }

    cartToken.value = createdCartToken.token
    cartStore.token = createdCartToken.token
  }

  cartStore.token = cartToken.value
  const productList = await getShortData(cartToken.value)
  if (!productList) {
    return
  }

  cartStore.idsList = productList.items
}
