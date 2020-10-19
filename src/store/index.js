import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '../store/modules/auth'
import user from '../store/modules/user'
import friend from '../store/modules/friend'
import setroom from '../store/modules/setroom'
import message from '../store/modules/message'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    friend,
    setroom,
    message
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
