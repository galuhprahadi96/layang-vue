import axios from 'axios'

export default {
  state: {
    message: [],
    roomSelected: []
  },
  mutations: {
    setRoomSelected(state, payload) {
      state.roomSelected = payload
    },
    setMessage(state, payload) {
      state.message = payload
    }
  },
  actions: {
    messageByRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_URL}/message?code_chatroom=${payload.code_chatroom}&user_id=${payload.user_id}`
          )
          .then(res => {
            context.commit('setRoomSelected', res.data.data[0])
            context.commit('setMessage', res.data.data[0].messages)
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    sendMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/message/`, payload)
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
    getMessage(state) {
      return state.message
    },
    getSelectedRoom(state) {
      return state.roomSelected
    }
  }
}
