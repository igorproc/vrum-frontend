import mitt from 'mitt'

type ApplicationEvents = {
  'notification:open': undefined,
  'brand:add': void,
  'product:add': void,
  'wishlist:remove': void,
}

export default defineNuxtPlugin(() => {
  const emitter = mitt<ApplicationEvents>()

  return {
    provide: {
      emit: emitter.emit,
      listen: emitter.on,
    },
  }
})
