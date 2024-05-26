export default defineNuxtRouteMiddleware(async () => {
  const router = useRouter()
  const cartStore = useCartStore()

  if (!cartStore.idsList.length) {
    await router.push({ name: 'index' })
    return
  }
  return true
})
