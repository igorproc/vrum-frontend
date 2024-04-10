// Types & Interfaces
import type { TConfigurableProductOptions } from '~/api/product/configurable/shred.types'

export type TCreateOptionGroupInput = {
  productId: number,
  label: string,
}

export type TCreateOptionGroup = {
  group: TConfigurableProductOptions
}

export async function createOptionGroup(data: TCreateOptionGroupInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCreateOptionGroup>(
    'POST',
    '/api/product/configurable/createOptionGroup',
    { data },
  )
}
