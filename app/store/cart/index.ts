// Types & Interfaces
import type { TCartProductIds } from '~/api/cart/getShortData'
import type { TCartProduct } from '~/api/cart/getProducts'

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
        if (!item.selectedVariant) {
          totalPrice += item.qty * item.product.price
          return
        }

        if (item.selectedVariant && !item.product?.configurable) {
          return
        }

        const variantCandidate = item
          .product
          .configurable
          ?.variants
          ?.find(variant => variant.product.id === item.selectedVariant)
        if (!variantCandidate) {
          return
        }

        totalPrice += variantCandidate.product.price * item.qty
      })
      return Number(totalPrice.toFixed(2))
    },
  },
})
