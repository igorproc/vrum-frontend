<template>
  <form class="app-checkout-form">
    <h4 class="app-checkout-form__title">
      Детали счета
    </h4>

    <div class="app-checkout-form__fileds-container">
      <div class="app-checkout-form__fileds-name-container">
        <ui-input
          tabindex="1"
          path="name"
          label="Имя"
          required
          class="app-checkout-form__field"
        />
        <ui-input
          tabindex="2"
          path="surname"
          label="Фамилия"
          required
          class="app-checkout-form__field"
        />
      </div>
      <ui-dropdown
        tabindex="3"
        :options="countriesList"
        path="country"
        label="Страна"
        class="app-checkout-form__field"
      />
      <ui-input
        tabindex="4"
        required
        path="city"
        label="Город"
        class="app-checkout-form__field"
      />
      <ui-input
        tabindex="5"
        required
        path="address"
        label="Адресс"
        class="app-checkout-form__field"
      />
      <ui-input
        tabindex="6"
        type="email"
        required
        path="email"
        label="Email"
        class="app-checkout-form__field"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
// Node Deps
import { object, string } from 'yup'
// Types & Interfaces
import type { TUiDropdownOption } from '~/components/ui/dropdown/dropdown.vue'

interface Form {
  name: string,
  surname: string,
  country: string,
  city: string,
  address: string,
  email: string,
}

const validationSchema = object({
  name: string().required(),
  surname: string().required(),
  country: string().required(),
  city: string().required(),
  address: string().required(),
  email: string().email().required(),
})

const form = useForm<Form>({ validationSchema })

const countriesList: TUiDropdownOption[] = [
  {
    label: 'Россия',
    value: 'ru_RU',
  },
  {
    label: 'Беларусь',
    value: 'ru_BE',
  },
  {
    label: 'Казахстан',
    value: 'ru_KZ',
  },
]

const submitFields = form.handleSubmit(values => values)

const resetForm = () => {
  form.resetForm()
}

defineExpose({
  submitFields,
  resetForm,
})
</script>

<style lang="scss">
.app-checkout-form {
  &__title {
    color: map-get($theme-colors, 'primary-color');
    font-family: $poppins-font-family;
    font-size: 32rem;
    font-weight: 600;
  }

  &__fileds {
    &-container {
      margin-top: 16rem;
    }

    &-name-container {
      display: flex;
      align-items: center;
      gap: 8rem;

      .app-checkout-form__field {
        width: 50%;
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    &__fields {
      &-container {
        margin-top: 36rem;
      }

      &-name-container {
        gap: 8rem;
      }
    }
  }

  @media #{map-get($display-rules, 'lg')} {
    padding: 80rem 35rem;
  }
}
</style>
