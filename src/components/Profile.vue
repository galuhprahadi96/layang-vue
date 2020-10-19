<template>
  <b-sidebar id="sidebar-profile" bg-variant="white" shadow width="338px">
    <div class="px-3 py-2">
      <div class="profile-detail">
        <b-avatar
          class="profile-image"
          :src="url + '/' + userData.user_image"
        ></b-avatar>
        <div class="profile-data">
          <p class="profile-name">{{ userData.user_name }}</p>
        </div>
      </div>
      <div class="profile-menu">
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="Detail" active>
            <strong>Phone Number</strong>
            <p>{{ userData.user_phone }}</p>
            <strong>Email</strong>
            <p>{{ userData.user_email }}</p>
            <br />
            <b-button @click="onEdit()" block variant="outline-primary"
              >Edit Profile</b-button
            >
            <b-button block variant="outline-primary" class="mb-2">
              <b-icon icon="power" aria-hidden="true"></b-icon> Logout
            </b-button>
          </b-tab>
          <b-tab title="My Location">
            <GmapMap
              :center="{ lat: +userData.user_lat, lng: +userData.user_lng }"
              :zoom="15"
              map-type-id="terrain"
              style="width: 100%; height: 300px"
            >
              <GmapMarker
                :position="{ lat: +userData.user_lat, lng: +userData.user_lng }"
                :clickable="true"
                :draggable="true"
                @click="clickMarker"
                icon="https://img.icons8.com/color/48/000000/map-pin.png"
              />
            </GmapMap>
          </b-tab>
        </b-tabs>
      </div>
      <b-modal id="edit-profile" hide-footer centered>
        <template v-slot:modal-title>
          Edit Profile
        </template>
        <b-alert variant="danger" :show="isAlert">{{ isMsg }}</b-alert>
        <div class="profile-detail">
          <b-avatar
            class="profile-image"
            :src="url + '/' + userData.user_image"
          ></b-avatar>
          <input
            type="file"
            ref="file"
            @change="upFile"
            style="display: none"
          />
          <div class="btn-change-image">
            <span @click="$refs.file.click()" class="button-profile"
              >Change</span
            >
            <span
              class="button-profile"
              v-show="userData.user_image !== 'profile.png'"
              >Reset</span
            >
          </div>
        </div>
        <hr />
        <b-form @submit.prevent="updateProfile()">
          <b-form-group
            label-cols-sm="3"
            label="Email"
            label-for="nested-email"
          >
            <b-form-input
              id="nested-email"
              disabled
              v-model="form.user_email"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
            <b-form-input
              id="nested-name"
              required
              v-model="form.user_name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Phone"
            label-for="nested-phone"
          >
            <b-form-input
              id="nested-phone"
              required
              v-model="form.user_phone"
            ></b-form-input>
          </b-form-group>
          <div>
            <b-button
              size="md"
              type="submit"
              variant="outline-primary"
              style="margin-top: 35px"
            >
              Update
            </b-button>
          </div>
        </b-form>
      </b-modal>
    </div>
  </b-sidebar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      url: process.env.VUE_APP_URL,
      coordinate: {
        lat: 0,
        lng: 0
      },
      form: {},
      formImage: {},
      isMsg: '',
      isAlert: false
    }
  },
  computed: {
    ...mapGetters({
      userId: 'getUser',
      userData: 'getUserData'
    })
  },
  methods: {
    ...mapActions([
      'getUserById',
      'patchLocation',
      'patchImage',
      'patchProfile'
    ]),
    clickMarker(position) {
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
      const payload = {
        user_id: this.userId.user_id,
        form: this.coordinate
      }
      this.patchLocation(payload).then(res => {
        console.log(res.msg)
        this.getUserById(this.userId)
      })
    },
    onEdit() {
      this.form = {
        user_email: this.userData.user_email,
        user_name: this.userData.user_name,
        user_phone: this.userData.user_phone
      }
      this.isAlert = false
      this.$bvModal.show('edit-profile')
    },
    updateProfile() {
      this.isAlert = false
      const setData = {
        user_id: this.userId.user_id,
        form: this.form
      }
      this.patchProfile(setData)
        .then(res => {
          this.isAlert = false
          this.getUserById(this.userId)
          this.makeToast('success', 'Success', res.msg)
        })
        .catch(err => {
          this.isAlert = true
          this.isMsg = err.data.msg
        })
    },
    upFile(event) {
      this.formImage.user_image = event.target.files[0]
      const data = new FormData()
      data.append('image', this.formImage.user_image)
      const setData = {
        user_id: this.userId.user_id,
        form: data
      }
      this.patchImage(setData)
        .then(res => {
          this.isAlert = false
          this.getUserById(this.userId)
          this.makeToast('success', 'Success', res.msg)
          this.formImage = {}
        })
        .catch(err => {
          this.isAlert = true
          this.isMsg = err.data.msg
        })
    },
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.modal-content {
  border-radius: 50% !important;
}
.profile-detail {
  display: flex;
  align-self: center;
  align-items: center;
  flex-direction: column;
}
.profile-image {
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
.profile-menu {
  margin-top: 20px;
}
.button-profile {
  cursor: pointer;
  color: blueviolet;
  margin: 5px;
}
</style>
