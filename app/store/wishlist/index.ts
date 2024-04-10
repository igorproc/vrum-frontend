// Types & Interfaces
import type { IWishlistDataProductId } from '~/api/wishlist/shared.types'

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
