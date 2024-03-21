export type TWishlistData = {
  isGuest: boolean,
  userId: number,
  token: string,
}

export interface IWishlistDataProductId {
  id: number,
  productId: number,
  variantId: number | null,
}
