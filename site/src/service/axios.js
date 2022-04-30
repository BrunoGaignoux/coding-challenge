import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 90000
})

export default ({ store, router, Vue }) => {
  axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) config.headers.Authorization = `Bearer ${token}`

      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(r => r, async error => {
    const { response } = error

    if (!response) {
      throw error
    }

    if (response.status === 401) store.dispatch('auth/logout')

    if (response.status === 403) {
      store.dispatch('auth/logout')
      router.push({ name: 'login' })
    }

    throw error
  })

  Vue.prototype.$axios = api
}

export const api = {
  async get (endpoint, config = {}) {
    const res = await axiosInstance.get(endpoint, config)
    return res.data
  },
  async post (endpoint, body, config = {}) {
    const res = await axiosInstance.post(endpoint, body, config)
    return res.data
  },
  async put (endpoint, body, config = {}) {
    const res = await axiosInstance.put(endpoint, body, config)
    return res.data
  },
  async delete (endpoint, config = {}) {
    const res = await axiosInstance.delete(endpoint, config)
    return res.data
  },
}
