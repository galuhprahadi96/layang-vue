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
            placeholder="search by phone or email"
            v-on:keyup.enter="search"
          ></b-form-input>
        </b-col>
      </b-row>
      <div class="text-center">
        <p>add your friend first</p>
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
