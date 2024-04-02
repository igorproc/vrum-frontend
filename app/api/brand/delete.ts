export type TDeleteBrand = {
  brandIsDeleted: boolean
}

export async function deleteBrand (id: number) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TDeleteBrand>(
    'POST',
    `/api/brand/delete?id=${id}`
  )
}
