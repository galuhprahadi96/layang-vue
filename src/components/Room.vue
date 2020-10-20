<template>
  <div class="rooms-c">
    <div
      @click="selectedRoom(value)"
      class="list-rooms"
      v-for="(value, index) in room"
      :key="index"
    >
      <div class="d-flex align-items-center my-3">
        <img
          :src="url + '/' + value.user_image"
          class="room-image mr-3"
          alt=""
        />
        <span class="mr-auto room-name">{{ value.user_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Room',
  data() {
    return {
      socket: io(process.env.VUE_APP_URL),
      url: process.env.VUE_APP_URL,
      rooms: [{ user_name: 'John Doe' }]
    }
  },
  computed: {
    ...mapGetters({
      room: 'roomList'
    })
  },
  methods: {
    ...mapMutations(['setSelect']),
    ...mapActions(['getRoomByUserId', 'messageByRoom']),
    selectedRoom(value) {
      const setData = {
        code_chatroom: value.code_chatroom,
        user_id: value.user_id
      }
      this.setSelect(true)
      this.messageByRoom(setData)
      this.socket.emit('joinRoom', value.code_chatroom)
    }
  }
}
</script>
<style>
.rooms-c {
  background-color: #ffffff;
  min-height: auto;
  max-height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
}
.list-rooms {
  margin: 5px 20px 5px 20px;
  cursor: pointer;
}

.room-image {
  width: 50px !important;
  height: 50px !important;
  border-radius: 15px !important;
}
.room-name {
  font-weight: 500;
  font-size: 1rem;
  line-height: 21px;
  letter-spacing: -0.165px;
  color: #232323;
}
</style>
