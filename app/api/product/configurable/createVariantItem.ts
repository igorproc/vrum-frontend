import type { TConfigurableProductVariantAttribute } from '~/api/product/configurable/shred.types'

export type TCreateVariantItemInput = {
  variantGroupId: number,
  optionGroupId: number,
  optionId: number,
}

export type TCreateVariantItem = {
  item: TConfigurableProductVariantAttribute,
}

export async function createVariantItem(data: TCreateVariantItemInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCreateVariantItem>(
    'POST',
    '/api/product/configurable/createVariantItem',
    { data },
  )
}
