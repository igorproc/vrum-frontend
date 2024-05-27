<template>
  <form class="app-sign-in-form" @submit.prevent="submit">
    <div class="app-sign-in-form__fields-container">
      <ui-input
        tabindex="1"
        label="email"
        type="email"
        path="email"
        class="app-sign-in-form__field"
      />
      <ui-input
        tabindex="2"
        label="password"
        type="password"
        path="password"
        class="app-sign-in-form__field"
      />
    </div>

    <div class="app-sign-in-form__actions">
      <ui-button
        tabindex="4"
        label="есть аккаунт"
        variant="text"
        class="app-sign-in-form__actions-auth"
        @click.prevent="emit('change-form')"
      />
      <ui-button
        tabindex="3"
        type="submit"
        label="зарегестрироваться"
        variant="text"
        class="app-sign-in-form__actions-login"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
// Node Deps
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
// Pinia Actions
import { createUser } from '~/store/user/auth'

interface From {
  email: string,
  password: string,
  role: string
}

interface Emits {
  (name: 'form-compete'): void,
  (name: 'change-form'): void,
}

const emit = defineEmits<Emits>()
const validationSchema = object({
  email: string().email().required(),
  password: string().required(),
})

const form = useForm<From>({
  validationSchema,
  keepValuesOnUnmount: true,
  initialValues: {
    email: '',
    password: '',
    role: 'user',
  },
})

const submit = form.handleSubmit(async values => {
  const successRegister = await createUser(values)
  if (!successRegister) {
    form.resetForm()
    return
  }

  emit('form-compete')
})
</script>

<style lang="scss">
.app-sign-in-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rem;

  &__fields-container {
    width: 100%;
  }

  &__actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-auth, &-login {
      padding: 0;
    }
  }
}
</style>
