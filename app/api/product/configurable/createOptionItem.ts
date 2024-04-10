import type { TConfigurableProductOptionValue } from '~/api/product/configurable/shred.types'

export type TCreateOptionItemInput = {
  groupId: number,
  name: string,
  value: string,
}

export type TCreateOptionItem = {
  item: TConfigurableProductOptionValue
}

export async function createOptionItem(data: TCreateOptionItemInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TCreateOptionItem>(
    'POST',
    '/api/product/configurable/createOptionItem',
    { data },
  )
}
