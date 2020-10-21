<template>
  <div class="rooms-c">
    <div class="text-center container-room" v-show="room.length === 0">
      <img
        style="opacity: 20%; width:70%;"
        :src="require('../assets/ilustration/front.svg')"
      />
      <p>No chat History</p>
    </div>
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
        <div class="ml-1">
          <p class="room-name" style="float:left; margin-bottom:-15px">
            {{ value.user_name }}
          </p>
          <br />
          <small>{{ value.recent_message }}</small>
        </div>
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
      userId: 'getUser',
      room: 'roomList'
    })
  },
  mounted() {
    this.socket.on('room', data => {
      if (data.receiver === this.userId.user_id) {
        this.room.push(data)
      }
    })
  },
  methods: {
    ...mapMutations(['setSelect']),
    ...mapActions(['getRoomByUserId', 'messageByRoom']),
    selectedRoom(value) {
      const setData = {
        code_chatroom: value.code_chatroom,
        user_id: value.receiver
      }
      this.setSelect(true)
      this.messageByRoom(setData)
      this.socket.emit('joinRoom', value.code_chatroom)
    }
  }
}
</script>
<style>
.container-room {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  margin: auto;
  font-size: 1.2rem;
  line-height: 20px;
  color: #848484;
}

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
