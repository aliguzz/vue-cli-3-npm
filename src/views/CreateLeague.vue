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
          <form @submit.prevent="createLeague" id="login-form">
            <input
              class="form-control login mt"
              type="text"
              name="name"
              id="name"
              v-model="form.name"
              placeholder="Enter League Name"
            />
            <input
              :disabled="isProcessing"
              type="submit"
              value="Create League"
              class="btn-default btn-block btn-lg text-center mt"
            />
            <!-- <a href="#" class="btn-default btn-block btn-lg text-center mt"> Create League<img class="img-fluid mx-auto d-block float-right smt" src="@/assets/images/join-a-league/arrow-right.svg" alt="logo" /></a> -->
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
        name: ""
      },
      error: {},
      isProcessing: false,
      bannedwords: "",
      auth: null,
      status: null
    };
  },
  created() {
    this.bannedwords = JSON.parse(Auth.state.site_settings).banned_wordslist.split(",");
    if (Auth.state.api_token !== "" && Auth.state.user_id !== "") {
      this.$router.push({ path: "/createleague" });
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
    createLeague() {
      this.isProcessing = false;
      this.error = {};

        for (var i = 0; i < this.bannedwords.length; i++) {
    			if (this.form.name.includes(this.bannedwords[i])) {
            //this.form.name = this.form.name.replace(this.bannedwords[i], "*".repeat(this.bannedwords[i].length))
            this.form.name = this.bannedwords[i][0] + new Array(this.bannedwords[i].length - 1).join('*') + this.bannedwords[i][this.bannedwords[i].length - 1]
	    		}
    		}

      post(
        "https://fantasyfootball.adeogroup.co.uk/api/league/create",
        this.form
      )
        .then(response => {
          if (response.data) {
            this.flashMessage.success({
              title: "Created!",
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
            // console.log('inside here');
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
