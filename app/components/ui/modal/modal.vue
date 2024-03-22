<template>
  <transition v-if="open" name="modal-fade">
    <div class="ui-modal">
      <div class="ui-modal__backdrop" />
      <div
        ref="modal"
        v-bind="modalContainerAttributes"
        role="dialog"
        class="ui-modal__wrapper"
      >
        <div class="ui-modal__wrapper-content modal-content">
          <section v-if="!withoutHeader" class="modal-content__header">
            <slot name="header">
              <span>Modal</span>
            </slot>
            <button
              type="button"
              aria-label="Close modal"
              class="btn-close"
              @click="emit('update:open', false)"
            >
              <ui-icon name="common/close" />
            </button>
          </section>

          <section class="modal-content__body">
            <slot />
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Node Deps
import { onClickOutside } from '@vueuse/core'

interface Props {
  open: boolean,
  withoutHeader?: boolean,
  wrapClassName?: string,
  ariaLabel?: string,
  ariaDescription?: string,
}

interface Emits {
  (name: 'update:open', open: boolean): void,
}

const props = withDefaults(
  defineProps<Props>(),
  {
    withoutHeader: false,
  },
)
const emit = defineEmits<Emits>()

const modal = ref(null)

const modalContainerAttributes = computed(() => {
  const payload: any = {}

  if (props.ariaDescription) {
    payload['aria-describedby'] = props.ariaDescription
  }
  if (props.ariaLabel) {
    payload['aria-labelledby'] = props.ariaLabel
  }
  if (props.wrapClassName) {
    payload['class'] = props.wrapClassName
  }
  return payload
})

onMounted(() => {
  onClickOutside(modal, () => emit('update:open', false))
})
</script>

<style scoped lang="scss">
.ui-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &__backdrop {
    width: 100%;
    height: 100%;
    background-color: $backdrop-shadow;
  }

  &__wrapper {
    position: absolute;

    .modal-content {
      background-color: map-get($white-color-palette, 'white');
      padding: 20rem 24rem;

      &__header {
        padding-bottom: 15rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>
