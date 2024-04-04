// Pinia Methods
import { addItemToWishlist, removeItemFromWishlist } from '~/store/wishlist/actions'
import { addItemToCart, changeItemQty, removeItemFromCart } from '~/store/cart/actions'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import type { TCartAddProductInput } from '~/api/cart/addProduct'
import type { TChangeProductQtyInCartInput } from '~/api/cart/changeProductQty'

export const useProduct = (product: TProduct) => {
  const wishlistStore = useWishlistStore()
  const cartStore = useCartStore()
  const notificationStore = useNotificationStore()

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
    notificationStore.openSuccessNotification('Product successfully added to wishlist')
    operationWithWishlistIsProcessing.value = false
  }
  const removeFromWishlist = async () => {
    if (!productIsAddedToWishlist.value) {
      return false
    }
    operationWithWishlistIsProcessing.value = true

    await removeItemFromWishlist(productIsAddedToWishlist.value.id)
    notificationStore.openSuccessNotification('Product successfully removed from wishlist')
    operationWithWishlistIsProcessing.value = false
  }
  const addToCart = async (qty?: number) => {
    operationWithWishlistIsProcessing.value = true

    if (productIsAddedToCart.value) {
      await changeProductCartQty(qty)
      return
    }

    const payload: Omit<TCartAddProductInput, 'token'> = {
      id: product.id,
      qty: qty ? qty : 1,
    }

    if (product.__typename === 'CONFIGURABLE' && configurableProductVariant.value) {
      payload.variantId = configurableProductVariant.value
    }

    await addItemToCart(payload)
    notificationStore.openSuccessNotification('Product successfully added to cart')
    operationWithWishlistIsProcessing.value = false
  }

  const changeProductCartQty = async (qty?: number) => {
    if (!productIsAddedToCart.value) {
      return
    }

    operationWithWishlistIsProcessing.value = true
    const payload: Omit<TChangeProductQtyInCartInput, 'token'> = {
      id: productIsAddedToCart.value.id,
      qty: qty ? qty : productIsAddedToCart.value.qty + 1,
    }

    await changeItemQty(payload)
    notificationStore.openSuccessNotification('successfully change product qty')
    operationWithWishlistIsProcessing.value = false
  }

  const removeFromCart = async () => {
    if (!productIsAddedToCart.value) {
      return
    }

    operationWithCartIsProcessing.value = true
    await removeItemFromCart({ id: productIsAddedToCart.value.id })
    notificationStore.openSuccessNotification('Product successfully added from cart')
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
    changeProductCartQty,
  }
}
