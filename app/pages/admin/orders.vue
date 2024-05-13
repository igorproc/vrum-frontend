<template>
  <div class="app-admin-orders-page">
    Hello
    <h1>
      {{ data }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { getCheckoutPage } from '~/api/checkout/getPage'

const { data } = useAsyncData(
  'admin-orders',
  async () => await getCheckoutPage({ page: 1 }),
)
</script>
