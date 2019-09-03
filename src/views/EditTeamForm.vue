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
            <h3 class="text-center header-title">Team Settings</h3>
            
          </div>
        </div>
      </div>
    </header>
    <FlashMessage class="flashmessage"></FlashMessage>
    <div class="container">
      <div class="row justify-content-center form-align">
        <div class="col-8 text-center bmt">
          <form @submit.prevent="createTeam">
            <h3 class="white">Enter your team name</h3>
            <input
              class="form-control login mtx2"
              style="background: no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
              type="text"
              placeholder="Enter Team name"
              name="name"
              id="name"
              v-model="form.name"
            />

            <h3 class="white mtx2">Select team formation</h3>
            <select
              class="form-control login mtx2"
              style="background: no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
              type="text"
              placeholder="Select formations"
              name="formation"
              id="formation"
              v-model="form.formation"
            >
              <option v-for="tf in teamformation" :value="tf">{{ tf }}</option>
            </select>

            <input
              :disabled="isProcessing"
              type="submit"
              value="Edit Your Team"
              class="mtx2 btn-primary text-center btn-sm"
            />

            <small
              class="error__control"
              v-if="Object.keys(error).length !== 0"
              >{{ error }}</small
            >
            <br />
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
        name: this.$route.params.team_name,
        formation: this.$route.params.formation
      },
      error: {},
      isProcessing: false,
      sitesettings: "",
      bannedwords: "",
      teamformation: ""
    };
  },
  created() {
    this.teamformation = JSON.parse(Auth.state.site_settings).formation.split(
      ","
    );
    this.sitesettings = JSON.parse(Auth.state.site_settings);
    this.bannedwords = JSON.parse(Auth.state.site_settings).banned_wordslist.split(",");
    this.isProcessing = false;
    this.error = {};
    // console.log('createteam console');
    // console.log(Auth.state.site_settings);
    // console.log(JSON.parse(Auth.state.site_settings));
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
    } else {
      //alert('inside if api key doesnot exist condition');
      Auth.set("", "", "");
      Auth.remove();
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    createTeam() {
      this.isProcessing = false;
      this.error = {};

        for (var i = 0; i < this.bannedwords.length; i++) {
    			if (this.form.name.includes(this.bannedwords[i])) {
            //this.form.name = this.form.name.replace(this.bannedwords[i], "*".repeat(this.bannedwords[i].length))
            this.form.name = this.bannedwords[i][0] + new Array(this.bannedwords[i].length - 1).join('*') + this.bannedwords[i][this.bannedwords[i].length - 1]
	    		}
    		}

//console.log(this.bannedwords);
     // throw new Error();
      post("https://backend.fantasyfootballscotland.com/api/team/edit", this.form)
        .then(response => {
          if (response.data.user_id) {
            this.flashMessage.success({
              title: "Changed!",
              message: response.data.message,
              time: 4000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });

            setTimeout(
              function() {
                this.$router.push({ path: "/myteam" });
              }.bind(this),
              4000
            );
          } else {
            this.flashMessage.error({
              title: "Error",
              message: response.data.error,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });

            setTimeout(
              function() {
                this.$router.push({ path: "/myteam" });
              }.bind(this),
              4000
            );
          }
          this.isProcessing = false;
        })
        .catch(err => {
          if (err.code === 422 && err.response.data.error) {
            //this.error = err.response.data.errors;

            this.flashMessage.error({
              title: "Error",
              message: err.response.data.message,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
          }
          this.isProcessing = false;
        });
    }
  },
  editTeam() {
    this.isProcessing = true;
    this.error = {};
    post("https://backend.fantasyfootballscotland.com/api/team/create", this.form)
      .then(response => {
        if (response.data.FantasyTeam) {
          this.flashMessage.success({
            title: "Success",
            message: response.data.message,
            time: 4000,
            flashMessageStyle: {
              backgroundColor: "linear-gradient(#e66465, #9198e5)"
            }
          });

          setTimeout(
            function() {
              this.$router.push({ path: "/myteam" });
            }.bind(this),
            4000
          );
        } else {
          this.flashMessage.error({
            title: "Error",
            message: response.data.error,
            time: 5000,
            flashMessageStyle: {
              backgroundColor: "linear-gradient(#e66465, #9198e5)"
            }
          });

          setTimeout(
            function() {
              this.$router.push({ path: "/myteam" });
            }.bind(this),
            4000
          );
        }
        this.isProcessing = false;
      })
      .catch(err => {
        if (err.code === 422 && err.response.data.error) {
          //this.error = err.response.data.errors;

          this.flashMessage.error({
            title: "Error",
            message: err.response.data.message,
            time: 5000,
            flashMessageStyle: {
              backgroundColor: "linear-gradient(#e66465, #9198e5)"
            }
          });
        }
        this.isProcessing = false;
      });
  }
};
</script>

<style>
.navbar {
  display: none;
}
</style>
