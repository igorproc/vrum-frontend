<template>
  <div class="app-configurable-cart-tile --configurable">
    <AppCartItemPreview
      :name="item.product.name"
      :image-url="item.product.productImage"
      class="app-configurable-cart-tile__info"
    />
    <div class="app-configurable-cart-tile__info">
      <span>
        {{ productPrice }}
      </span>
    </div>
    <AppCartItemQtyInput v-model:qty="item.qty" class="app-configurable-cart-tile__info" />
    <AppCartItemTotalPrice
      :product-price="item.product.price"
      :quantity="productIsAddedToCart ? productIsAddedToCart.qty : 1"
      class="app-configurable-cart-tile__info"
    />
    <div class="app-configurable-cart-tile__actions">
      <ui-button
        :disabled="operationWithCartIsProcessing"
        variant="text"
        prepend-icon="user/trash"
        class="app-configurable-cart-tile__actions-delete"
        @click="removeProductFormCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TCartProduct } from '~/api/cart/getProducts'

interface Emits {
  (name: 'productRemove', id: number): void,
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
  changeProductCartQty
} = useProduct(item.value.product)

const productPrice = computed(() => formattedPrice(item.value.product.price))

const removeProductFormCart = async () => {
  await removeFromCart()
  emit('productRemove', item.value.product.id)
}

watch(qty, async newVal => await changeProductCartQty(newVal))
</script>

<style lang="scss">
.app-configurable-cart-tile {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;

  &__info {
    flex: 0 0 25%;
  }

  &__actions {
    position: absolute;
    right: 0;

    &-delete {
      .ui-icon {
        font-size: 24rem !important;
      }
    }
  }
}
</style>
