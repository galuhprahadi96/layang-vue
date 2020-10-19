<template>
  <div class="bg">
    <div class="room-header">
      <b-row class="room-header-row">
        <div class="d-flex align-items-center">
          <img src="https://placekitten.com/300/300" class="rooms-pict ml-3" />
          <div class="ml-4">
            <p class="ml-3 room-name">Galuh Prahadi Gumelar</p>
            <p style="margin:0"></p>
          </div>
        </div>
      </b-row>
    </div>
    <div id="message">
      <b-container class="message-chat">
        <b-row v-for="(value, index) in chat" :key="index">
          <b-col v-if="value.class === 'sender'">
            <img
              src="https://placekitten.com/300/300"
              class="float-left"
              style="width:45px; border-radius:20px"
            />
            <div class="sender" v-if="value.class === 'sender'">
              {{ value.message }}
            </div>
          </b-col>
          <b-col v-if="value.class === 'receiver'">
            <img
              src="https://placekitten.com/300/300"
              class="float-right"
              style="width:45px; border-radius:20px"
            />
            <div class="receiver">
              {{ value.message }}
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container>
      <b-row class="pt-3 d-flex align-items-center">
        <b-col cols="9" md="11" lg="11">
          <b-form-input placeholder="Type your message..."></b-form-input>
        </b-col>
        <b-col cols="1" md="1" lg="1">
          <b-button>
            <b-img :src="require('../assets/icon/Send.png')" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      dataUser : {},
      chat: [
        {
          message: 'halo Galuh',
          class: 'sender'
        },
        {
          message: 'Halo john',
          class: 'receiver'
        }
      ],
      url: process.env.VUE_APP_URL
    }
  },
  computed: {}
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
  background-color: #eeeeee;
  min-height: 520px;
  max-height: 520px;
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
  max-width: 290px;
}

.sender {
  float: left;
  border-radius: 35px 20px 20px 10px;
  background: #45ac31;
  color: #ffffff;
}

.receiver {
  float: right;
  border-radius: 20px 35px 10px 20px;
  background: #ffffff;
  color: #232323;
}
</style>
