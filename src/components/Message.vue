<template>
  <div class="bg">
    <div class="room-header">
      <b-row class="room-header-row">
        <div class="d-flex align-items-center">
          <img
            :src="url + '/' + roomSelected.room_img"
            class="rooms-pict ml-3"
          />
          <div class="ml-4">
            <p class="ml-3 room-name">{{ roomSelected.room_name }}</p>
            <p style="margin-left:14px">
              <br />
              <small v-if="typing"
                ><em>{{ typing.room_name }} is typing...</em></small
              >
            </p>
          </div>
        </div>
      </b-row>
    </div>
    <div id="message">
      <b-container class="message-chat">
        <b-row v-for="(value, index) in message" :key="index">
          <b-col v-if="value.sender !== userId.user_id">
            <img
              :src="url + '/' + value.sender_img"
              class="float-left"
              style="width:45px; height:45px; border-radius:10px"
            />
            <div class="sender">
              {{ value.message }}
            </div>
          </b-col>
          <b-col v-if="value.sender === userId.user_id">
            <img
              :src="url + '/' + value.sender_img"
              class="float-right"
              style="width:45px; height:45px; border-radius:10px"
            />
            <div class="receiver">
              {{ value.message }}
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container id="input-message">
      <b-row class="pt-3 d-flex align-items-center">
        <b-col cols="9" md="11" lg="11">
          <b-form-input
            required
            v-on:keyup.enter="onSend"
            v-model="msg"
            placeholder="Type your message..."
          ></b-form-input>
        </b-col>
        <b-col cols="1" md="1" lg="1">
          <b-button @click="onSend">
            <b-img :src="require('../assets/icon/Send.png')" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Chat',
  data() {
    return {
      socket: io(process.env.VUE_APP_URL),
      url: process.env.VUE_APP_URL,
      msg: null,
      typing: false,
      chat: []
    }
  },
  watch: {
    msg(value) {
      value
        ? this.socket.emit('typing', {
            room_name: this.userData.user_name,
            code_chatroom: this.roomSelected.code_chatroom
          })
        : this.socket.emit('typing', false)
    }
  },
  mounted() {
    this.socket.on('typingMessage', data => {
      if (data.code_chatroom !== this.roomSelected.code_chatroom) {
        this.typing = false
      } else {
        this.typing = data
      }
    })
    this.socket.on('chatMessage', data => {
      this.scrollToEnd()
      if (data.code_chatroom === this.roomSelected.code_chatroom) {
        this.getRoomByUserId(this.userId.user_id)
        this.message.push(data)
      }else{
        data = ""
      }
    })
  },
  methods: {
    ...mapActions(['sendMessage', 'messageByRoom', 'getRoomByUserId']),
    scrollToEnd() {
      const container = this.$el.querySelector('#message')
      container.scrollTop = container.scrollHeight
    },
    onSend() {
      // const payload = {
      //   code_room: this.roomSelected.code_chatroom,
      //   sender_id: this.userId.user_id,
      //   receiver_id: this.roomSelected.receiver,
      //   message: this.msg
      // }

      const socketData = {
        code_chatroom: this.roomSelected.code_chatroom,
        sender: this.userId.user_id,
        getter: this.roomSelected.receiver,
        message: this.msg,
        sender_img: this.userData.user_image
      }
      this.socket.emit('roomMessage', socketData)
      this.msg = ''
      // this.sendMessage(payload)
      //   .then(res => {
      //     this.msg = ''
      //     this.getRoomByUserId(this.userId.user_id)
      //     this.scrollToEnd()
      //     console.log(res.msg)
      //   })
      //   .catch(err => {
      //     console.log(err.msg)
      //   })
    }
  },
  computed: {
    ...mapGetters({
      roomSelected: 'getSelectedRoom',
      message: 'getMessage',
      userId: 'getUser',
      userData: 'getUserData'
    })
  }
}
</script>

<style scoped>
.bg {
  background-color: #fafafa;
  width: 100%;
  height: 100%;
}
.room-header {
  padding: 0 !important;
  position: relative;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
}

.room-header-row {
  margin: 10px auto 0;
  padding-bottom: 0;
}

.rooms-pict {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.room-name {
  margin: 0;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: -0.165px;
  color: #232323;
  /* margin: 0 2px; */
  float: left;
}

.room-status {
  font-size: 15px;
  line-height: 18px;
  letter-spacing: -0.165px;
  color: #7e98df;
  margin-left: -50px;
  float: left;
}

#message {
  background-color: #e2dbdb;
  min-height: 480px;
  max-height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
}

.message-chat {
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
}

.sender,
.receiver {
  font-size: 15px;
  line-height: 185.17%;
  letter-spacing: -0.165px;
  padding: 10px 20px;
  margin: 5px 20px 5px;
  max-width: 300px;
}

.sender {
  float: left;
  border-radius: 0 40px 40px 40px;
  background: #ffffff;
  color: #232323;
}

.receiver {
  float: right;
  border-radius: 40px 0 40px 40px;
  background: #b872e0;
  color: #ffffff;
}

#input-message input {
  margin: 10px auto;
  background-color: #e2dbdb;
  border-radius: 15px;
}

#input-message button {
  margin: 20px auto;
  background: #7e98df;
  border: none;
  border-radius: 15px;
}

#input-message button:hover {
  background: #6987da;
}

#input-message button:active,
#input-message button:focus {
  background: #5277db !important;
}
</style>
