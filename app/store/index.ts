// Node Deps
import { defineStore } from 'pinia'
import consola from 'consola'
// Pinia Stores
import { initializeUser } from '~/store/user/init'
import { initializeWishlist } from '~/store/wishlist/init'
import path from 'path'

export const useIndexStore = defineStore('index-store', {
  actions: {
    async init() {
      setTimeout(() => {
        consola.info('App init')
      })
    },
    async clientInit() {
      setTimeout(() => {
        consola.info('client init')
      })
    },
    async serverInit() {
      await Promise.all([
        await initializeUser(),
        await initializeWishlist(),
      ])
    },
  },
})
