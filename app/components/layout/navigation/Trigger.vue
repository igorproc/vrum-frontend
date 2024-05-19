<template>
  <div class="app-navigation-drawer-trigger">
    <button
      class="trigger__action"
      @click="conditionStore.openNavigationDrawer"
    >
      <ui-icon name="common/menu-horizontal" class="action__icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useConditionStore } from '~/store/condition'

const conditionStore = useConditionStore()
</script>

<style lang="scss">
.app-navigation-drawer-trigger {
  display: flex;
  align-items: center;

  .trigger__action {
    .action__icon {
      color: map-get($theme-colors, 'background-color');
      font-size: 18rem !important;
    }
  }
}
</style>
