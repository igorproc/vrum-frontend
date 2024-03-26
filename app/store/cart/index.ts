interface ICartStoreState {
  token: string,
  idsList: {
    id: number,
    productId: number,
    variantId: number | null,
    qty: number,
  }[],
}

export const useCartStore = defineStore('cart-store', {
  state: (): ICartStoreState => {
    return {
      token: '',
      idsList: [],
    }
  },
})
