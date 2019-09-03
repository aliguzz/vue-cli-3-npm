<template>
  <div class="blue-bg">
    <header>
      <div class="container header-padding">
        <div class="row">
          <div class="col-12">
            <router-link to="/myteam">
              <img
                class="img-fluid back-arrow float-left"
                src="@/assets/images/select-players/back-arrow.svg"
                alt="arrow"
              />
            </router-link>
            <h3 class="text-center header-title">SETTINGS</h3>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-12 bmt">
          <a
            @click.stop="logout"
            class="btn-success btn-block btn-lg text-center mb"
            >Logout</a
          >

          <router-link
            to="/settings/account"
            class="btn-settings btn-block btn-lg text-center"
          >
            My Account
            <img
              class="img-fluid back-arrow float-right smt"
              src="@/assets/images/settings/arrow-blue.svg"
              alt="arrow"
            />
          </router-link>

          <router-link
            to="/settings/howtoplay"
            class="btn-settings btn-block btn-lg text-center"
          >
            How to play
            <img
              class="img-fluid back-arrow float-right smt"
              src="@/assets/images/settings/arrow-blue.svg"
              alt="arrow"
            />
          </router-link>

          <router-link
            to="/settings/faqs"
            class="btn-settings btn-block btn-lg text-center"
          >
            FAQs
            <img
              class="img-fluid back-arrow float-right smt"
              src="@/assets/images/settings/arrow-blue.svg"
              alt="arrow"
            />
          </router-link>

          <router-link
            to="/settings/terms"
            class="btn-settings btn-block btn-lg text-center"
          >
            Terms
            <img
              class="img-fluid back-arrow float-right smt"
              src="@/assets/images/settings/arrow-blue.svg"
              alt="arrow"
            />
          </router-link>

          <router-link
            to="/settings/privacypolicy"
            class="btn-settings btn-block btn-lg text-center"
          >
            Privacy Policy
            <img
              class="img-fluid back-arrow float-right smt"
              src="@/assets/images/settings/arrow-blue.svg"
              alt="arrow"
            />
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
  beforeMount() {},
  created() {
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      this.$router.push({ path: "/settings" });
    } else {
      Auth.set("", "", "");
      this.$router.push({ path: "/login" });
    }
    if (Auth.state.error) {
      this.error = Auth.state.error.includes("+")
        ? Auth.state.error.replace(/\+/gi, " ")
        : Auth.state.error;
    }
  },
  computed: {},
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: {},
      isProcessing: false,
      auth: null,
      status: null
    };
  },
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

            this.flashMessage.success({
              title: "Logged In: success",
              message: "",
              time: 3000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });

            this.auth = Auth;
            this.status = Status;
            setTimeout(
              function() {
                this.$router.push({ path: "/createteam" });
              }.bind(this),
              2000
            );
          }
          this.isProcessing = false;
        })
        .catch(err => {
          if (err.response.data.code === 422 && err.response.data.error) {
            console.log("inside here");
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
          this.isProcessing = false;
        });
    },
    logout() {
      Auth.set("", "", "");
      get("https://backend.fantasyfootballscotland.com/api/logout")
        .then(response => {
          if (response.data.logged_out) {
            Auth.set("", "", "");
            Auth.remove();
            this.$router.push({ path: "/login" });
          }
        })
        .catch(err => {
          Auth.set("", "", "");
          Auth.remove();
          this.$router.push({ path: "/login" });
        });
    }
  }
};
</script>
