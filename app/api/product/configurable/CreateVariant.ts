import type { TConfigurableProductVariants } from '~/api/product/configurable/shred.types'

export type TCreateVariantInput = {
  id: number,
  sku: string,
  imageUrl: string,
  price: number,
}

export type TCreateVariant = {
  group: TConfigurableProductVariants,
}

export async function createVariant (data: TCreateVariantInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCreateVariant>(
    'POST',
    '/api/product/configurable/createVariantGroup',
    { data }
  )
}
