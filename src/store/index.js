import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '../store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth
    },
    state: {},
    mutations: {},
    actions: {},
    plugins: [
        createPersistedState({
            paths: ['Auth.user'],
            storage: window.sessionStorage
        })
    ]
})