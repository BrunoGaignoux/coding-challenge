import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 90000
})

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

export default ({ store, router, Vue }) => {
  axiosInstance.interceptors.response.use(r => r, async error => {
    const { response } = error

    if (!response) {
      console.error(error)
      throw error
    }

    if (response.status === 401) store.dispatch('auth/logout')

    if (response.status === 403) {
      store.dispatch('auth/logout')
      router.push({ name: 'login' })
    }

    console.error(error)
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
