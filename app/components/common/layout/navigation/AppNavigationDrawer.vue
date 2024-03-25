<template>
  <ui-drawer
    v-model:open="conditionStore.navigationDrawerIsOpen"
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

      <AppLogout
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
import AppLogout from '~/components/auth/AppLogout.vue'
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
    link: { name: 'user-cart' },
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
    key: 'admin-product-add',
    label: 'Admin Zone',
    prependIcon: 'user/admin-settings',
    disabled: itemsIsDisabled.value,
    link: { name: 'index' },
  },
]

const drawerLinksList = computed(() => {
  if (userStore.isGuest || !userStore.userData) {
    return defaultLinkList
  }

  if (userStore.userData.role === 'ADMIN') {
    return [...authorizeLinkList, ...adminLinkList]
  }

  return authorizeLinkList
})

watch(navigationDrawerIsOpen, newVal => {
  if (newVal) {
    return
  }

  conditionStore.hideBackdrop()
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
