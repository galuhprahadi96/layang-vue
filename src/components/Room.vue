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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data() {
    return {
      rooms: [{ user_name: 'John Doe', unread: 2 }]
    }
  },
  methods: {}
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
