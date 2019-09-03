<template>
  <div class="blue-bg">
    <FlashMessage class="flashmessage"></FlashMessage>

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
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row"></div>
    </div>

    <div class="container">
      <div class="row justify-content-center form-align">
        <div class="col-12 bmt">
          <img
            class="img-fluid mx-auto d-block"
            src="@/assets/images/login/short-logo.svg"
            alt="logo"
          />
        </div>
        <div class="col-8 text-center bmt">
          <div class="alert alert-primary" role="alert">
            <img
              class="img-fluid mx-auto d-block float-left padding-icon-alert"
              src="@/assets/images/join-a-league/warning.svg"
              alt="logo"
            />Enter your private league code provided by the league Chairman
          </div>
          <form @submit.prevent="joinLeague" id="login-form">
            <input
              class="form-control login mt"
              type="text"
              name="league_code"
              id="league_code"
              v-model="form.league_code"
              placeholder="Enter League Code"
            />

            <input
              :disabled="isProcessing"
              type="submit"
              value="Join League"
              class="btn-default btn-block btn-lg text-center mt"
            />
          </form>
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
        league_code: ""
      },
      error: {},
      isProcessing: false,
      auth: null,
      status: null
    };
  },
  created() {
    this.form.league_code = this.$route.params.league_code;

    if (Auth.state.api_token !== "" && Auth.state.user_id !== "") {
      //this.$router.push({path: '/joinleague'});
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
  methods: {
    joinLeague() {
      this.isProcessing = true;
      this.error = {};
      post("https://backend.fantasyfootballscotland.com/api/league/join", this.form)
        .then(response => {
          if (response.data) {
            this.flashMessage.success({
              title: "Success",
              message: response.data.message,
              time: 3000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });

            setTimeout(
              function() {
                this.$router.push({ path: "/leagues" });
              }.bind(this),
              3000
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
    }
  }
};
</script>
