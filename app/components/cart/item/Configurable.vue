<template>
  <div class="app-configurable-cart-tile --configurable">
    <AppCartItemPreview
      :name="item.product.name"
      :image-url="productVariant.imageUrl"
      class="app-configurable-cart-tile__info"
    />
    <div
      class="app-configurable-cart-tile__info app-configurable-cart-tile__price"
    >
      <span>
        {{ productPrice }}
      </span>
    </div>
    <AppCartItemQtyInput v-model:qty="item.qty" class="app-configurable-cart-tile__info" />
    <AppCartItemTotalPrice
      :product-price="productVariant.price"
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
  addProductVariant,
  removeFromCart,
  changeProductCartQty
} = useProduct(item.value.product)

if (item.value.selectedVariant) {
  addProductVariant(item.value.selectedVariant)
}

const productVariant = computed(() => {
  const fallbackProductFields = {
    price: item.value.product.price,
    imageUrl: item.value.product.productImage,
  }
  if (!item.value.selectedVariant || !item.value.product?.configurable) {
    return fallbackProductFields
  }

  const productVariantCandidate = item.value.product.configurable?.variants
    ?.find(variant => variant.product.id === item.value.selectedVariant)
  if (!productVariantCandidate) {
    return fallbackProductFields
  }

  return {
    price: productVariantCandidate.product.price || fallbackProductFields.price,
    imageUrl: productVariantCandidate.product.imageUrl || fallbackProductFields.imageUrl,
  }
})

const productPrice = computed(() => formattedPrice(productVariant.value.price))

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
