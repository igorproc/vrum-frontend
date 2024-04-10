<template>
  <header class="app-header">
    <LayoutLogo class="app-header__logo" />

    <div v-if="isTablet" class="app-header__navigation-trigger">
      <LayoutNavigationTrigger />
    </div>

    <div v-else class="app-header__content content">
      <LayoutHeaderActions class="content__actions-list" />
    </div>
  </header>
</template>

<script setup lang="ts">
// Constants
import { DEFAULT_BREAKPOINT_SIZES } from '~/shared/const/breakpoints'

const { width } = useSSRWindowSize()
const isTablet = computed(() => width.value <= DEFAULT_BREAKPOINT_SIZES.lg)
</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rem 15rem;
  background-color: map-get($theme-colors, 'primary-color');

  &__logo .app-logo__text {
    color: map-get($white-color-palette, 'white');
  }

  @media #{map-get($display-rules, 'lg')} {
    padding: 25rem 65rem;

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .content__actions-list {
        width: 150rem;
      }
    }
  }

  @media #{map-get($display-rules, 'xxl')} {
    padding: 40rem 140rem;
  }
}
</style>
