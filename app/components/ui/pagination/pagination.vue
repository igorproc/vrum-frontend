<template>
  <div class="ui-pagination">
    <button
      v-if="prevPageAction"
      :class="{ '--is-disabled': (currentPage === 1) || disabled }"
      aria-label="Route to next page"
      class="ui-pagination__item item --prev-page"
      @click="prevPage"
    >
      <span class="item__label">
        prev
      </span>
    </button>

    <div v-if="withItems" class="ui-pagination__list">
      <button
        v-for="item in paginationItems"
        :key="item?.id || generateRandomId()"
        :class="{ '--is-active': item.value === currentPage, '--is-disabled': disabled }"
        aria-label="Route to selected page"
        class="ui-pagination__item item"
        @click="selectPage(item.value)"
      >
        <span class="item__label">
          {{ item.text }}
        </span>
      </button>
    </div>

    <button
      v-if="nextPageAction"
      :class="{ '--is-disabled': (currentPage === totalPages) || disabled }"
      aria-label="Route to next page"
      class="ui-pagination__item item --next-page"
      @click="nextPage"
    >
      <span class="item__label">
        next
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { IPaginationItem } from '~/utils/getTotalPages.util'
// Util
import { generateRandomId } from '~/utils/generate.util'

interface Props {
  items?: IPaginationItem[],
  disabled?: boolean,
  totalPages: number,
  currentPage: number,
  withItems?: boolean,
  prevPageAction?: boolean,
  nextPageAction?: boolean,
}

interface Emits {
  (name: 'update:currentPage', currentPage: number): void,
}

const props = withDefaults(
  defineProps<Props>(),
  {
    disabled: false,
    withItems: false,
    prevPageAction: false,
    nextPageAction: false,
  },
)
const emit = defineEmits<Emits>()

const paginationItems = computed(() => {
  if (props.items) {
    return props.items
  }

  return []
})
const selectPage = (value: number) => {
  if (props.currentPage === value || props.disabled) {
    return
  }

  emit('update:currentPage', value)
}
const nextPage = () => {
  if (props.currentPage >= props.totalPages || props.disabled) {
    return
  }

  emit('update:currentPage', props.currentPage + 1)
}
const prevPage = () => {
  if (props.currentPage === 1 || props.disabled) {
    return
  }

  emit('update:currentPage', props.currentPage - 1)
}
</script>

<style lang="scss">
.ui-pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 8rem;

  &__item {
    padding: 15rem 22rem;
    border-radius: 10rem;
    background-color: map-get($theme-colors, 'surface-color');

    .item__label {
      color: map-get($white-color-palette, 'white');
    }

    &.--is-active {
      background-color: map-get($theme-colors, 'accent-color');
    }

    &.--is-disabled {
      cursor: default;
      opacity: 0.6;
    }
  }

  @media #{map-get($display-rules, 'xl')} {
    gap: 38rem;
  }
}
</style>
