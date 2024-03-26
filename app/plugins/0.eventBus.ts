import mitt from 'mitt'

type ApplicationEvents = {
  'notification:open': undefined,
  'brand:add': void,
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
