export type TWishlistData = {
  isGuest: boolean,
  userId: number,
  token: string,
}

export type TWishlistOperationWithProductInput = {
  productId: number,
  variantId?: number,
  wishlistToken: string,
}

export interface IWishlistDataProductId {
  id: number,
  productId: number,
  variantId?: number,
}
