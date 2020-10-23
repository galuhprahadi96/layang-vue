<template>
  <b-container fluid class="cont-main">
    <b-row style="margin-right:0px; margin-left:0px;">
      <b-col cols="12" md="3" lg="3" class="list-room"><List /></b-col>
      <b-col
        v-show="isSelected"
        cols="12"
        md="9"
        lg="9"
        style="padding-left:0; padding-right:0;"
        ><MessageRoom
      /></b-col>
      <b-col
        v-show="!isSelected"
        cols="12"
        md="9"
        lg="9"
        style="padding-left:0;"
        ><NotSelect
      /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'
import List from '../components/List'
import MessageRoom from '../components/Message'
import NotSelect from '../components/NotSelect'
export default {
  name: 'Home',
  data() {
    return {
      socket: io(process.env.VUE_APP_URL)
    }
  },
  components: {
    List,
    NotSelect,
    MessageRoom
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      isSelected: 'getSelect',
      room: 'roomList'
    })
  },
  created() {
    this.getUserById(this.user)
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        const payload = {
          user_id: this.user.user_id,
          form: this.coordinate
        }
        this.patchLocation(payload).then(res => {
          console.log(res.msg)
          this.getUserById(this.user)
        })
      })
      .catch(error => {
        alert(error)
      })
  },
  mounted() {
    this.socket.on('notifMessage', (data) => {
      if (this.user.user_id === data.getter) { 
        this.getRoomByUserId(this.user.user_id)
        this.makeNotif(data.sender_name, data.message, 'primary')
      }
    })
  },
  methods: {
    ...mapActions(['getUserById', 'patchLocation', 'getRoomByUserId']),
    makeNotif(title, msg, variant = null, append = false) {
      const h = this.$createElement
      const vNodesTitle = h (
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline'] },
        [
          h('b-badge', { variant: 'danger' }, 'New'),
          h('strong', { class: 'ml-2' }, `${title}`)
        ]
      )
      this.$bvToast.toast(`${msg}`, {
        title: [vNodesTitle],
        autoHideDelay: 5000,
        appendToast: append,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.list-room {
  position: relative;
  display: flex;
  height: 660px;
  padding-right: 0;
  padding-left: 0;
}
.cont-main {
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
}
</style>
