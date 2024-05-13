<template>
  <div class="app-base-cart-tile --base">
    <AppCartItemPreview
      :name="item.product.name"
      :image-url="item.product.productImage"
      class="app-base-cart-tile__preview"
    />
    <AppCartItemPrice :price="item.product.price" class="app-base-cart-tile__price" />
    <AppCartItemQtyInput v-model:qty="item.qty" class="app-base-cart-tile__info" />
    <AppCartItemTotalPrice
      :product-price="item.product.price"
      :quantity="productIsAddedToCart ? productIsAddedToCart.qty : 1"
      class="app-base-cart-tile__info"
    />
    <div class="app-base-cart-tile__actions">
      <ui-button
        :disabled="operationWithCartIsProcessing"
        variant="text"
        prepend-icon="user/trash"
        class="app-base-cart-tile__actions-delete"
        @click="removeProductFormCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Utils
// Types & Interfaces
import type { TCartProduct } from '~/api/cart/getProducts'

interface Emits {
  (name: 'productRemove', id: number): void,
  (name: 'qtyUpdate', data: { id: number, qty: number }): void,
}

interface Props {
  item: TCartProduct
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const item = ref(props.item)
const { qty } = toRefs(item.value)

const {
  productIsAddedToCart,
  operationWithCartIsProcessing,
  removeFromCart,
  changeProductCartQty,
} = useProduct(item.value.product)

const removeProductFormCart = async () => {
  await removeFromCart()
  emit('productRemove', item.value.product.id)
}

watch(qty, async newVal => await changeProductCartQty(newVal))
</script>

<style lang="scss">
.app-base-cart-tile {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8rem;

  &__preview {
    margin-top: 24rem;
    flex: 0 0 calc(75% - 8rem);
  }

  &__price {
    margin-top: 24rem;
    flex: 0 0 calc(25% - 8rem);
  }

  &__info {
    flex: 0 0 calc(50% - 8rem);
  }

  &__actions {
    position: absolute;
    top: 0;
    right: 0;

    &-delete {
      .ui-icon {
        font-size: 24rem !important;
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    &__preview {
      margin-top: 0;
      flex: 0 0 calc(25% - 8rem);
    }

    &__price {
      margin-top: 0;
    }

    &__info {
      flex: 0 0 calc(25% - 24rem);
    }

    &__actions {
      top: unset;
    }
  }
}
</style>
