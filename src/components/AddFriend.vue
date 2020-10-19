<template>
  <div>
    <b-modal id="add-friend" hide-footer centered>
      <template v-slot:modal-title>
        Add Friend
      </template>
      <b-row class="list-options">
        <b-col cols="12">
          <b-input-group size="sm" class="mb-2 pl-1">
            <b-form-input
              type="search"
              placeholder="Search Email and Phone"
              v-model="keyword"
              v-on:keyup.enter="search"
            ></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <div class="text-center">
        <b-col cols="12" v-if="keyword === ''">
          <p style="text-align: center; font-size: 20px" class="mt-2">
            Search Friend
          </p>
        </b-col>
        <b-col cols="12" v-if="dataNotFound">
          <p
            style="color: red; text-align: center; font-size: 20px"
            class="mt-2"
          >
            Oops... Data not Found.
          </p>
        </b-col>
        <b-list-group-item v-if="dataFound">
          <b-row>
            <b-col cols="3" style="padding-top:10px">
              <img
                :src="url + '/' + searchResult.user_image"
                style="width:60px; height:60px; border-radius:20px"
              />
            </b-col>
            <b-col
              cols="7"
              style="text-align:left;margin-left:-20px; padding-right: 0"
            >
              <span>Name : {{ searchResult.user_name }}</span
              ><br />
              <em>Phone : {{ searchResult.user_phone }}</em
              ><br />
              <em>Email : {{ searchResult.user_email }}</em></b-col
            >
            <b-col cols="2" style="padding-top:20px">
              <b-button
                size="sm"
                variant="outline-info"
                class="mb-2"
                @click="onAdd()"
                v-show="notAdded"
              >
                <b-icon icon="plus" aria-label="Help"></b-icon>
              </b-button>
              <b-button v-show="isAdded" size="sm" variant="outline-info" class="mb-2">
                <b-icon icon="check" aria-label="Help"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-list-group-item>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AddFriend',
  data() {
    return {
      url: process.env.VUE_APP_URL,
      keyword: '',
      dataNotFound: false,
      dataFound: false,
      isAdded: null,
      notAdded: null,
      searchResult: {}
    }
  },
  computed: {
    ...mapGetters({
      friend: 'getFriend',
      userId: 'getUser'
    })
  },
  methods: {
    ...mapActions(['searchFriend', 'addFriend', 'friendList']),
    search() {
      this.dataNotFound = false
      this.dataFound = false
      this.searchFriend(this.keyword)
        .then(res => {
          this.dataFound = true
          this.searchResult = res.data[0]
          // console.log(res)
          const check = this.friend.some(
            (el) => el.user_id === this.searchResult.user_id
          )
          if (this.userId.user_id === this.searchResult.user_id) {
            this.notAdded = false
            this.isAdded = false
          } else if (check) {
            this.isAdded = true
            this.notAdded = false
          } else if (!check) {
            this.notAdded = true
            this.isAdded = false
          }
        })
        .catch(err => {
          console.log(err)
          this.dataNotFound = true
        })
    },
    onAdd() {
      const payload = {
        user_id: this.userId.user_id,
        friend_id: this.searchResult.user_id
      }
      this.addFriend(payload)
        .then((res) => {
          this.friendList(this.userId.user_id)
          this.makeToast('success', 'Success', res.msg)
          this.isAdded = true
          this.notAdded = false
        })
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
  },
}
</script>

<style scoped>
.list-options {
  margin: 0 auto 10px;
}

.list-options input {
  background-repeat: no-repeat;
  background-position: left;
  background-position-x: 10px;
  background-color: #fafafa;
  padding: 0 10px 0 10px;
  border-radius: 15px;
}
</style>
