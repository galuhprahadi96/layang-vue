<template>
  <div>
    <b-modal id="friend-list" hide-footer centered>
      <template v-slot:modal-title>
        Friend List
      </template>

      <b-list-group-item>
        <div class="text-center container-friend" v-show="friend.length === 0">
          <img
            style="opacity: 20%; width:70%;"
            :src="require('../assets/ilustration/front.svg')"
          />
          <p>Please add Friend First</p>
        </div>
        <b-row
          v-for="(value, index) in friend"
          :key="index"
          class="contact-row"
        >
          <b-col cols="3" style="padding-top:10px; margin-right:5px">
            <img
              :src="url + '/' + value.user_image"
              style="width:60px; height:60px; border-radius:20px"
            />
          </b-col>
          <b-col
            cols="7"
            style="text-align:left;margin-left:-20px; padding-right: 0"
          >
            <span>Name : {{ value.user_name }}</span
            ><br />
            <span>Phone : {{ value.user_phone }}</span>
            <br />
            <span>Email : {{ value.user_email }}</span></b-col
          >
          <b-col cols="12" style="padding-top:20px">
            <b-button
              @click="onDetail(value)"
              v-b-toggle.friend-info
              size="sm"
              variant="outline-info"
              class="mx-2"
            >
              <b-icon icon="info" aria-label="Help"></b-icon> Detail
            </b-button>
            <b-button
              @click="onChat(value)"
              size="sm"
              variant="outline-info"
              class="mx-2"
            >
              <b-icon icon="chat" aria-label="Help"></b-icon> Send Message
            </b-button>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'FriendList',
  data() {
    return {
      url: process.env.VUE_APP_URL,
      keyword: '',
      isDelete: false
    }
  },
  computed: {
    ...mapGetters({
      friend: 'getFriend',
      userId: 'getUser',
      room: 'roomList'
    })
  },
  methods: {
    ...mapMutations(['setDetailFriend']),
    ...mapActions(['friendList', 'addRoom', 'getRoomByUserId']),
    onDetail(value) {
      // console.log(value)
      this.setDetailFriend(value)
      this.$bvModal.hide('friend-list')
    },
    onChat(data) {
      const check = this.room.some(el => {
        return el.user_id === data.user_id
      })
      if (check) {
        this.makeToast('info', 'Info', 'Room is already exists')
      } else {
        const payload = {
          user_id: this.userId.user_id,
          friend_id: data.user_id
        }
        this.addRoom(payload).then(res => {
          this.makeToast('success', 'Success', res.msg)
          this.getRoomByUserId(this.userId.user_id)
          this.$bvModal.hide('friend-list')
        })
      }
    },
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  },
  created() {
    this.friendList(this.userId.user_id)
    this.getRoomByUserId(this.userId.user_id)
  }
}
</script>

<style scoped>
.container-friend {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  margin: auto;
  font-size: 1.2rem;
  line-height: 20px;
  color: #848484;
}
</style>
