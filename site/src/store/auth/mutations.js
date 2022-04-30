import types from './types'

const loginSuccess = (state, { user, token }) => {
  state.user = user
  state.token = token
  state.hasAuthenticated = true

  localStorage.setItem('token', token)
}

const logout = state => {
  state.user = null
  state.token = null
  state.hasAuthenticated = null

  localStorage.removeItem('token')
}

const updateAuthedUser = (state, user) => {
  state.user = user
}

export default {
  [types.LOGIN_SUCCESS]: loginSuccess,
  [types.LOGIN_FAILURE]: logout,
  [types.LOGOUT]: logout,
  [types.AUTHED_USER_CHANGE]: updateAuthedUser
}
