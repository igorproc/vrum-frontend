export enum EDeleteProductAttributeTypes {
  'optionGroup' = 'optionGroup',
  'variantGroup' = 'variantGroup',
  'option' = 'optionItem',
  'variant' = 'variantItem',
}

export type TDeleteProductAttributeInput = {
  id: number,
  type: EDeleteProductAttributeTypes,
}

export type TDeleteProductAttribute = {
  successDelete: boolean,
}

export async function deleteConfigurableAttribute(data: TDeleteProductAttributeInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TDeleteProductAttribute>(
    'POST',
    '/api/product/configurable/deleteByType',
    { data },
  )
}
