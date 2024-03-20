import type {
  TConfigurableProductOptions,
  TConfigurableProductVariants,
} from '~/api/product/configurable/shred.types'
import type {
  TProductBrand
} from '~/api/brand/shared.types'
import type {
  TAdditionalDataGroup
} from '~/api/product/additionalData/shared.types'

export enum EAddProductTypes {
  'base' = 'BASE',
  'configurable' = 'CONFIGURABLE',
}

export type TProduct = {
  id: number
  __typename: EAddProductTypes
  brand: TProductBrand | null
  name: string
  description: string
  price: number
  productImage: string
  configurable?: {
    productOptions?: TConfigurableProductOptions[]
    productVariants?: TConfigurableProductVariants[]
  }
  createdAt: string
  updatedAt: string
}
