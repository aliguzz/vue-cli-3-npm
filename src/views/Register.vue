<template>
  <div class="blue-bg">
    <div class="container">
      <div
        class="row justify-content-center form-align"
        style="margin-left: 0px;"
      >
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
          <form @submit.prevent="register" id="login-form">
            <small
              class="error__control"
              v-show="Object.keys(error).length !== 0"
              >{{ error }}</small
            >
            <br />
            <input
              class="form-control login mtx2"
              style="background: url('https://backend.fantasyfootballscotland.com/img/images/login/mail.svg') no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
              type="text"
              placeholder="Enter Email"
              name="email"
              id="email"
              v-model="form.email"
            />

            <input
              class="form-control login mtx2"
              style="background: url('https://backend.fantasyfootballscotland.com/img/images/login/mail.svg') no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
              type="text"
              placeholder="Enter Name"
              name="name"
              id="name"
              v-model="form.name"
            />

            <input
              class="form-control login mtx2"
              style="background: url('https://backend.fantasyfootballscotland.com/img/images/login/lock.svg') no-repeat scroll 6px 5px; background-size:25px 25px; padding-left:40px !important; background-color:#fff;"
              type="password"
              placeholder="Enter Password"
              name="password"
              id="pass"
              v-model="form.password"
            />

            <input
              class="form-control login mtx2"
              style="background: url('https://backend.fantasyfootballscotland.com/img/images/login/lock.svg') no-repeat scroll 6px 5px; background-size:25px 25px; padding-left:40px !important; background-color:#fff;"
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirm"
              id="passConfirm"
              v-model="form.password_confirmation"
            />

            <input
              :disabled="isProcessing"
              type="submit"
              value="Register"
              class="mtx2 btn-primary text-center btn-sm"
            />
          </form>

          <router-link to="/login">
            <p class="mt white">
              Already have an account?
              <span class="light-blue"></span><span style="text-decoration:underline">Sign In</span>
            </p>
          </router-link>
        </div>
      </div>
      <FlashMessage class="flashmessage"></FlashMessage>
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
        name: "",
        email: "",
        password: "", 
        password_confirmation: ""
      },
      bannedwords: "",
      res_message: "",
      error: {},
      isProcessing: false
    };
  },
   created() {
      get(
        `https://backend.fantasyfootballscotland.com/bannedwordslist`
      )
        .then(response => {
          this.bannedwords = response.data.split(",");
          // console.log(this.bannedwords);
        })
  },
  methods: {
    register() {
      this.isProcessing = false;
      this.error = {};

        for (var i = 0; i < this.bannedwords.length; i++) {
    			if (this.form.name.includes(this.bannedwords[i])) {
            //this.form.name = this.form.name.replace(this.bannedwords[i], "*".repeat(this.bannedwords[i].length))
            this.form.name = this.bannedwords[i][0] + new Array(this.bannedwords[i].length - 1).join('*') + this.bannedwords[i][this.bannedwords[i].length - 1]
	    		}
    		}

      post("https://backend.fantasyfootballscotland.com/api/register", this.form)
        .then(response => {
          if (response.data.token) {
            // Auth.set(response.data.token, response.data.user_id, response.data.site_settings);
            // Status.setSuccess('You have successfully created an account!');

            this.flashMessage.success({
              title: "Signed up!",
              message:
                "Your account has been created",
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });

            setTimeout(
              function() {
                this.$router.push({ path: "/login" });
              }.bind(this),
              5000
            );
          }
          this.isProcessing = false;
        })
        .catch(err => {
          if (err.response.data.errors) {
            //this.error = err.response.data.errors;

            if(typeof err.response.data.errors.name !== "undefined"){
                if(err.response.data.errors.name[0] !== ""){
                  this.res_message = err.response.data.errors.name[0];
                }
            }
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
            if(typeof err.response.data.errors.email !== "undefined" && typeof err.response.data.errors.password !== "undefined" && typeof err.response.data.errors.name !== "undefined"){
                if(err.response.data.errors.email[0] !== '' && err.response.data.errors.password[0] !== ''){
                  this.res_message = "Name, Email and password fields are required";
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
          if (err.response.data.error) {
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
          if (err.response.data.ErrorMessage) {
            //this.error = err.response.data.errors;

            this.flashMessage.error({
              title: "Error",
              message: err.response.data.ErrorMessage.error,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
          }
          this.isProcessing = false;
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
.navbar {
  display: none;
}
</style>
