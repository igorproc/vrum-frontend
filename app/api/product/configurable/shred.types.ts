export type TConfigurableProductOptions = {
  id: number
  name: string
  values: {
    id: number
    name: string
    value: string
  }[]
}

export type TConfigurableProductVariants = {
  attributes: {
    code: string
    valueId: number
  }[]
  product: {
    id: number
    sku: string
    imageUrl: string
  }
}

export type TConfigurableProductOption = {
  pcoiid: number,
  pcoid: number,
  label: string,
  value: string,
}
