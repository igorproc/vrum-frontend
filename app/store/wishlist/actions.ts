// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { addProduct } from '~/api/wishlist/addProduct'
import { removeProduct } from '~/api/wishlist/removeProduct'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import type { TWishlistAddProductInput } from '~/api/wishlist/addProduct'
import type { TWishlistRemoveProductInput } from '~/api/wishlist/removeProduct'
import type { TWishlistProduct } from '~/api/wishlist/getProducts'

export async function addItemToWishlist(productData: TProduct, selectedVariant?: number | null) {
  const wishlistStore = useWishlistStore()

  const payload: TWishlistAddProductInput = {
    token: wishlistStore.token,
    id: productData.id,
  }
  const productPayload: TWishlistProduct = {
    productData,
    selectedVariant: null,
  }

  if (selectedVariant) {
    payload.variantId = selectedVariant
    productPayload.selectedVariant = selectedVariant
  }

  const itemIsAddedToWishlist = await addProduct(payload)
  if (!itemIsAddedToWishlist) {
    return false
  }

  wishlistStore
    .idsList
    .push(itemIsAddedToWishlist)

  return true
}

export async function removeItemFromWishlist(wishlistProductId: number) {
  const wishlistStore = useWishlistStore()

  const payload: TWishlistRemoveProductInput = {
    token: wishlistStore.token,
    id: wishlistProductId,
  }

  const removedItemData = await removeProduct(payload)
  if (!removedItemData) {
    return false
  }

  wishlistStore.idsList = wishlistStore
    .idsList
    .filter(item => item.id !== removedItemData.id)

  return true
}
