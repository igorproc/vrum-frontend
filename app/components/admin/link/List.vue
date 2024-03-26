<template>
  <div class="app-admin-link-list">
    <AppAdminLinkCard
      v-for="item in links"
      :key="item.id"
      :title="item.label"
      :link="item.link"
      :link-label="item.linkLabel"
    />
  </div>
</template>

<script setup lang="ts">
// Utils
import { generateRandomId } from '~/utils/generate.util'

const links = [
  {
    id: generateRandomId(),
    label: 'Products',
    link: { name: 'admin-products' },
    linkLabel: 'go',
  },
  {
    id: generateRandomId(),
    label: 'Brands',
    link: { name: 'admin-brands' },
    linkLabel: 'go',
  },
]
</script>

<style lang="scss">
.app-admin-link-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rem;

  @media #{map-get($display-rules, 'md')} {
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
