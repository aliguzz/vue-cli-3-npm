<template>
  <div class="blue-bg">
    <FlashMessage class="flashmessage"></FlashMessage>
    <div class="container">
      <div class="row justify-content-center form-align">
        <div class="col-12 bmt">
          <router-link to="/">
            <img
              class="img-fluid mx-auto d-block"
              src="./../assets/images/login/short-logo.svg"
              alt="logo"
            />
          </router-link>
        </div>
        <div class="col-8 text-center bmt">
          <!-- input
            class="form-control login cursors"
            @click.stop="socialLogin('google')"
            style="background:url('https://backend.fantasyfootballscotland.com/img/images/login/google.svg') no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
            type="text"
            placeholder="Sign up with Google"
          />
          <input
            class="form-control login mt cursors"
            @click.stop="socialLogin('facebook')"
            style="background: url('https://backend.fantasyfootballscotland.com/img/images/login/facebook.svg') no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
            type="text"
            placeholder="Sign up with Facebook"
          / -->

          <form @submit.prevent="login" id="login-form">
            <input
              class="form-control login mtx2 marginedclass"
              style="background: url('https://backend.fantasyfootballscotland.com/img/images/login/mail.svg') no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
              type="text"
              placeholder="Enter Email"
              name="email"
              id="email"
              v-model="form.email"
            />

            <input
              class="form-control login mt"
              style="background: url('https://backend.fantasyfootballscotland.com/img/images/login/lock.svg') no-repeat scroll 6px 5px; background-size:25px 25px; padding-left:40px !important; background-color:#fff;"
              type="password"
              placeholder="Enter Password"
              name="password"
              id="pass"
              v-model="form.password"
            />
            <input
              :disabled="isProcessing"
              type="submit"
              value="Login"
              class="mtx2 btn-primary text-center btn-sm"
            />

            <small
              class="error__control"
              v-if="Object.keys(error).length !== 0"
              >{{ error }}</small
            >
            <br />
          </form>
          <router-link to="/register">
            <p class="mt white">
              Don't have an account?
              <span class="light-blue"></span><span style="text-decoration:underline">Register</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Auth from "../assets/store/auth";
import { get, post } from "../assets/helpers/api";
import Status from "../assets/helpers/status";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: {},
      isProcessing: false,
      res_message: '',
      auth: null,
      status: null
    };
  },
  created() {
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      //alert('if values are not null');
      this.$router.push({ path: "/myteam" });
    } else {
      Auth.set("", "", "");
      //alert('if values are null then redirect login');
      this.$router.push({ path: "/login" });
    }
    if (Auth.state.error) {
      //alert('if values are null then redirect third');
      this.error = Auth.state.error.includes("+")
        ? Auth.state.error.replace(/\+/gi, " ")
        : Auth.state.error;
    }
  },
  computed: {},
  methods: {
    login() {
      this.isProcessing = true;
      this.error = {};
      post("https://backend.fantasyfootballscotland.com/api/login", this.form)
        .then(response => {
          if (response.data.authenticated) {
            Auth.set(
              response.data.api_token,
              response.data.user_id,
              response.data.site_settings
            );
            Status.setSuccess("You have successfully logged in!");
            this.auth = Auth;
            this.status = Status;
            setTimeout(
              function() {
                this.$router.push({ path: "/myteam" });
              }.bind(this),
              2000
            );
          }
          this.isProcessing = false;
        })
        .catch(err => {
          //alert('here');
         
          if (err.response.data.error) {
            console.log("inside here error");
            //if(err.response.data.error){
            //this.error = err.response.data.errors;

            this.flashMessage.error({
              title: "Error",
              message: err.response.data.error,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
          }
           if (err.response.data.errors) {
            console.log("inside here errors");
            
            //console.log(typeof err.response.data.errors.email);
            if(typeof err.response.data.errors.email !== "undefined"){
                if(err.response.data.errors.email[0] !== ""){
                  this.res_message = err.response.data.errors.email[0];
                }
            }
            if(typeof err.response.data.errors.password !== "undefined"){
                if(err.response.data.errors.password[0] !== ''){
                  this.res_message = err.response.data.errors.password[0];
                }
            }
            if(typeof err.response.data.errors.email !== "undefined" && typeof err.response.data.errors.password !== "undefined"){
                if(err.response.data.errors.email[0] !== '' && err.response.data.errors.password[0] !== ''){
                  this.res_message = "Email and password fields are required";
                }
            }

            this.flashMessage.error({
              title: "Error",
              message: (this.res_message !== '') ? this.res_message : err.response.data.errors,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
          }
          this.isProcessing = false;
          this.form = "";
        });
    },
    socialLogin(provider) {
      this.isProcessing = true;
      this.error = {};
      get(`https://backend.fantasyfootballscotland.com/api/social/${provider}`)
        .then(response => {
          if (response.data.error) {
            this.error = response.data.error;
          } else if (response.data.redirectUrl) {
            window.location.href = response.data.redirectUrl;
          }
        })
        .catch(err => {
          if (err.response.data.error) {
            this.error = err.response.data.error;
          }
          this.isProcessing = false;
        });
      this.isProcessing = false;
    }
  }
};
</script>

<style>
.marginedclass {
  margin-top: 100px !important;
}
.navbar {
  display: none;
}
.cursors {
  cursor: pointer;
}
</style>
