<template>
  <Flicking
    hide-before-init
    :options="{ circular: true }"
    :plugins="flickingPlugins"
    class="app-main-offers-slider offers-slider"
  >
    <div
      v-for="slide in items"
      :key="slide.id"
      class="offers-slider__item item"
    >
      <div class="item__wrapper">
        <img
          v-if="slide?.image"
          :src="slide.image"
          :alt="slide.title"
          class="item__image"
        >
        <div class="item__content">
          <h5 class="item__content-title">
            {{ slide.title }}
          </h5>
          <span v-if="slide.description" class="item__content-description">
          {{ slide.description }}
        </span>

          <button
            aria-label="slider-offer-action"
            class="item__content-action action"
            @click="getAction(slide.action)"
          >
          <span class="action__label">
            {{ slide.action.actionTitle }}
          </span>
          </button>
        </div>
      </div>
    </div>
  </Flicking>
</template>

<script setup lang="ts">
// Node Deps
import { AutoPlay } from '@egjs/flicking-plugins'
// Types & Interfaces
import type { NuxtLinkProps } from '#app/components/nuxt-link'

interface IOfferItemAction {
  actionTitle: string,
  isLink: boolean,
  link?: NuxtLinkProps['to'],
  action?: () => Promise<void> | void
}

type TOfferItem = {
  id: number,
  title: string,
  subtitle?: string,
  description?: string,
  image: string,
  action: IOfferItemAction,
}

const items: TOfferItem[] = [
  {
    id: 1,
    title: 'Original winter wheel assembly',
    description: 'safe on the road in the cold season. Buy winter wheel assemblies at favourable prices right now.',
    image: 'offers/slider-1.jpg',
    action: {
      actionTitle: 'buy now',
      isLink: true,
      link: { name: 'products', query: { page: 1, size: 12, brand: 1 } },
    },
  },
  {
    id: 2,
    title: 'Original autumn wheel',
    description: 'drive on wet roads with complete confidence. Buy autumn wheel assemblies at favourable prices right now.',
    image: 'offers/slider-2.jpg',
    action: {
      actionTitle: 'buy now',
      isLink: true,
      link: { name: 'products', query: { page: 1, size: 12, brand: 3 } },
    },
  },
]

const router = useRouter()
const flickingPlugins = [
  new AutoPlay({ duration: 5000 }),
]

const getAction = async (actionData: IOfferItemAction) => {
  if (actionData.isLink && actionData.link) {
    return await router.push(actionData.link)
  }

  if ('action' in actionData) {
    return actionData.action
  }

  return () => {
  }
}
</script>

<style lang="scss">
.app-main-offers-slider {
  .offers-slider__item {
    width: 100%;
    height: 400rem;

    .item__wrapper {
      height: 100%;
      position: relative;
    }

    .item__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      user-select: none;
    }

    .item__content {
      max-width: 200rem;
      padding: 20rem 15rem;
      background-color: map-get($theme-colors, 'surface-color');
      position: absolute;
      top: 5%;
      right: 0;
      display: flex;
      flex-direction: column;
      border-radius: 0.375rem;

      .item__content-title {
        font-family: $poppins-font-family;
        color: map-get($white-color-palette, 'white');
        font-size: 18rem;
        font-weight: bold;
      }

      .item__content-description {
        font-family: $poppins-font-family;
        color: map-get($white-color-palette, 'white');
        font-size: 8rem;
        font-weight: bold;
      }

      .item__content-action {
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

      .item__content {
        max-width: 30%;
        padding: 25rem 30rem;

        .item__content-title {
          font-size: 18rem;
        }

        .item__content-description {
          font-size: 14rem;
          font-weight: normal;
        }

        .item__content-action {
          padding: 7rem 10rem;

          .action__label {
            font-size: 10rem;
          }
        }
      }
    }

    @media #{map-get($display-rules, 'xl')} {
      height: 717rem;

      .item__content {
        padding: 62rem 43rem 20rem 39rem;
        max-width: unset;
        width: 650rem;
        height: auto;
        right: 60rem;

        .item__content-title {
          font-size: 24rem;
        }

        .item__content-description {
          margin-top: 10rem;
          font-size: 18rem;
          font-weight: bold;
        }

        .item__content-action {
          margin-top: 17rem;
          padding: 20rem 70rem;

          .action__label {
            font-size: 16rem;
          }
        }
      }
    }
  }
}
</style>
