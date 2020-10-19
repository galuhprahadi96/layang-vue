import axios from 'axios'

export default {
  state: {},
  mutations: {},
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
    }
  },
  getters: {}
}
