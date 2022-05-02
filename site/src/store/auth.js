import AuthService from '../service/auth'

export default {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    hasAuthenticated: false
  }),
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setLogin(state, data) {
      state.user = data.user
      state.token = data.token
      state.hasAuthenticated = true
      localStorage.setItem('token', data.token)
    },
    setLogout(state) {
      state.user = null
      state.token = null
      state.hasAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  getters: {
    isAuthenticated: (state) => {
      return Boolean(state.token && state.token !== '')
    },
    authenticatedUser: (state) => {
      return state.user
    }
  },
  actions: {
    async login({commit}, credentials) {
      try {
        const data = await AuthService.login(credentials)
        commit('setLogin', data)
        return data
      } catch (e) {
        commit('setLogout')
        throw e
      }
    },
    logout({commit}) {
      commit('setLogout')
      return true
    },
    async registerUser({commit}, data) {
      try {
        const user = await AuthService.registerUser(data)
        commit('setUser', user)
        return user
      } catch (e) {
        commit('setLogout')
        return null
      }
    }
  }
};
