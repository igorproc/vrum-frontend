<template>
  <div class="app-header-actions-list actions-list">
    <button
      class="actions-list__item"
      aria-label="user action"
      v-for="item in actionsList"
      :key="item.id"
      @click="getItemAction(item.action)"
    >
      <UiIcon :name="item.icon" />
    </button>
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

interface IListItemAction {
  isLink: boolean,
  action?: () => void | Promise<void>,
  link?: string
}

type ActionsListItem = {
  id: number,
  icon: TUiIconNames,
  action: IListItemAction
}

const router = useRouter()

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
    action: userAction
  },
  {
    id: 1,
    icon: 'user/heart',
    action: {
      isLink: true,
      link: 'user/wishlist',
    },
  },
  {
    id: 2,
    icon: 'user/cart',
    action: {
      isLink: false,
      action: () => console.log('Cart Modal'),
    },
  },
])

const getItemAction = async (actionData: IListItemAction) => {
  if (!actionData.isLink && actionData.action) {
    return actionData.action()
  }
  if (actionData.isLink && actionData.link) {
    return await router.push(actionData.link)
  }
}
</script>

<style lang="scss">
.app-header-actions-list {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .actions-list__item {
    border: none;

    .nuxt-icon {
      font-size: 20rem !important;
    }
  }

  @media #{map-get($display-rules, 'lg')} {
    .actions-list__item .nuxt-icon {
      font-size: 24rem !important;
    }
  }
}
</style>
