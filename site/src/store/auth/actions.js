import AuthService from 'src/services/auth'
import types from './types'

const login = async ({ commit }, credentials) => {
  try {
    const data = await AuthService.login(credentials)
    commit(types.LOGIN_SUCCESS, data)
    return data
  } catch (e) {
    commit(types.LOGIN_FAILURE)
    throw e
  }
}

const logout = ({ commit }) => {
  commit(types.LOGOUT)
  return true
}

const setAuthedUser = async ({ commit }) => {
  try {
    const user = await AuthService.fetchAuthedUser()
    commit(types.AUTHED_USER_CHANGE, user)
    return user
  } catch (e) {
    commit(types.LOGOUT)
    return null
  }
}

export default {
  login,
  logout,
  setAuthedUser
}
