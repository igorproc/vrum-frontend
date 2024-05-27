<template>
  <div class="app-checkout-bill-payment">
    <div class="app-checkout-bill-payment__select">
      <div
        v-for="type in paymentTypes"
        :key="type.id"
        class="app-checkout-bill-payment__select-item select-item"
        :class="{ '--is-active': type.id === selectedOption }"
      >
        <div class="select-item__input-container">
          <input
            :id="type.id"
            type="radio"
            :checked="type.id === selectedOption"
            class="select-item__input-field"
            @click="selectOption(type.id)"
          >
          <label :for="type.id" class="select-item__input-label">
            {{ type.title }}
          </label>
        </div>

        <span v-if="type.id === selectedOption" class="select-item__description">
          {{ type.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const paymentTypes = [
  {
    id: useId(),
    title: 'Наложенный платеж',
    description: `заплатите нашему курьеру, когда будете забирать свой заказ.`,
  },
]

const selectedOption = ref(paymentTypes[0].id)

const selectOption = (id: string) => {
  selectedOption.value = id
}
</script>

<style lang="scss">
.app-checkout-bill-payment {
  &__select {
    display: flex;
    flex-direction: column;
    gap: 11rem;

    .select-item {
      &__input {
        &-container {
          display: flex;
          align-items: center;
          gap: 8rem;
          margin-bottom: 11rem;
        }

        &-label {
          font-family: $poppins-font-family;
          color: map-get($theme-colors, 'secondary-color');
          font-weight: 400;
        }
      }

      &__description {
        font-family: $poppins-font-family;
        color: map-get($theme-colors, 'secondary-color');
        font-weight: 400;
      }

      &.--is-active {
        .select-item__input-label {
          color: map-get($theme-colors, 'primary-color');
        }

        .select-item__input-field {
          accent-color: map-get($theme-colors, 'primary-color');
        }
      }
    }
  }
}
</style>
