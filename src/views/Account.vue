<template>
  <div class="blue-bg">
    <FlashMessage class="flashmessage"></FlashMessage>
    <header class="no-top-bar">
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
              <h3 class="text-center header-title">MY ACCOUNT</h3>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row"></div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 bmt">
          <p class="btn-settings btn-block btn-lg">
            Team Name
            <br />
            <span style="user-input">{{ userteam.name }}</span>
            <img
              class="img-fluid back-arrow float-right"
              v-b-modal.modal-teamname
              src="@/assets/images/account/icon.svg"
              alt="arrow"
            />
          </p>
          <p class="btn-settings btn-block btn-lg">
            My Name
            <br />
            <span style="user-input">{{ profile.name }}</span>
            <img
              class="img-fluid back-arrow float-right"
              v-b-modal.modal-username
              src="@/assets/images/account/icon.svg"
              alt="arrow"
            />
          </p>
          <p class="btn-settings btn-block btn-lg">
            Email address
            <br />
            <span style="user-input">{{ profile.email }}</span>
            <img
              class="img-fluid back-arrow float-right"
              v-b-modal.modal-email
              src="@/assets/images/account/icon.svg"
              alt="arrow"
            />
          </p>

          <p class="btn-settings btn-block btn-lg">
            Change Password
            <br />
            <span style="user-input">******</span>
            <img
              class="img-fluid back-arrow float-right"
              v-b-modal.modal-password
              src="@/assets/images/account/icon.svg"
              alt="arrow"
            />
          </p>
          
          <p class="btn-settings btn-block btn-lg">
           <a
            @click.stop="delete_account"
            class="btn-success btn-block btn-lg text-center mb"
            >Delete Account</a
          >
          </p>

        </div>
      </div>
    </div>

    <!-- udpate team name api and functionality -->

    <div>
      <b-modal id="modal-teamname" title="Update team name">
        <p class="my-4"></p>

        <form @submit.prevent="EditTeamName('team_update')">
          <p class="white" style="font-size:20px; float:left;">
            Enter your team name
          </p>
          <input
            class="form-control login"
            style="background: no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
            type="text"
            placeholder="Enter Team name"
            name="name"
            id="name"
            v-model="teamnameform.name"
          />

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
      </b-modal>
    </div>

    <!-- udpate team name api and functionality -->

    <!-- udpate user name api and functionality -->

    <div>
      <b-modal id="modal-username" title="Update user name">
        <p class="my-4"></p>

        <form @submit.prevent="EditTeamName('name_update')">
          <p class="white" style="font-size:20px; float:left;">
            Enter Name to change
          </p>
          <input
            class="form-control login"
            style="background: no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
            type="text"
            placeholder="Enter Your Name"
            name="name"
            v-model="teamnameform.name"
          />

          <input
            :disabled="isProcessing"
            type="submit"
            value="Edit Your Name"
            class="mtx2 btn-primary text-center btn-sm"
          />

          <small
            class="error__control"
            v-if="Object.keys(error).length !== 0"
            >{{ error }}</small
          >
          <br />
        </form>
      </b-modal>
    </div>

    <!-- udpate user name api and functionality -->

    <!-- udpate user email api and functionality -->

    <div>
      <b-modal id="modal-email" title="Update Email">
        <p class="my-4"></p>

        <form @submit.prevent="EditTeamName('email_update')">
          <p class="white" style="font-size:20px; float:left;">
            Enter Email to change
          </p>
          <input
            class="form-control login"
            style="background: no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
            type="text"
            placeholder="Enter Your Email"
            name="email"
            v-model="teamnameform.email"
          />

          <input
            :disabled="isProcessing"
            type="submit"
            value="Edit Your Email"
            class="mtx2 btn-primary text-center btn-sm"
          />

          <small
            class="error__control"
            v-if="Object.keys(error).length !== 0"
            >{{ error }}</small
          >
          <br />
        </form>
      </b-modal>
    </div>

    <!-- udpate user email api and functionality -->

    <!-- udpate user password api and functionality -->

    <div>
      <b-modal id="modal-password" title="Update Email">
        <p class="my-4"></p>

        <form @submit.prevent="EditTeamName('password_update')">
          <p class="white" style="font-size:20px; float:left;">
            Enter Old Password
          </p>
          <input
            class="form-control login"
            style="background: no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
            type="password"
            placeholder="Old password"
            name="old_password"
            v-model="teamnameform.old_password"
          />

          <p class="white" style="font-size:20px; float:left;">
            Enter New Password
          </p>
          <input
            class="form-control login"
            style="background: no-repeat scroll 7px 7px; padding-left:40px !important; background-color:#fff;"
            type="password"
            placeholder="New Password"
            name="new_password"
            v-model="teamnameform.new_password"
          />

          <input
            :disabled="isProcessing"
            type="submit"
            value="Edit Your password"
            class="mtx2 btn-primary text-center btn-sm"
          />

          <small
            class="error__control"
            v-if="Object.keys(error).length !== 0"
            >{{ error }}</small
          >
          <br />
        </form>
      </b-modal>
    </div>

    <!-- udpate user password api and functionality -->
  </div>
