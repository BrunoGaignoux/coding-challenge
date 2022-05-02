import { api } from './axios'

export default {
  login (credentials) {
    return api.post('auth/login', credentials)
  },
  registerUser (data) {
    return api.post('users', data)
  },
  fetchAuthedUser () {
    return api.get('auth/me')
  },
}
