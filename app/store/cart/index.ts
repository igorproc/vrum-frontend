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

      this.products.forEach(item => {
        const basePrice = item.qty * item.product.price
        if (item.product.__typename === EAddProductTypes.base || !item.product?.configurable) {
          totalPrice += basePrice
          return
        }

        const variantCandidate = item
          .product
          .configurable
          ?.variants
          ?.find(variant => variant.product.id === item.selectedVariant)
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
