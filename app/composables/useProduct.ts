// Pinia Stores
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'
// Pinia Methods
import { addItemToWishlist, removeItemFromWishlist } from '~/store/wishlist/actions'
import { addItemToCart, removeItemFromCart } from '~/store/cart/actions'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import type { TCartAddProductInput } from '~/api/cart/addProduct'

export const useProduct = (product: TProduct) => {
  const wishlistStore = useWishlistStore()
  const cartStore = useCartStore()

  const configurableProductVariant = ref<number | null>(null)
  const operationWithWishlistIsProcessing = ref(false)
  const operationWithCartIsProcessing = ref(false)

  const productIsAddedToCart = computed(() => {
    if (product.__typename === 'BASE') {
      return cartStore
        .idsList
        .find(cartItem => cartItem.productId === product.id)
    }
    if (!configurableProductVariant.value) {
      return false
    }

    return cartStore.idsList.find(cartItem => {
      return cartItem.productId === product.id && cartItem.variantId === configurableProductVariant.value
    })
  })
  const productIsAddedToWishlist = computed(() => {
    if (product.__typename === 'BASE') {
      return wishlistStore
        .idsList
        .find(wishlistItem => wishlistItem.productId === product.id)
    }
    if (!configurableProductVariant.value) {
      return false
    }

    return wishlistStore.idsList.find(wishlistId => {
      return wishlistId.productId === product.id && wishlistId.variantId === configurableProductVariant.value
    })
  })

  const addProductVariant = (variantId: number | null) => {
    configurableProductVariant.value = variantId
  }
  const addToWishlist = async () => {
    operationWithWishlistIsProcessing.value = true

    await addItemToWishlist(
      product,
      configurableProductVariant.value,
    )
    operationWithWishlistIsProcessing.value = false
  }
  const removeFromWishlist = async () => {
    if (!productIsAddedToWishlist.value) {
      return false
    }
    operationWithWishlistIsProcessing.value = true

    await removeItemFromWishlist(productIsAddedToWishlist.value.id)
    operationWithWishlistIsProcessing.value = false
  }
  const addToCart = async (qty?: number) => {
    operationWithWishlistIsProcessing.value = true

    const payload: Omit<TCartAddProductInput, 'token'> = {
      id: product.id,
      qty: !qty && productIsAddedToCart.value ?
        productIsAddedToCart.value.qty + 1 : 1
    }

    if (product.__typename === 'CONFIGURABLE' && configurableProductVariant.value) {
      payload.variantId = configurableProductVariant.value
    }

    await addItemToCart(payload)
    operationWithWishlistIsProcessing.value = false
  }
  const removeFromCart = async () => {
    if (!productIsAddedToCart.value) {
      return
    }

    operationWithCartIsProcessing.value = true
    await removeItemFromCart({ id: productIsAddedToCart.value.id })
    operationWithCartIsProcessing.value = false
  }

  return {
    operationWithCartIsProcessing,
    operationWithWishlistIsProcessing,
    configurableProductVariant,
    productIsAddedToWishlist,
    productIsAddedToCart,
    addProductVariant,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
  }
}
