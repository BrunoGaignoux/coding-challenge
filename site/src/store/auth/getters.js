export default {
  isAuthenticated (state) {
    return Boolean(state.token && state.token !== '')
  },
  authenticatedUser (state) {
    return state.user
  }
}
