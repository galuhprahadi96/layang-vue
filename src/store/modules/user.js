import axios from 'axios'

export default {
  state: {
    userData: {}
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload
    },
  },
  actions: {
    getUserById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/users/${payload.user_id}`)
          .then(response => {
            context.commit('setUserData', response.data.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchLocation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/location/${payload.user_id}`,
            payload.form
          )
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    patchImage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/profile/${payload.user_id}`,
            payload.form
          )
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    patchProfile(context,payload) {
      return new Promise((resolve,reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/${payload.user_id}`,
            payload.form
          )
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  },
  getters: {
    getUserData(state) {
      return state.userData
    },
  }
}