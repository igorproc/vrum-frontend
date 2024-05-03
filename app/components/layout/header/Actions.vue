<template>
  <div class="app-header-actions-list">
    <component
      :is="actionComponent(item.action)"
      v-for="item in actionsList"
      :key="item.id"
      :to="getRoute(item.action)"
      aria-label="user action"
      class="app-header-actions-list__item"
      @click="getAction(item.action)"
    >
      <ui-icon :name="item.icon" />
    </component>
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
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

const conditionStore = useConditionStore()

const actionsList: ActionsListItem[] = reactive([
  {
    id: 0,
    icon: 'user/user',
    action: {
      isLink: false,
      action: conditionStore.openNavigationDrawer,
    },
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
      link: { name: 'cart' },
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
