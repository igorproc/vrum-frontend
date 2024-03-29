<template>
  <div class="app-global-scope">
    <ClientOnly>
      <CommonNotification />

      <div v-if="userStore.isAdmin" class="app-global-scope__admin">
        <AppAdminBrandAddModal />
        <AppAdminProductAddItemModal />
      </div>
    </ClientOnly>

    <ui-backdrop :show="conditionStore.backdropIsVisible" />
    <LayoutNavigationDrawer />
    <AppAuthModal />

  </div>
</template>

<script setup lang="ts">
const conditionStore = useConditionStore()
const userStore = useUserStore()
</script>
