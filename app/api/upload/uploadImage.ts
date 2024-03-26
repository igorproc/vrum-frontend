export enum EUploadTypes {
  'product' = 'product',
  'brand' = 'brand'
}

export type TUploadImage = {
  file: string,
  path: string,
}

export async function uploadImage(type: string, image: File) {
  const asyncQuery = useAsyncQuery()

  const formData = new FormData()
  formData.append('image', image)

  return asyncQuery<TUploadImage>(
    'POST',
    `/api/product/uploadImage?type=${type}`,
    formData,
    { 'Content-Type': 'multipart/form-data' }
  )
}
