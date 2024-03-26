<template>
  <div class="app-global-scope">
    <ClientOnly>
      <CommonNotification />
    </ClientOnly>

    <ui-backdrop :show="conditionStore.backdropIsVisible" />
    <LayoutNavigationDrawer />
    <AppAuthModal />
  </div>
</template>

<script setup lang="ts">
const conditionStore = useConditionStore()
</script>
