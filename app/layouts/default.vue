<template>
  <div class="app-default-layout">
    <LayoutHeader />
    <div class="app-default-layout__main">
      <slot />
    </div>
    <LayoutFooter />

    <CommonScope />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.app-default-layout {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: map-get($theme-colors, 'background-colors');

  &__main {
    padding: 10rem 15rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    &__main {
      padding: 25rem 65rem;
    }
  }

  @media #{map-get($display-rules, 'xxl')} {
    &__main {
      min-height: 75vh;
      padding: 40rem 140rem;
    }
  }
}
</style>
