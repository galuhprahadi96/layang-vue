import axios from 'axios'

export default {
  state: {
    message: []
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    }
  },
  actions: {
    messageByRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/message?code_chatroom=${payload.code_chatroom}&user_id=${payload.user_id}`)
          .then(res => {
            console.log(res.data)
            context.commit('setMessage', res.data.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  },
  getters: {
    getMessage(state) {
      console.log(state.message)
    }
  }
}