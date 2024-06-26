interface IConditionStoreState {
  backdropIsVisible: boolean,
  authModalIsOpen: boolean,
  navigationDrawerIsOpen: boolean,
  adminAddBrandModalIsOpen: boolean,
  adminAddProductModalIsOpen: boolean,
}

export const useConditionStore = defineStore('condition-store', {
  state: (): IConditionStoreState => {
    return {
      backdropIsVisible: false,
      authModalIsOpen: false,
      navigationDrawerIsOpen: false,
      adminAddBrandModalIsOpen: false,
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
      this.backdropIsVisible = true
    },
    closeAuthModal() {
      this.authModalIsOpen = false
      this.backdropIsVisible = false
    },
    openAdminAddProductModal() {
      this.adminAddProductModalIsOpen = true
      this.backdropIsVisible = true
    },
    closeAdminAddProductModal() {
      this.adminAddProductModalIsOpen = false
      this.backdropIsVisible = false
    },
    openAdminAddBrandModal() {
      this.adminAddBrandModalIsOpen = true
      this.backdropIsVisible = true
    },
    closeAdminAddBrandModal() {
      this.adminAddBrandModalIsOpen = false
      this.backdropIsVisible = false
    },
    showBackdrop() {
      this.backdropIsVisible = true
    },
    hideBackdrop() {
      this.backdropIsVisible = false
    },
  },
})
