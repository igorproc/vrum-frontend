<template>
  <transition v-if="open" name="modal-fade">
    <div class="ui-modal">
      <div
        ref="modal"
        v-bind="modalContainerAttributes"
        role="dialog"
        class="ui-modal__wrapper"
      >
        <div class="ui-modal__wrapper-content modal-content">
          <section v-if="!withoutHeader" class="modal-content__header">
            <slot name="header">
              <h5>Modal</h5>
            </slot>
            <button
              type="button"
              aria-label="Close modal"
              class="modal-content__header-close"
              @click="close"
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
  onClose?: () => void | Promise<void>
}
interface Emits {
  (name: 'update:open', open: boolean): void,
  (name: 'close'): void,
}

const props = withDefaults(
  defineProps<Props>(),
  {
    withoutHeader: false,
  },
)
const { onClose } = toRefs(props)
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

const close = async () => {
  emit('update:open', false)
  emit('close')

  if (onClose.value) {
    await onClose.value()
  }
}

onMounted(() => {
  onClickOutside(modal, async () => await close())
})
</script>

<style scoped lang="scss">
.ui-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;

  &__wrapper {
    width: 85vw;
    position: absolute;

    .modal-content {
      background-color: map-get($white-color-palette, 'white');
      padding: 20rem 24rem;

      &__header {
        padding-bottom: 15rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-close .ui-icon {
          font-size: 24rem !important;
        }
      }
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
}
</style>
