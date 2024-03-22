<template>
  <div class="app-global-scope">
    <ClientOnly>
      <AppNotification />
    </ClientOnly>

    <AppNavigationDrawer />
    <AppAuthModal />
  </div>
</template>

<script setup lang="ts">
// Components
import AppNotification from '~/components/common/global/AppNotification.vue'
import AppNavigationDrawer from '~/components/common/layout/navigation/AppNavigationDrawer.vue'
import AppAuthModal from '~/components/auth/modal/AppAuthModal.vue'
</script>
