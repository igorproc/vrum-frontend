import type { TUserData } from '~/api/user/shared.types'

interface IUserStoreState {
  isGuest: boolean,
  userData: TUserData | null,
  token: string | null,
}

export const useUserStore = defineStore('user-store', {
  state: (): IUserStoreState => {
    return {
      isGuest: true,
      userData: null,
      token: null,
    }
  },
  getters: {
    isAdmin: (state): boolean => {
      if (!state.userData || state.isGuest) {
        return false
      }
      return ['ADMIN', 'OWNER'].includes(state.userData.role)
    },
  },
})
