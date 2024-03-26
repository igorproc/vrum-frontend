import type { TUserData } from '~/api/user/shared.types'

export async function getUserData(token: string) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<{ data: TUserData }>(
    'GET',
    `/api/user/data?token=${token}`,
  )
}
