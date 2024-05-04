// Node Deps
import type { AxiosHeaders, AxiosInstance, Method } from 'axios'
import axios from 'axios'
import { effect } from 'vue'
import consola from 'consola'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'
// Types & Interfaces
import type { TResponseError } from '~/api/shared.types'

export const useAsyncQuery = () => {
  const runtimeConfig = useRuntimeConfig()
  const notificationStore = useNotificationStore()

  const apiUrl = runtimeConfig.public.apiUrl
  const requestInstance = ref<AxiosInstance | null>(null)
  const authToken = useCookie(
    'authorization',
    {
      watch: 'shallow',
    },
  )

  const compileError = (errorData: TResponseError) => {
    if (typeof errorData.error.message === 'string') {
      return {
        title: errorData.error.code,
        description: errorData.error.message,
      }
    }

    let prettyError = ''
    for (const [key, item] of Object.entries(errorData.error.message)) {
      if (!Array.isArray(item)) {
        continue
      }

      prettyError += `${key}: ${item.join(', ')} \n`
    }
    return {
      title: errorData.error.code,
      description: prettyError,
    }
  }

  const showError = (errorData: TResponseError | Error) => {
    const errorMessage = errorData instanceof Error ?
      { description: errorData.message } :
      compileError(errorData)

    useClientOnly(() => {
      notificationStore.openErrorNotification(errorMessage.description)
    })

    useServerOnly(() => {
      consola.error(errorMessage)
    })
  }

  const getApiUrl = (path: string) => {
    const defaultPath = apiUrl + path.replace('/api', '')

    if (!runtimeConfig.public.proxyEnabled) {
      return defaultPath
    }

    if (import.meta.server) {
      return defaultPath
    }

    return path
  }

  const createInstance = () => {
    const instance = axios.create()

    instance.defaults.withCredentials = true
    instance.defaults.baseURL = apiUrl
    instance.defaults.headers['Content-Type'] = 'application/json'
    if (authToken.value) {
      instance.defaults.headers['Authorization'] = authToken.value
    }

    instance.interceptors.response.use(
      response => response,
      error => {
        showError(error.response.data as TResponseError)
      },
    )

    return instance
  }

  effect(() => {
    if (!requestInstance.value) {
      requestInstance.value = createInstance()
    }
  })

  return async <T>(method: Method, url: string, payload?: unknown, headers?: unknown): Promise<T | null> => {
    const requestUrl = getApiUrl(url)
    if (!requestInstance.value) {
      return null
    }

    const customHeaders = headers || {} as AxiosHeaders
    try {
      const response = await requestInstance
        .value
        .request({
          method,
          url: requestUrl,
          data: payload,
          headers: customHeaders,
        })

      return response.data as T
    } catch (error) {
      return null
    }
  }
}
