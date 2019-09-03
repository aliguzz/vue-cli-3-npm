<template>
  <div class="white-bg-100">
    <FlashMessage class="flashmessage"></FlashMessage>

    <header class="top-bar">
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

            <h3 class="text-center header-title">Private</h3>
            <router-link
              to="/joinleague"
              class="btn-default text-center btn-sm float-right btn-header"
              >Join</router-link
            >
          </div>
        </div>
      </div>
    </header>

    <div>
      <b-modal id="modal-1" title="Share League Code">
        <p class="my-4">{{ testingCode }}</p>
        <input type="hidden" id="testing-code" :value="testingCode" />
        <span
          class="btn btn-info text-white copy-btn ml-auto"
          @click.stop.prevent="copyTestingCode"
          >Copy</span
        >
      </b-modal>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-7 mt">
          <h3 class="mt">
            <strong>{{ league_owner_data.league_name }}</strong>
          </h3>
          <h4 class="mt">
            <strong>{{ league_owner_data.user_name }}</strong>
          </h4>
          <h4>
            <strong>Pin {{ league_owner_data.league_code }}</strong>
          </h4>
        </div>
        <div class="col-5 mtx2">
          <a
            v-b-modal.modal-1
            class="btn-primary text-center btn-sm float-right"
            >Share</a
          >
          <br />
          <div class="bmt">
            <a
              @click="leaveleague()"
              class="btn-success text-center btn-sm float-right"
              >Leave</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 mtx2">
          <h3 class="small-title">
            <strong>Player Overview</strong>
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 smt">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Pos</th>
                <th scope="col">Team/Manager</th>
                <th scope="col">GW</th>
                <th scope="col">Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(league, index) in leagues">
                <th scope="row">
                  <img
                    class="img-fluid float-left up-down"
                    src="@/assets/images/leagues/up.svg"
                    alt="arrow up"
                  />
                  {{ index + 1 }}
                </th>
                <td>
                  <router-link :to="'/otherteam/' + league.team_id">
                    <strong>{{ league.name }}</strong>
                    <br />
                    {{ league.user_name }}
                  </router-link>
                </td>
                <td>{{ league.gameweek }}</td>
                <td>{{ league.totalteams_points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container-fluid footer-icons pt pb">
        <div class="row">
          <div class="col-3">
            <router-link to="/leagues">
              <img
                class="img-fluid mx-auto d-block menu-icons"
                src="@/assets/images/home-no-players/league-icon.svg"
                alt="league"
              />
              <p class="menu-label mb0">LEAGUES</p>
            </router-link>
          </div>
          <div class="col-3">
            <router-link to="/overview">
              <img
                class="img-fluid mx-auto d-block menu-icons"
                src="@/assets/images/home-no-players/team-icon.svg"
                alt="team"
              />
              <p class="menu-label mb0">TEAM</p>
            </router-link>
          </div>
          <div class="col-3">
            <router-link to="/transfermarket/all">
              <img
                class="img-fluid mx-auto d-block menu-icons"
                src="@/assets/images/home-no-players/transfers-icon.svg"
                alt="transfers"
              />
              <p class="menu-label mb0">MARKET</p>
            </router-link>
          </div>
          <div class="col-3">
            <router-link to="/settings">
              <img
                class="img-fluid mx-auto d-block menu-icons"
                src="@/assets/images/home-no-players/settings-icon.svg"
                alt="settings"
              />
              <p class="menu-label mb0">SETTINGS</p>
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
      error: {},
      isProcessing: false,
      auth: null,
      status: null,
      playerdetails: "",
      playerposition: "",
      player_game_week: "",
      league_owner_data: "",
      team_total_points: "",
      leagues: "",
      hostname: "",
      testingCode: ""
    };
  },
  created() {
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      //this.$router.push({path: '/buy-player'});
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
      get(
        `https://backend.fantasyfootballscotland.com/api/league/details/` +
          this.$route.params.leagueId
      )
        .then(response => {
          console.log(response.data);

          //this.playerdetails = response.data.PlayerDetail;
          this.league_owner_data = response.data.league_owner_data;
          this.team_total_points = response.data.league_owner_data;
          this.leagues = response.data.leagues;

          var protocol = location.protocol;
          var slashes = protocol.concat("//");
          var host = slashes.concat(window.location.host);
          this.hostname = host;
          this.testingCode =
            this.hostname + "/joinleague/" + this.league_owner_data.league_code;
        })
        .catch(error => {
          console.log(error);
          this.flashMessage.error({
            title: "Error",
            message: "Error fetching player details",
            time: 5000,
            flashMessageStyle: {
              backgroundColor: "linear-gradient(#e66465, #9198e5)"
            }
          });

          setTimeout(
            function() {
              //this.$router.push({path: '/myteam'});
            }.bind(this),
            4000
          );
        });
      this.isProcessing = false;
    } else {
      Auth.set("", "", "");
      this.$router.push({ path: "/login" });
    }
  },
  computed: {},

  methods: {
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        this.flashMessage.success({
          title: "Success",
          message: "Link Copied Share with your friends",
          time: 3000,
          flashMessageStyle: {
            backgroundColor: "linear-gradient(#e66465, #9198e5)"
          }
        });
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    leaveleague() {
      this.isProcessing = true;
      this.error = {};
      get(
        `https://backend.fantasyfootballscotland.com/api/league/leave/` +
          this.$route.params.leagueId
      )
        .then(response => {
          //console.log(response.data);
          if (response.data.status != "200") {
            this.flashMessage.error({
              title: "Error",
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
              4000
            );
          } else {
            this.flashMessage.success({
              title: "Success",
              message: response.data.message,
              time: 3000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
            this.$router.push({ path: "/leagues" });
            console.log(response.data);
          }
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

<style>

</style>
