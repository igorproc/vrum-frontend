<template>
  <div class="app-cart-item-quantity-input">
    <label
      :for="inputId"
      class="app-cart-item-quantity-input__label"
    >
      Product Qty:
    </label>
    <input
      :value="qty"
      class="app-cart-item-quantity-input__field"
      @input="throttleChangeQuantity"
    />
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { useDebounceFn } from '@vueuse/core'

interface Emits {
  (name: 'update:qty', qty: number): void,
}

interface Props {
  qty: number,
}

const inputId = useId()

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { qty } = toRefs(props)

const changeQuantity = (e: Event) => {
  if (!e.target) {
    return
  }

  const target = e.target as HTMLInputElement
  emit('update:qty', Number(target.value))
}

const throttleChangeQuantity = useDebounceFn((e: Event) => changeQuantity(e), 300)
</script>

<style lang="scss">
.app-cart-item-quantity-input {
  &__label {
    font-size: 20rem;
    font-weight: bold;
  }

  &__field {
    padding: 8rem 12rem;
    border: 1rem solid map-get($theme-colors, 'primary-color');
    border-radius: 8rem;
    max-width: 65rem;
    font-size: 16rem;
  }

  @media #{map-get($display-rules, 'md')} {
    &__label {
      display: none;
    }

    &__field {
      max-width: 36rem;
    }
  }
}
</style>
