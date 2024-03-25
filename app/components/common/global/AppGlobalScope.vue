<template>
  <div class="app-global-scope">
    <ClientOnly>
      <AppNotification />
    </ClientOnly>

    <ui-backdrop :show="conditionStore.backdropIsVisible" />
    <AppNavigationDrawer />
    <AppAuthModal />
  </div>
</template>

<script setup lang="ts">
// Components
import AppNotification from '~/components/common/global/AppNotification.vue'
import AppNavigationDrawer from '~/components/common/layout/navigation/AppNavigationDrawer.vue'
import AppAuthModal from '~/components/auth/modal/AppAuthModal.vue'
// Pinia Stores
import { useConditionStore } from '~/store/condition'

const conditionStore = useConditionStore()
</script>
