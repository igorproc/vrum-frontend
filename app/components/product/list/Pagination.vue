<template>
  <div class="app-product-list-pagination">
    <ui-pagination
      v-model:current-page="localCurrentPage"
      :total-pages="totalPages"
      :disabled="isDisabled"
      prev-page-action
      next-page-action
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isDisabled: boolean,
  totalPages: number,
  currentPage: number,
}

interface Emits {
  (name: 'updateCurrentPage', pageNumber: number): void
}

const props = defineProps<Props>()
const { totalPages } = toRefs(props)
const emit = defineEmits<Emits>()
const localCurrentPage = ref(props.currentPage)

watch(localCurrentPage, newVal => {
  emit('updateCurrentPage', newVal)
})
</script>
