<template>
  <b-container style="padding: 0;">
    <b-row class="list-header">
      <b-col cols="10">
        <p class="ml-5"><b-icon icon="chat-quote"></b-icon> Layang</p>
      </b-col>
      <b-col cols="2">
        <img
          src="@/assets/icon/Menu.png"
          class="button-toggle"
          alt="toggle-menu"
          id="pop-burger"
          tabindex="0"
        />
        <b-popover target="pop-burger" triggers="focus" placement="bottomleft">
          <ul class="burger-list">
            <li class="burger-menu">
              <b-row v-b-toggle.sidebar-profile>
                <b-col cols="1">
                  <b-icon
                    style="padding-left: 8px; padding-bottom: 8px;"
                    icon="person-fill"
                    aria-hidden="true"
                    font-scale="2"
                  ></b-icon>
                </b-col>
                <b-col cols="9"><p>Profile</p></b-col>
              </b-row>
            </li>
            <li class="burger-menu">
              <b-row
                @click="$bvModal.show('friend-list')"
                style="cursor:pointer"
              >
                <b-col cols="1">
                  <b-icon
                    style="padding-left: 8px; padding-bottom: 8px;"
                    icon="person-lines-fill"
                    aria-hidden="true"
                    font-scale="2"
                  ></b-icon>
                </b-col>
                <b-col cols="9"><p>Friend List</p></b-col>
              </b-row>
            </li>
            <li class="burger-menu">
              <b-row
                @click="$bvModal.show('add-friend')"
                style="cursor:pointer"
              >
                <b-col cols="1">
                  <b-icon
                    style="padding-left: 8px; padding-bottom: 8px;"
                    icon="person-plus-fill"
                    aria-hidden="true"
                    font-scale="2"
                  ></b-icon>
                </b-col>
                <b-col cols="9"><p>Add Friend</p></b-col>
              </b-row>
            </li>
            <li class="burger-menu">
              <b-row @click="LogoutNow()" style="cursor:pointer">
                <b-col cols="1">
                  <b-icon
                    style="padding-left: 8px; padding-bottom: 8px;"
                    icon="power"
                    aria-hidden="true"
                    font-scale="2"
                  ></b-icon>
                </b-col>
                <b-col cols="9"><p>Logout</p></b-col>
              </b-row>
            </li>
          </ul>
        </b-popover>
        <DetailFriend />
        <AddFriend />
        <FriendList />
        <Profile />
      </b-col>
    </b-row>
    <b-row class="list-options">
      <b-col cols="12" style="margin-bottom: 25px">
        <b-avatar
          class="profile-picture"
          :src="url + '/' + userData.user_image"
        ></b-avatar>
        <p class="profile-name">{{ userData.user_name }}</p>
        <span class="profile-phone">{{ userData.user_phone }}</span>
      </b-col>
      <b-col cols="10">
        <b-input-group size="sm" class="mb-2 pl-1">
          <b-form-input
            type="search"
            placeholder="Search Message"
          ></b-form-input>
        </b-input-group>
      </b-col>
      <b-col
        cols="2"
        style="width:35px; height:35px; padding-right:10px; padding-left:0"
      >
        <b-icon
          @click="$bvModal.show('friend-list')"
          style="width:30px; height:30px; cursor:pointer;"
          icon="chat-dots"
          variant="primary"
        ></b-icon>
      </b-col>
    </b-row>
    <Room />
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Room from '../components/Room.vue'
import FriendList from '../components/FriendList.vue'
import Profile from '../components/Profile.vue'
import AddFriend from '../components/AddFriend.vue'
import DetailFriend from '../components/DetailFriend.vue'
export default {
  name: 'List',
  data() {
    return {
      isLogout: false,
      url: process.env.VUE_APP_URL
    }
  },
  components: {
    Room,
    Profile,
    FriendList,
    AddFriend,
    DetailFriend
  },
  computed: {
    ...mapGetters({
      userId: 'getUser',
      userData: 'getUserData'
    })
  },
  methods: {
    ...mapActions(['logout']),
    LogoutNow() {
      this.$bvModal
        .msgBoxConfirm('Are you sure want to logout?', {
          title: `Hello ${this.userData.user_name}`,
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.isLogout = value
            if (this.isLogout) {
              this.logout()
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
  font-family: Rubik, Helvetica, Arial, sans-serif;
}
.home-left {
  padding: 0;
  border-right: 1px solid #e5e5e5;
}

.list-header {
  margin: 15px auto 10px;
}

.list-header p {
  font-size: 29px;
  line-height: 34px;
  letter-spacing: -0.165px;
  color: #7e98df;
}

.menu-toggle {
  z-index: 1;
  width: 170px;
  top: 30px;
  right: 25px;
  position: absolute;
  background-color: blue;
  color: white;
  border-radius: 10px 0 10px 10px;
  text-align: left;
}

#pop-burger {
  cursor: pointer;
}

.popover {
  background: #7e98df;
  border-radius: 35px 10px 35px 35px;
  border: none;
  z-index: 1;
}

ul.burger-list {
  padding: 10px;
  list-style: none;
}

.burger-menu {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.165px;
  color: #ffffff;
  padding: 10px 0 5px 0;
}

.burger-menu p {
  padding: 2px 0 0 10px;
}

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

.profile-picture {
  width: 70px !important;
  height: 70px !important;
  border-radius: 20px !important;
}
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
