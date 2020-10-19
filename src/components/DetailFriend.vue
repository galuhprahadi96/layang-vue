<template>
  <b-sidebar id="friend-info" right shadow>
    <div class="px-3 py-2">
      <div class="profile-detail">
        <img
          style="width: 70px; height: 70px; border-radius: 20px"
          :src="url + '/' + info.user_image"
        >
        <div class="profile-data">
          <p class="profile-name">{{ info.user_name }}</p>
        </div>
      </div>
      <div class="profile-menu">
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="Detail" active>
            <strong>Phone Number</strong>
            <p class="profile-phone">{{ info.user_phone }}</p>
            <strong>Email</strong>
            <p class="profile-phone">{{ info.user_email }}</p>
            <br />
          </b-tab>
          <b-tab title="My Location">
            <GmapMap
              :center="{ lat: +info.user_lat, lng: +info.user_lng }"
              :zoom="15"
              map-type-id="terrain"
              style="width: 100%; height: 300px"
            >
              <GmapMarker
                :position="{ lat: +info.user_lat, lng: +info.user_lng }"
                :clickable="true"
                :draggable="true"
                icon="https://img.icons8.com/color/48/000000/map-pin.png"
              />
            </GmapMap>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </b-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DetailFriend',
  data() {
    return {
      url: process.env.VUE_APP_URL
    }
  },
  computed: {
    ...mapGetters({
      info: 'getDetailFriend'
    })
  },
}
</script>

<style scoped>
.profile-name {
  font-size: 1.2rem;
  margin-bottom: 0;
  margin-top: 15px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: -0.165px;
}
.profile-phone {
  font-weight: normal;
  font-size: 0.9rem;
  line-height: 19px;
  letter-spacing: 1.335px;
  color: #848484;
}
</style>
