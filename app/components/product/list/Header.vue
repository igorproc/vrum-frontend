<template>
  <div class="app-product-list-filters product-filters">
    <div class="product-filters__content filters-content">
      <span class="filters-content__count-info">
        {{ productShowsText }}
      </span>
    </div>

    <div class="product-filters__actions filters__actions">
      <div class="filters__actions-show show-action">
        <label
          :for="changeSizeId"
          class="show-action__label"
        >
          Показать
        </label>
        <input
          :id="changeSizeId"
          :value="pageSize"
          type="number"
          class="showcase-action__input"
          @input="throttleChangePageSize"
        >
      </div>

      <div class="filters__actions-sort sort-action">
        <label :for="changeSortId" class="sort-action__label">
          отсортировать
        </label>

        <ui-menu :id="changeSortId" :open="changeSortMenuIsOpen" class="sort-action__menu">
          <template #activator>
            <ui-button
              variant="text"
              :label="labelForChangeSort"
              class="sort-action__menu-activator"
              @click="changeSortMenuIsOpen = true"
            />
          </template>

          <div class="sort-action__menu-items-container menu-container">
            <ui-button
              v-for="item in changeSortItems"
              :key="item.id"
              :label="item.label"
              variant="text"
              class="menu-container__item"
              @click="changeSort(item.value)"
            />
          </div>
        </ui-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { useDebounceFn } from '@vueuse/core'
// Utils
import { generateRandomId } from '~/utils/generate.util'

interface Props {
  totalProducts: number,
  currentPage: number,
  pageSize: number,
  sortBy?: string,
}

interface Emits {
  (name: 'pageSizeUpdated', pageSize: number ): void,
  (name: 'pageSortUpdated', pageSort: string): void,
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { totalProducts, sortBy } = toRefs(props)

const changeSizeId = useId()
const changeSortId = useId()
const changeSortMenuIsOpen = ref(false)

const changeSortItems = [
  {
    id: generateRandomId(),
    label: 'убыванию',
    value: 'asc',
  },
  {
    id: generateRandomId(),
    label: 'возрастанию',
    value: 'desc',
  },
]

const productShowsText = computed(() => {
  let startShowsProducts = 1
  let endShowsProducts = props.currentPage * props.pageSize

  if (props.currentPage > 1) {
    startShowsProducts = props.currentPage * props.pageSize
    endShowsProducts = (props.currentPage + 1) * props.pageSize
  }

  if (startShowsProducts > totalProducts.value) {
    startShowsProducts = totalProducts.value
  }
  if (endShowsProducts > totalProducts.value) {
    endShowsProducts = totalProducts.value
  }

  return `Показано ${startShowsProducts}–${endShowsProducts} из ${totalProducts.value} результатов`
})

const labelForChangeSort = computed(() => {
  const foundAttribute  = changeSortItems.find(item => item.value === sortBy.value)
  if (!foundAttribute) {
    return 'default'
  }

  return foundAttribute.label
})

const changePageSize = (e: Event) => {
  if (!e.target) {
    return
  }

  const target = e.target as HTMLInputElement
  emit('pageSizeUpdated', Number(target?.value) || 16)
}

const changeSort = (value: string) => {
  changeSortMenuIsOpen.value = false

  emit('pageSortUpdated', value)
}

const throttleChangePageSize = useDebounceFn((e: Event) => {
  changePageSize(e)
}, 300)
</script>

<style lang="scss">
.app-product-list-filters {
  padding: 10rem 15rem;
  background-color: map-get($theme-colors, 'surface-color');
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10rem;

  .product-filters__content {
    .filters-content__count-info {
      color: map-get($white-color-palette, 'white');
    }
  }

  .product-filters__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rem;

    .filters__actions-show {
      .show-action__label {
        color: map-get($white-color-palette, 'white');
        font-size: 20rem;
      }

      .showcase-action__input {
        margin-left: 7rem;
        padding: 12rem 13rem;
        width: 50rem;
        background-color: map-get($theme-colors, 'background-color');
        font-size: 20rem;

        &:active {
          border: none;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }

    .filters__actions-sort {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8rem;

      & .sort-action {
        &__label {
          color: map-get($white-color-palette, 'white');
          font-size: 20rem;
        }

        &__menu-activator {
          padding: 0;

          .button-content__label {
            font-size: 20rem;
            font-weight: 400;
            color: map-get($white-color-palette, 'white');
          }
        }

        &__menu-items-container .menu-container__item {

          .button-content__label {
            color: map-get($white-color-palette, 'white');
          }
        }
      }

      .sort-action__menu-activator {


        .sort-action__menu-items-container .button-content__label {
          color: map-get($white-color-palette, 'white');
          font-size: 20rem;
          font-weight: normal;
        }
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    align-items: center;
    flex-direction: row;

    .product-filters__actions {
      gap: 16rem;
    }
  }

  @media #{map-get($display-rules, 'xl')} {
    padding: 35rem 65rem;
  }
}
</style>
