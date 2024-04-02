<template>
  <div class="app-header-actions-list">
    <component
      v-for="item in actionsList"
      :key="item.id"
      :is="actionComponent(item.action)"
      :to="getRoute(item.action)"
      aria-label="user action"
      class="app-header-actions-list__item"
      @click="getAction(item.action)"
    >
      <UiIcon :name="item.icon" />
    </component>
  </div>
</template>

<script setup lang="ts">
// Components
import UiIcon from '~/components/ui/icon/icon.vue'
// Pinia Stores
import { useUserStore } from '~/store/user'
import { useConditionStore } from '~/store/condition'
// Types & Interfaces
import type { TUiIconNames } from '#build/types/ui-icon'
import type { NuxtLinkProps } from '#app/components/nuxt-link'

interface IListItemAction {
  isLink: boolean,
  action?: () => void | Promise<void>,
  link?: NuxtLinkProps['to']
}

type ActionsListItem = {
  id: number,
  icon: TUiIconNames,
  action: IListItemAction
}

const userStore = useUserStore()
const conditionStore = useConditionStore()

const userAction = computed<IListItemAction>(() => {
  if (userStore.isGuest) {
    return {
      isLink: false,
      action: conditionStore.openAuthModal
    }
  }

  return {
    isLink: false,
    action: conditionStore.openNavigationDrawer
  }
})

const actionsList: ActionsListItem[] = reactive([
  {
    id: 0,
    icon: 'user/user',
    action: userAction.value
  },
  {
    id: 1,
    icon: 'user/heart',
    action: {
      isLink: true,
      link: { name: 'user-wishlist' },
    },
  },
  {
    id: 2,
    icon: 'user/cart',
    action: {
      isLink: true,
      link: { name: 'user-cart' }
    },
  },
])

const actionComponent = computed(() => {
  return (actionData: IListItemAction) => {
    if (actionData.isLink) {
      return defineAsyncComponent(() => import('#app/components/nuxt-link'))
    }

    return 'button'
  }
})

const getRoute = (actionData: IListItemAction) => {
  if (!actionData.isLink || !actionData?.link) {
    return { name: 'index' }
  }

  return actionData.link
}
const getAction = (actionData: IListItemAction) => {
  if (actionData.isLink || !actionData?.action) {
    return () => {}
  }

  return actionData.action()
}
</script>

<style lang="scss">
.app-header-actions-list {
  display: flex;
  align-items: center;
  justify-content: space-around;

  &__item {
    border: none;

    .ui-icon {
      font-size: 20rem !important;
      color: map-get($white-color-palette, 'white');
    }
  }

  @media #{map-get($display-rules, 'lg')} {
    &__item .nuxt-icon {
      font-size: 24rem !important;
    }
  }
}
</style>
