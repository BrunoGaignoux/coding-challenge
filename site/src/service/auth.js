import { api } from './axios'

export default {
  login (credentials) {
    return api.post('auth/login', credentials)
  },
  fetchAuthedUser () {
    return api.get('auth/me')
  },
}
