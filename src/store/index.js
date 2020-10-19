import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '../store/modules/auth'
import user from '../store/modules/user'
import friend from '../store/modules/friend'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        user,
        friend
    },
    state: {},
    mutations: {},
    actions: {},
    plugins: [
        createPersistedState({
            paths: ['auth.user.user_id'],
            storage: window.sessionStorage
        })
    ]
})