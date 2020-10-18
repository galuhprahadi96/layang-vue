<template>
  <div class="rooms-c">
    <div class="list-rooms" v-for="(value, index) in rooms" :key="index">
      <div class="d-flex align-items-center my-3">
        <img
          src="https://placekitten.com/300/300"
          class="room-image mr-3"
          alt=""
        />
        <span class="mr-auto room-name">{{ value.user_name }}</span>
        <b-badge variant="info" v-show="value.unread > 0">{{
          value.unread
        }}</b-badge>
      </div>
      <!-- <b-row @click="message(value)" style="cursor:pointer; padding:0">
        <b-col cols="12">
          <b-list-group-item class="d-flex align-items-center">
            <b-avatar
              variant="primary"
              rounded="lg"
              class="mr-3"
              src="https://placekitten.com/300/300"
            ></b-avatar>
            <span class="mr-auto">{{ value.user_name }}</span>
            <b-badge variant="info" v-show="value.unread > 0">{{
              value.unread
            }}</b-badge>
          </b-list-group-item>
        </b-col>
      </b-row> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data() {
    return {
      rooms: [
        {
          user_name: 'Galuh Prahadi',
          unread: 12
        },
        {
          user_name: 'Aditya',
          unread: 0
        },
        {
          user_name: 'Rizal',
          unread: 3
        },
        {
          user_name: 'Reza',
          unread: 4
        }
      ]
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
