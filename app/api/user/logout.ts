export type TUserLogout = {
  success: boolean
}

export async function logoutUser() {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TUserLogout>(
    'POST',
    '/api/user/logout',
  )
}
