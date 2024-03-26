<template>
  <footer class="app-footer">
    <span class="app-footer__copyright">
      2023 Specto. All rights reverved
    </span>
  </footer>
</template>

<style lang="scss">
.app-footer {
  margin-top: 25rem;
  padding: 10rem 15rem;

  &__copyright {
    font-size: 10rem;
    font-weight: bold;
  }

  @media #{map-get($display-rules, 'md')} {
    &__copyright {
      font-size: 18rem;
    }
  }

  @media #{map-get($display-rules, 'xl')}{
    padding: 25rem 65rem;
  }

  @media #{map-get($display-rules, 'xxl')} {
    padding: 40rem 140rem;
  }
}

</style>
