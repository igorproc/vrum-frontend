<template>
  <div class="app-main-banner-slide">
    <div class="app-main-banner-slide__wrapper">
      <img
        :src="image"
        :alt="title"
        class="app-main-banner-slide__image"
      >
      <div class="app-main-banner-slide__content">
        <h5 class="app-main-banner-slide__content-title">
          {{ title }}
        </h5>
        <span v-if="description" class="app-main-banner-slide__content-description">
          {{ description }}
        </span>

        <nuxt-link
          aria-label="slider-offer-action"
          class="app-main-banner-slide__content-action action"
          :to="link"
        >
          <span class="action__label">
            {{ actionTitle }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { NuxtLinkProps } from '#app/components/nuxt-link'

interface Props {
  title: string,
  description?: string,
  image: string,
  link: NuxtLinkProps['to'],
  actionTitle: string,
}

defineProps<Props>()
</script>

<style lang="scss">
.app-main-banner-slide {
  width: 100%;
  height: 400rem;

  &__wrapper {
    height: 100%;
    position: relative;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
  }

  &__content {
    max-width: 200rem;
    padding: 20rem 15rem;
    background-color: map-get($theme-colors, 'surface-color');
    position: absolute;
    top: 5%;
    right: 0;
    display: flex;
    flex-direction: column;
    border-radius: 0.375rem;

    &-title {
      font-family: $poppins-font-family;
      color: map-get($white-color-palette, 'white');
      font-size: 18rem;
      font-weight: bold;
    }

    &-description {
      font-family: $poppins-font-family;
      color: map-get($white-color-palette, 'white');
      font-size: 8rem;
      font-weight: bold;
    }

    &-action {
      padding: 3rem 5rem;
      max-width: 50%;
      background-color: map-get($gray-color-palette, 'gray-3');
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: flex-end;
      cursor: pointer;
      border: none;

      .action__label {
        font-family: $poppins-font-family;
        color: map-get($white-color-palette, 'white');
        font-size: 8rem;
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    height: 450rem;

    &__content {
      max-width: 30%;
      padding: 25rem 30rem;

      &-title {
        font-size: 18rem;
      }

      &-description {
        font-size: 14rem;
        font-weight: normal;
      }

      &-action {
        padding: 7rem 10rem;

        .action__label {
          font-size: 10rem;
        }
      }
    }
  }

  @media #{map-get($display-rules, 'xl')} {
    height: 717rem;

    &__content {
      padding: 62rem 43rem 20rem 39rem;
      max-width: unset;
      width: 650rem;
      height: auto;
      right: 60rem;

      &-title {
        font-size: 24rem;
      }

      &-description {
        margin-top: 10rem;
        font-size: 18rem;
        font-weight: bold;
      }

      &-action {
        margin-top: 17rem;
        padding: 20rem 70rem;

        .action__label {
          font-size: 16rem;
        }
      }
    }
  }
}
</style>
