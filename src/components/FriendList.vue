<template>
  <div>
    <b-modal id="friend-list" hide-footer centered>
      <template v-slot:modal-title>
        Friend List
      </template>
      <b-row class="list-options">
        <b-col cols="12">
          <b-form-input
            type="search"
            v-model="keyword"
            placeholder="search name, phone or email"
            v-on:keyup.enter="search"
          ></b-form-input>
        </b-col>
      </b-row>
      <div class="text-center" v-if="friend.length === 0">
        <p>add your friend first</p>
      </div>
      <div
        v-else
        class="side-profile-header"
        style="height: 400px; overflow-y: auto;"
      >
        <div class="my-4" v-for="(value, indeks) in friend" :key="indeks">
          <b-list-group-item>
            <b-row class="contact-row">
              <b-col cols="3" style="padding-top:10px">
                <b-avatar
                  @click="onContact(value)"
                  v-b-toggle.sidebar-info
                  :src="url + '/' + value.user_image"
                  style="width:50px; height:50px;"
                ></b-avatar
              ></b-col>
              <b-col
                cols="7"
                style="text-align:left;margin-left:-20px; padding-right: 0"
              >
                <span>Name : {{ value.user_name }}</span
                ><br />
                <em>Email : {{ value.user_email }}</em></b-col
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
                  @click="message(value)"
                  size="sm"
                  variant="outline-info"
                  class="mx-2"
                >
                  <b-icon icon="chat" aria-label="Help"></b-icon> Send Message
                </b-button>
                <b-button
                  @click="deleteFriend(value)"
                  size="sm"
                  variant="outline-info"
                  class="mx-2"
                >
                  <b-icon icon="trash" aria-label="Help"></b-icon> Delete Friend
                </b-button>
              </b-col>
            </b-row>
          </b-list-group-item>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'FriendList',

  data() {
    return {
      url: process.env.VUE_APP_URL,
      keyword: '',
      isDelete: false
    }
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
