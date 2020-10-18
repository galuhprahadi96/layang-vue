<template>
  <div>
    <b-container>
      <div class="cform-wrap">
        <b-form @submit.prevent="onLogin">
          <div class="cform-title mb-2" style="text-align: center">
            <span>Login</span>
          </div>
          <div class="mb-3" style="text-align: left; font-size:14px">
            <p>Hi, Wellcome Back</p>
          </div>
          <b-alert variant="danger" :show="isAlert">{{ isMsg }}</b-alert>
          <div class="cform-group">
            <label class="label" style="font-size:14px">Email</label>
            <input
              type="email"
              v-model="form.user_email"
              class="cform-control"
              placeholder="Input Your Email"
              style="font-size:14px"
              required
            />
            <label class="label" style="font-size:14px">Password</label>
            <input
              type="password"
              v-model="form.user_password"
              class="cform-control"
              placeholder="Input Your Password"
              style="font-size:14px"
              required
            />
            <div style="text-align: right; font-size:14px">
              <router-link to="/forgot-password" class="cform-link"
                >Forgot Password?</router-link
              >
            </div>
          </div>

          <div class="cform-button">
            <b-button type="submit" class="my-primary">
              <b-spinner small v-show="isLoading"></b-spinner>
              <span>Login</span>
            </b-button>
          </div>
          <div class="mb-3" style="text-align: center; font-size:14px">
            <p>Login with</p>
          </div>
          <div class="cform-button">
            <b-button type="submit" class="my-google">
              <b-spinner small v-show="isLoading"></b-spinner>
              <span>Google</span>
            </b-button>
          </div>
          <div class="cform-text" style="font-size:14px">
            <span
              >Don't have an account?
              <router-link to="/register" class="cform-link"
                >Sign Up</router-link
              ></span
            >
          </div>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      isMsg: '',
      isAlert: false,
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    onLogin() {
      this.isLoading = true
      this.login(this.form)
        .then(result => {
          this.form = ''
          this.isAlert = false
          this.isMsg = ''
          this.isLoading = false
          this.makeToast(result.msg)
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch(err => {
          // console.log(err)
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
