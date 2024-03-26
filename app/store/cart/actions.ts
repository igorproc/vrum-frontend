// Pinia Stores
import { useCartStore } from '~/store/cart/index'
// Api Methods
import { create } from '~/api/cart/create'
import { addProduct } from '~/api/cart/addProduct'
import { removeProduct } from '~/api/cart/removeProduct'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'
// Types & Interfaces
import type { TCartAddProductInput } from '~/api/cart/addProduct'
import type { TCartRemoveProductInput } from '~/api/cart/removeProduct'

export const createCart = async () => {
  const wishlistStore = useCartStore()
  const wishlistToken = useCookie(
    'cart-token',
    { maxAge: COOKIE_MAX_LIFE },
  )

  const wishlistData = await create()
  if (!wishlistData) {
    return
  }

  wishlistToken.value = wishlistData.token
  wishlistStore.token = wishlistData.token
  wishlistStore.idsList = []
}

export const addItemToCart = async (productData: Omit<TCartAddProductInput, 'token'>) => {
  const cartStore = useCartStore()

  const productIsAdded = await addProduct(
    Object.assign(productData, { token: cartStore.token })
  )
  if (!productIsAdded) {
    return
  }

  cartStore.idsList.push(productIsAdded)
}

export const removeItemFromCart = async (productData: Omit<TCartRemoveProductInput, 'token'>) => {
  const cartStore = useCartStore()

  const productIsRemoved = await removeProduct(
    Object.assign(productData, { token: cartStore.token })
  )
  if (!productIsRemoved?.success) {
    return
  }

  cartStore.idsList.filter(item => item.id !== productIsRemoved.id)
}
