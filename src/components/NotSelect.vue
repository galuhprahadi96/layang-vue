<template>
  <div class="bg">
    <div class="container-chat">
      <img
        class="container-img"
        :src="require('../assets/ilustration/chat.svg')"
      />
      <p>Please select a chat to start messaging</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotSelect',
  data() {
    return {
      url: process.env.VUE_APP_URL
    }
  }
}
</script>

<style scoped>
.bg {
  background-color: #fafafa;
  display: flex;
  height: 660px;
  flex-direction: column;
}
.container-chat {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  margin: auto;
  font-size: 1.2rem;
  line-height: 28px;
  color: #848484;
}
.container-img {
  opacity: 20%;
  color: #848484;
}
</style>
