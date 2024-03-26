<template>
  <div class="app-header-link-list">
    <nuxt-link
      v-for="item in linkList"
      :key="item.id"
      :to="item.link"
      class="app-header-link-list__item"
    >
      {{ item.label }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const linkList = [
  {
    id: 0,
    label: 'Home',
    link: { name: 'index' },
  },
  {
    id: 1,
    label: 'Shop',
    link: { name: 'products' },
  },
  {
    id: 2,
    label: 'About',
    link: { name: 'index' },
  },
  {
    id: 3,
    label: 'Contact',
    link: { name: 'index' },
  }
]
</script>

<style lang="scss">
.app-header-link-list {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__item {
    font-size: 16rem;
    text-decoration: unset;
    font-weight: bold;
    color: map-get($white-color-palette, 'white')
  }

  @media #{map-get($display-rules, 'xl')} {
    &__item {
      font-size: 18rem;
    }
  }
}
</style>
