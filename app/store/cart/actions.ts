// Pinia Stores
import { useCartStore } from '~/store/cart/index'
// Api Methods
import { create } from '~/api/cart/create'
import { addProduct } from '~/api/cart/addProduct'
import { removeProduct } from '~/api/cart/removeProduct'
import { changeProductQty } from '~/api/cart/changeProductQty'
// Constants
import { COOKIE_MAX_LIFE } from '~/shared/const/cookies'
// Types & Interfaces
import type { TCartAddProductInput } from '~/api/cart/addProduct'
import type { TCartRemoveProductInput } from '~/api/cart/removeProduct'
import type { TChangeProductQtyInCart, TChangeProductQtyInCartInput } from '~/api/cart/changeProductQty'

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

  const productIsAdded = await addProduct({
    token: cartStore.token,
    ...productData,
  })
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

export const changeItemQty = async (productData: Omit<TChangeProductQtyInCartInput, 'token'>): Promise<TChangeProductQtyInCart | null> => {
  const cartStore = useCartStore()

  const cartData = await changeProductQty({ token: cartStore.token, ...productData })
  if (!cartData) {
    return null
  }

  const cartCandidate = cartStore.idsList
    .find(item => item.id === cartData.item.id)
  if (!cartCandidate) {
    return null
  }

  const productCandidate = cartStore.products
    .find(item => item.product.id === cartData.item.id)
  if (productCandidate) {
    productCandidate.qty = cartData.item.qty
  }

  cartCandidate.qty = cartData.item.qty
  return cartData
}
