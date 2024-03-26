interface IConditionStoreState {
  backdropIsVisible: boolean,
  authModalIsOpen: boolean,
  navigationDrawerIsOpen: boolean,
  adminAddProductModalIsOpen: boolean,
}

export const useConditionStore = defineStore('condition-store', {
  state: (): IConditionStoreState => {
    return {
      backdropIsVisible: false,
      authModalIsOpen: false,
      navigationDrawerIsOpen: false,
      adminAddProductModalIsOpen: false,
    }
  },
  actions: {
    openNavigationDrawer() {
      this.backdropIsVisible = true
      this.navigationDrawerIsOpen = true
    },
    closeNavigationDrawer() {
      this.backdropIsVisible = false
      this.navigationDrawerIsOpen = false
    },
    openAuthModal() {
      this.authModalIsOpen = true
    },
    closeAuthModal() {
      this.authModalIsOpen = false
    },
    openAdminAddProductModal() {
      this.adminAddProductModalIsOpen = true
    },
    closeAdminAddProductModal() {
      this.adminAddProductModalIsOpen = false
    },
    hideBackdrop() {
      this.backdropIsVisible = false
    },
  },
})