</template>
<script type="text/javascript">
import Auth from "../assets/store/auth";
import { get, post } from "../assets/helpers/api";
import Status from "../assets/helpers/status";
export default {
  data() {
    return {
      teamnameform: {
        name: "",
        old_password: "",
        new_password: ""
      },
      error: {},
      isProcessing: false,
      auth: null,
      status: null,
      profile: "",
      userteam: ""
    };
  },
  created() {
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      //this.$router.push({path: '/overview'});
    } else {
      Auth.set("", "", "");
      this.$router.push({ path: "/login" });
    }
    if (Auth.state.error) {
      this.error = Auth.state.error.includes("+")
        ? Auth.state.error.replace(/\+/gi, " ")
        : Auth.state.error;
    }

    this.isProcessing = true;
    this.error = {};
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      get(`https://backend.fantasyfootballscotland.com/api/user/profile`)
        .then(response => {
          console.log(response.data);
          if (response.data == "") {
            this.flashMessage.error({
              title: "Error",
              message: "Error fetching your profile data",
              time: 3000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
          } else {
            this.profile = response.data.user;
            this.userteam = response.data.team;
            //console.log(this.profile);
          }
        })
        .catch(error => {
          console.log(error);
          this.flashMessage.error({
            title: "Error",
            message: "Error fetching team players",
            time: 5000,
            flashMessageStyle: {
              backgroundColor: "linear-gradient(#e66465, #9198e5)"
            }
          });
        });
      this.isProcessing = false;
    } else {
      Auth.set("", "", "");
      this.$router.push({ path: "/login" });
    }
  },
  computed: {},
  methods: {
      delete_account() {
      get(`https://backend.fantasyfootballscotland.com/api/user/delete_user`)
        .then(response => {
          if (response.data) {
            Auth.set("", "", "");
            Auth.remove();

            this.flashMessage.success({
              title: "Success:",
              message: response.data.message,
              time: 3000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });


            this.$router.push({ path: "/login" });
          }
        })
        .catch(err => {
          Auth.set("", "", "");
          Auth.remove();
          this.$router.push({ path: "/login" });
        });
      },
    EditTeamName(update_url) {
      this.isProcessing = true;
      this.error = {};
      post(
        `https://backend.fantasyfootballscotland.com/api/user/` + update_url,
        this.teamnameform
      )
        .then(response => {
          if (response.data) {
            this.flashMessage.success({
              title: "Success:",
              message: response.data.message,
              time: 3000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });

            setTimeout(
              function() {
                //this.$router.push({path: '/settings/account'});
                window.location.reload(true);
              }.bind(this),
              4000
            );
          }
          this.isProcessing = false;
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error",
            message: err.response.data.error,
            time: 5000,
            flashMessageStyle: {
              backgroundColor: "linear-gradient(#e66465, #9198e5)"
            }
          });
        });
    },
    logout() {
      Auth.set("", "", "");
      get(`https://backend.fantasyfootballscotland.com/api/logout`)
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
