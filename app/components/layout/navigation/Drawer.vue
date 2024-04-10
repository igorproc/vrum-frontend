<template>
  <ui-drawer
    v-model:open="conditionStore.navigationDrawerIsOpen"
    with-backdrop
    wrap-class-name="app-navigation-drawer"
  >
    <template #header>
      <h4>
        User
      </h4>
    </template>

    <div class="app-navigation-drawer__container drawer-container">
      <nuxt-link
        v-for="item in drawerLinksList"
        :key="item.key"
        :to="item.link"
        class="drawer-container__item"
      >
        <ui-icon :name="item.prependIcon" class="drawer-container__item-icon" />
        <h5 class="drawer-container__item-label">
          {{ item.label }}
        </h5>
      </nuxt-link>
      <button
        v-if="userStore.isGuest"
        class="drawer-container__item"
        @click="conditionStore.openAuthModal"
      >
        <ui-icon name="user/user" class="drawer-container__item-icon" />
        <h5 class="drawer-container__item-label">
          Login
        </h5>
      </button>

      <AppLogout
        v-if="!userStore.isGuest && userStore.userData"
        class="drawer-container__logout-action"
        @success-logout="conditionStore.closeNavigationDrawer"
      />
    </div>
  </ui-drawer>
</template>

<script setup lang="ts">
// Ui Components
import UiDrawer from '~/components/ui/drawer/drawer.vue'
// Components
import AppLogout from '~/components/auth/Logout.vue'
// Pinia Stores
import { useUserStore } from '~/store/user'
import { useConditionStore } from '~/store/condition'
// Types & Interfaces
import type { TNavigationDrawerLinkListItem } from '~/shared/types/global'

const userStore = useUserStore()
const conditionStore = useConditionStore()

const { navigationDrawerIsOpen } = storeToRefs(conditionStore)

const itemsIsDisabled = ref(false)

const defaultLinkList: TNavigationDrawerLinkListItem[] = [
  {
    key: 'all-cart',
    label: 'Cart',
    prependIcon: 'user/cart',
    disabled: itemsIsDisabled.value,
    link: { name: 'cart' },
  },
  {
    key: 'all-wishlist',
    label: 'Wishlist',
    prependIcon: 'user/heart',
    disabled: itemsIsDisabled.value,
    link: { name: 'user-wishlist' },
  },
]
const authorizeLinkList: TNavigationDrawerLinkListItem[] = [
  ...defaultLinkList,
  {
    key: 'user-orders',
    label: 'Orders',
    prependIcon: 'user/orders',
    disabled: itemsIsDisabled.value,
    link: { name: 'user-orders' },
  },
]
const adminLinkList: TNavigationDrawerLinkListItem[] = [
  {
    key: 'admin-brands-list',
    label: '(Admin) Brands',
    prependIcon: 'user/admin-settings',
    disabled: itemsIsDisabled.value,
    link: { name: 'admin-brands' },
  },
  {
    key: 'admin-products-list',
    label: '(Admin) Products',
    prependIcon: 'user/admin-settings',
    disabled: itemsIsDisabled.value,
    link: { name: 'admin-products' },
  },
]

const drawerLinksList = computed(() => {
  if (userStore.isGuest || !userStore.userData) {
    return defaultLinkList
  }

  if (userStore.isAdmin) {
    return [...authorizeLinkList, ...adminLinkList]
  }

  return authorizeLinkList
})

watch(navigationDrawerIsOpen, newVal => {
  if (newVal) {
    return
  }

  if (!conditionStore.authModalIsOpen) {
    conditionStore.hideBackdrop()
  }
})
</script>

<style lang="scss">
.app-navigation-drawer {
  .ui-drawer__header-close-action {
    display: none;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 16rem;

    .drawer-container__item {
      display: flex;
      align-items: center;
      gap: 8rem;
      color: map-get($theme-colors, 'primary-color');
      text-decoration: unset;

      &-icon {
        font-size: 18rem !important;
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    .ui-drawer__header-close-action {
      display: block;
    }
  }
}
</style>
