// Types & Interfaces
import type { TCartProductIds } from '~/api/cart/getShortData'
import type { TCartProduct } from '~/api/cart/getProducts'
import { EAddProductTypes } from '~/api/product/shared.types'

interface ICartStoreState {
  token: string,
  idsList: TCartProductIds['items'],
  products: TCartProduct[],
}

export const useCartStore = defineStore('cart-store', {
  state: (): ICartStoreState => {
    return {
      token: '',
      idsList: [],
      products: [],
    }
  },
  getters: {
    totalPrice() {
      let totalPrice = 0

      this.idsList.forEach(item => {
        const productData = this.products.find(product => product.product.id === item.productId)
        if (!productData) {
          return
        }

        const basePrice = item.qty * productData.product.price
        if (productData.product.__typename === EAddProductTypes.base ||
          !productData.product?.configurable ||
          !item.variantId) {
          totalPrice += basePrice
          return
        }

        const variantCandidate = productData
          .product
          .configurable
          ?.variants
          ?.find(variant => variant.product.id === item.variantId)
        if (!variantCandidate) {
          totalPrice += basePrice
          return
        }

        totalPrice += variantCandidate.product.price * item.qty
      })
      return Number(totalPrice.toFixed(2))
    },
  },
})
