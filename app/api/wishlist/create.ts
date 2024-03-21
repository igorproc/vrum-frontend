import type { TWishlistData } from '~/api/wishlist/shared.types'

export async function create() {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TWishlistData>(
    'POST',
    '/api/wishlist/createCart',
  )
}
