<template>
  <div>
    <b-container>
      <div class="cform-wrap">
        <b-form @submit.prevent="onRegister">
          <div class="back">
            <router-link to="/login"
              ><b-icon icon="chevron-left" variant="primary"></b-icon
            ></router-link>
          </div>
          <div class="cform-title mb-2" style="text-align: center">
            <span>Register</span>
          </div>
          <div class="mb-3" style="text-align: left; font-size:14px">
            <p>Let's create your account</p>
          </div>
          <b-alert variant="danger" :show="isAlert">{{ isMsg }}</b-alert>
          <div class="cform-group">
            <label class="label" style="font-size:14px; margin-bottom: -15px"
              >Name</label
            >
            <input
              type="text"
              v-model="form.user_name"
              class="cform-control"
              placeholder="Input Your Name"
              style="font-size:14px"
              required
            />
            <label class="label" style="font-size:14px; margin-bottom: -15px"
              >Email</label
            >
            <input
              type="text"
              v-model="form.user_email"
              class="cform-control"
              placeholder="Input Your Email"
              style="font-size:14px"
              required
            />
            <label class="label" style="font-size:14px; margin-bottom: -15px"
              >Phone</label
            >
            <input
              type="number"
              v-model="form.user_phone"
              class="cform-control"
              placeholder="Input Your phone"
              style="font-size:14px"
              required
            />
            <label class="label" style="font-size:14px; margin-bottom: -15px"
              >Password</label
            >
            <input
              type="password"
              v-model="form.user_password"
              class="cform-control"
              placeholder="Input Your Password"
              style="font-size:14px"
              required
            />
          </div>

          <div class="cform-button">
            <b-button type="submit" class="my-primary">
              <b-spinner small v-show="isLoading"></b-spinner>
              <span>Register</span>
            </b-button>
          </div>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      isLoading: false,
      isMsg: '',
      isAlert: false,
      form: {
        user_name: '',
        user_email: '',
        user_phone: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onRegister() {
      this.isLoading = true
      this.register(this.form)
        .then(result => {
          this.makeToast(result.msg)
          this.form = ''
          this.isLoading = false
          this.isAlert = false
          this.isMsg = ''
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        })
        .catch(err => {
          this.isLoading = false
          this.isAlert = true
          this.isMsg = err.data.msg
        })
    },
    makeToast(msg, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 10000,
        appendToast: append
      })
    }
  }
}
</script>

<style scoped>
.back {
  left: 20px;
  top: 20px;
  position: absolute;
  color: blueviolet;
}
.my-primary {
  background-color: rgb(180, 101, 255);
  border: 1px solid rgb(180, 101, 255);
}
.my-google {
  background-color: white;
  color: rgb(180, 101, 255);
  border: 1px solid rgb(180, 101, 255);
}
.cform-wrap {
  position: relative;
  width: 400px;
  text-align: left;
  margin: 50px auto;
  background: #fff;
  padding: 33px 55px 33px 55px;
  border-radius: 10px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
}

.cform-header {
  margin-bottom: 30px;
  text-align: center;
}

.cform-title {
  font-weight: 600;
  font-size: 20px;
  display: block;
}

.cform-subtitle {
  font-weight: 500;
  color: #57cad5;
  font-size: 20px;
}

.cform-group {
  margin: 20px 0 20px 0;
}

.cform-group input {
  margin-bottom: 20px;
  text-align: left;
  border-bottom: 3px solid #3333;
  transition: all 0.5s;
}

.cform-group input:focus {
  border-color: #57cad5;
}

.cform-control {
  width: 100%;
  border: 0;
  height: 40px;
  outline: none;
}

.cform-button {
  text-align: center;
  margin-bottom: 20px;
}

.cform-button button {
  border-radius: 50px;
  outline: none;
  width: 95%;
}

.cform-text {
  text-align: center;
  color: #333333;
}

.cform-link:hover {
  text-decoration: none;
}
</style>
