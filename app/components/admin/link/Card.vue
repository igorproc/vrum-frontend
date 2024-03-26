<template>
  <div class="app-admin-link-card">
    <span class="app-admin-link-card__title">
      {{ title }}
    </span>

    <ui-button
      variant="text"
      :link="link"
      :label="linkLabel"
      class="app-admin-link-card__link"
    />
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { NuxtLinkProps } from '#app/components/nuxt-link'

interface Props {
  title: string,
  description?: string,
  link: NuxtLinkProps['to'],
  linkLabel: string,
}

defineProps<Props>()
</script>

<style lang="scss">
.app-admin-link-card {
  padding: 8rem 16rem;
  background-color: map-get($theme-colors, 'surface-color');
  border-radius: 8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &__title {
    font-size: 20rem;
    color: map-get($white-color-palette, 'white');
  }

  &__link {
    padding: 0;

    .button-content__label {
      font-weight: normal;
      color: map-get($white-color-palette, 'white');
    }
  }
}
</style>
