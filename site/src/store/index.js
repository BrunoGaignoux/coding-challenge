import Vue from 'vue'
import Vuex from 'vuex'

import project from './project'
import auth from './auth'

Vue.use(Vuex)

const Store = new Vuex.Store({
    modules: {
        project,
        auth,
    },
    strict: process.env.DEBUGGING
})

export default Store
