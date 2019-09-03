<template>
  <div class="bg-grey">
    <header class="top-bar">
      <div class="container header-padding">
        <div class="row">
          <div class="col-12">
            <div class="inline-block">
              <router-link to="/settings">
                <img
                  class="img-fluid back-arrow float-left"
                  src="@/assets/images/select-players/back-arrow.svg"
                  alt="arrow"
                />
              </router-link>
              <h3 class="text-center header-title">FAQs</h3>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-12 mt">
          <img
            class="img-fluid mr float-left"
            src="@/assets/images/leagues/logo-ball.svg"
            alt="logo ball"
          />
          <h3 class="mt">
            <strong>FAQ's</strong>
          </h3>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 bmt">
          <h1 class>My Fantasy Football Scotland account</h1>

          <h3
            class
          >I’m having trouble signing in to my Fantasy Football Scotland account. What do I do?</h3>
          <p>Please ensure you are using your registered email address and correct password. Note that the password is case sensitive. If you have forgotten your password click on the ‘Forgotten password?’ option on the sign up page, enter your email address and check your inbox. Alternatively, reach out to one of our social media accounts - Twitter: @FantasyScotland, Facebook: @FantasyFootballScotland.</p>
          <h3 class>How do I change my password?</h3>
          <p>Click on the Settings tab at the bottom of your page. You will find an option to change your password in the My Account section.</p>

          <h3 class>How do I delete my Fantasy Football Scotland account?</h3>
          <p>Please get in touch through the Contact Us tab in Settings and we will take care of your account, deleting it from our records at your request.</p>

          <h2 class>Player data</h2>

          <h3 class>When is the game updated?</h3>
          <p>Player points are awarded around two hours after full time of the final match of any given game week, when all matches have been played.</p>
          <h3 class>What happens when red cards are rescinded?</h3>
          <p>So we all know that Scottish football has a certain way when it comes to the reviewing of refereeing decisions. For a fantasy football game, it could make things messy. So we have a straightforward mantra - all decisions made on the pitch are final.</p>
          <h3 class>How do player prices change?</h3>
          <p>Over the course of the season player prices will be affected by how many users are transferring players in and out of their team.</p>
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
      //this.$router.push({path: '/settings'});
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

<style>
h2, h3{
  text-transform: capitalize !important ; 
}
</style>