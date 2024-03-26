// Types & Interfaces
import type { IWishlistDataProductId } from '~/api/wishlist/shared.types'
import type { TWishlistProduct } from '~/api/wishlist/getProducts'

interface IWishlistStoreState {
  token: string,
  idsList: IWishlistDataProductId[],
}

export const useWishlistStore = defineStore('wishlist-store', {
  state: (): IWishlistStoreState => {
    return {
      token: '',
      idsList: [],
    }
  },
})
