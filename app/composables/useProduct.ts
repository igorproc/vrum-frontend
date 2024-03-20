// Pinia Stores
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'
import { addItemToWishlist, removeItemFromWishlist } from '~/store/wishlist/actions'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

export const useProduct = (product: TProduct) => {
  const wishlistStore = useWishlistStore()
  const cartStore = useCartStore()

  const configurableProductVariant = ref<number | null>(null)
  const operationWithWishlistIsProcessing = ref(false)
  const operationWithCartIsProcessing = ref(false)

  const productIsAddedToCart = computed(() => {
    if (product.__typename === 'BASE') {
      return !!cartStore.cartIdsList.find(cartId => cartId.productId === product.id)
    }
    if (!configurableProductVariant.value) {
      return false
    }

    return !!cartStore.cartIdsList.find(cartId => {
      return cartId.productId === product.id && cartId.variantId === configurableProductVariant.value
    })
  })
  const productIsAddedToWishlist = computed(() => {
    if (product.__typename === 'BASE') {
      return wishlistStore.idsList.find(wishlistId => wishlistId.productId === product.id)
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
  const addToCart = () => {
    cartStore.addItemToCart(product.id, 123, configurableProductVariant.value || null)
  }
  const removeFromCart = () => {
    cartStore.removeItemFromCart(product.id, configurableProductVariant.value || null)
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
