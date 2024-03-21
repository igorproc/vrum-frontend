<template>
  <div class="app-global-scope">
    <ClientOnly>
      <AppNotification />
      <AppNavigationDrawer />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Components
import AppNotification from '~/components/common/global/AppNotification.vue'
import AppNavigationDrawer from '~/components/common/layout/navigation/AppNavigationDrawer.vue'
</script>
