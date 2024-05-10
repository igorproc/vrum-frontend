<template>
  <div class="app-configurable-cart-tile --configurable">
    <AppCartItemPreview
      :name="item.product.name"
      :image-url="productVariant.imageUrl"
      class="app-configurable-cart-tile__preview"
    />
    <AppCartItemPrice :price="productVariant.price" class="app-configurable-cart-tile__price" />
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
  changeProductCartQty,
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
  flex-wrap: wrap;
  align-items: center;
  gap: 8rem;

  &__preview {
    flex: 0 0 calc(75% - 8rem);
  }

  &__price {
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
      flex: 0 0 calc(25% - 8rem);
    }

    &__info {
      flex: 0 0 calc(25% - 8rem);
    }

    &__actions {
      transform: translate(0, 50%);
    }
  }
}
</style>
