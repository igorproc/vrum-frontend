export type TConfigurableProductOptionValue = {
  id: number,
  name: string,
  value: string
}

export type TConfigurableProductVariantAttribute = {
  code: string,
  valueId: number,
}

export type TConfigurableProductVariantProduct = {
  id: number
  sku: string
  imageUrl: string
  price: number
}

export type TConfigurableProductOptions = {
  id: number
  name: string
  values: TConfigurableProductOptionValue[]
}

export type TConfigurableProductVariants = {
  attributes: TConfigurableProductVariantAttribute[],
  product: TConfigurableProductVariantProduct,
}
