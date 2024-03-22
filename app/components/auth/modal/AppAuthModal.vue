<template>
  <ui-modal
    v-model:open="conditionStore.authModalIsOpen"
    wrap-class-name="app-auth-modal"
  >
    <template #header>
      <h4>
        Authorization
      </h4>
    </template>

    <div class="app-auth-modal__form">
      <AppSignUpForm
        v-if="isRegisterForm"
        @change-form="changeForm"
        @form-compete="successForm"
      />
      <AppSignInform
        v-else
        @change-form="changeForm"
        @form-compete="successForm"
      />
    </div>
  </ui-modal>
</template>

<script setup lang="ts">
// Components
import AppSignUpForm from '~/components/auth/form/AppSignUpForm.vue'
import AppSignInform from '~/components/auth/form/AppSignInForm.vue'
// Pinia Stores
import { useConditionStore } from '~/store/condition'

const conditionStore = useConditionStore()

const isRegisterForm = ref(false)

const changeForm = () => {
  isRegisterForm.value = !isRegisterForm.value
}
const successForm = () => {
  conditionStore.closeAuthModal()
}
</script>

<style lang="scss">
.app-auth-modal {
  width: 85vw;

  .modal-content__header .ui-icon {
    font-size: 24rem !important;
  }

  @media #{map-get($display-rules, 'md')} {
    width: 70vw;
  }

  @media #{map-get($display-rules, 'lg')} {
    width: 40vw;
  }

  @media #{map-get($display-rules, 'xl')} {
    width: 25vw;
  }
}
</style>
