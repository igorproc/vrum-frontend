<template>
  <ui-modal
    with-backdrop
    v-model:open="conditionStore.authModalIsOpen"
    wrap-class-name="app-auth-modal"
  >
    <template #header>
      <h4>
        Authorization
      </h4>
    </template>

    <div class="app-auth-modal__form">
      <AppAuthFormRegister
        v-if="isRegisterForm"
        @change-form="changeForm"
        @form-compete="successForm"
      />
      <AppAuthFormLogin
        v-else
        @change-form="changeForm"
        @form-compete="successForm"
      />
    </div>
  </ui-modal>
</template>

<script setup lang="ts">
const conditionStore = useConditionStore()
const isRegisterForm = ref(false)

const changeForm = () => {
  isRegisterForm.value = !isRegisterForm.value
}
const successForm = () => {
  conditionStore.closeAuthModal()
}
</script>
