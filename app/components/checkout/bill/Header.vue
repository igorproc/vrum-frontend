<template>
  <div class="app-checkout-bill-header">
    <span class="app-checkout-bill-header__content">
      Продукт
    </span>
    <span class="app-checkout-bill-header__content">
      итого
    </span>
  </div>
</template>

<style lang="scss">
.app-checkout-bill-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__content {
    font-family: $poppins-font-family;
    font-weight: 500;
    font-size: 24rem;
  }
}
</style>
