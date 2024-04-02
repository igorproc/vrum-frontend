<template>
  <div class="app-admin-page">
    <AppAdminLinkList class="app-admin-page__link-list" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  isAdminPage: true,
})
</script>
