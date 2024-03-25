<template>
  <ui-button
    :disabled="isLoading"
    label="logout"
    variant="outlined"
    class="app-user-logout"
    @click="onUserLogout"
  />
</template>

<script setup lang="ts">
// Pinia Methods
import { logoutUser } from '~/store/user/auth'

interface Emits {
  (name: 'success-logout'): void
}

const emit = defineEmits<Emits>()
const isLoading = ref(false)
const onUserLogout = async () => {
  isLoading.value = true
  await logoutUser()
  emit('success-logout')
  isLoading.value = false
}
</script>

<style lang="scss">
.app-user-logout {
  justify-content: center;
}
</style>
