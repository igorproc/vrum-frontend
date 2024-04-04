<template>
  <div class="ui-drawer" :class="{ '--is-open': open }" @click="close">
    <div ref="" v-bind="drawerContainerAttributes" class="ui-drawer__wrapper">
      <div v-if="!withoutHeader" class="ui-drawer__header">
        <slot name="header">
          <h4>Drawer</h4>
        </slot>

        <button
          class="ui-drawer__header-close-action"
          @click="close"
        >
          <ui-icon name="common/close" />
        </button>
      </div>

      <div class="ui-drawer__content">
        <slot />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
interface Props {
  open: boolean,
  withoutHeader?: boolean,
  wrapClassName?: string,
  ariaLabel?: string,
  ariaDescription?: string,
}

interface Emits {
  (name: 'update:open', open: boolean): void
}

const props = withDefaults(
  defineProps<Props>(),
  {
    withoutHeader: false,
  }
)
const emit = defineEmits<Emits>()

const drawerContainerAttributes = computed(() => {
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

const close = () => {
  emit('update:open', false)
}
</script>

<style lang="scss">
.ui-drawer {
  z-index: 11;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);

  &.--is-open {
    transform: translateX(0);
  }

  &__wrapper {
    padding: 20rem 24rem;
    position: absolute;
    top: 0;
    right: 0;
    width: 330rem;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;

    .ui-drawer__header {
      padding-bottom: 15rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ui-drawer__header-close-action .ui-icon {
        font-size: 24rem !important;
      }
    }
  }
}
</style>
