import axios from 'axios'

export default {
  state: {
    friend: [],
    detailFriend: []
  },
  mutations: {
    setFriend(state, payload) {
      state.friend = payload
    },
    setDetailFriend(state, payload) {
      state.detailFriend = payload
    }
  },
  actions: {
    searchFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/users/search?keyword=${payload}`)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    addFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/friend`, payload)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    friendList(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/friend/${payload}`)
          .then(res => {
            context.commit('setFriend', res.data.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  },
  getters: {
    getFriend(state) {
      return state.friend
    },
    getDetailFriend(state) {
      return state.detailFriend
    }
  }
}
