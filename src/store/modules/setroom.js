import axios from 'axios'

export default {
  state: {
    rooms: [],
    isSelected: false
  },
  mutations: {
    setRoom(state, payload) {
      state.rooms = payload
    },
    setSelect(state, payload) {
      state.isSelected = payload
    }
  },
  actions: {
    getRoomByUserId(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/room/${payload}`)
          .then(res => {
            context.commit('setRoom', res.data.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    addRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/room/`,payload)
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
    roomList(state) {
      // console.log(state.rooms)
      return state.rooms
    },
    getSelect(state) {
      return state.isSelected
    }
  }
}