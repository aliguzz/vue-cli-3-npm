<template>
  <div class="white-bg-100">
    <FlashMessage class="flashmessage"></FlashMessage>

    <header class="top-bar">
      <div class="container header-padding">
        <div class="row">
          <div class="col-12">
            <div class="inline-block">
              <router-link to="/myteam">
                <img
                  class="img-fluid back-arrow float-left"
                  src="@/assets/images/select-players/back-arrow.svg"
                  alt="arrow"
                >
              </router-link>
              <h3 class="text-center header-title">Leagues</h3>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-7 mt">
          <img
            class="img-fluid mr float-left"
            src="@/assets/images/leagues/logo-ball.svg"
            alt="logo ball"
          >
          <h3 class="mt">
            <strong>Your Leagues</strong>
          </h3>
        </div>
        <div class="col-5">
            <router-link to="/joinleague" class="mt btn-default text-center btn-sm btn-block">Join</router-link>
            <router-link to="/createleague" class="mt btn-primary text-center btn-sm btn-block">Create</router-link>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 smt">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Pos</th>
                <th scope="col">League</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="league in leagues">
                <td scope="row" v-if="league.previous_position > league.current_position">
                  <img
                    class="img-fluid float-left up-down"
                    src="https://fantasyfootball.adeogroup.co.uk/img/images/leagues/down.svg"
                    alt="arrow down"
                  >
                  {{ league.myposition }}
                </td>
                <td scope="row" v-else-if="league.previous_position < league.current_position">
                  <img
                    class="img-fluid float-left up-down"
                    src="https://fantasyfootball.adeogroup.co.uk/img/images/leagues/up.svg"
                    alt="arrow up"
                  >
                  {{ league.myposition }}
                </td>
                <td scope="row" v-else>
                  <img
                    class="img-fluid float-left up-down"
                    width="30"
                    src="@/assets/images/leagues/minus.svg"
                    alt="arrow up"
                  >
                  {{ league.myposition }}
                </td>

                <td>
                  <router-link :to="'/league/' + league.league_id">
                    {{ league.league_name }}
                    <img
                      class="img-fluid float-right"
                      src="@/assets/images/leagues/next-arrow.svg"
                      alt="next arrow"
                    >
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 smt padd_bottom">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Team Overview</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Overall Points</th>
                <td class="align-right">{{ team_total_points[0] }}</td>
              </tr>
              <tr>
                <th scope="row">Overall Rank</th>
                <td class="align-right">{{ overallrank }}</td>
              </tr>
              <tr>
                <th scope="row">Budget Left</th>
                <td class="align-right">£{{ leagues ? leagues[0].budget : 0.0 }}m</td>
              </tr>
              <tr></tr>
              <tr>
                <th scope="row">Bench Boost</th>
                <td class="align-right">
                  {{
                  (bench_boost_used != 1)
                  ? "Unused"
                  : "Used"
                  }}
                </td>
              </tr>
              <tr></tr>
              <tr>
                <th scope="row">Triple Captain</th>
                <td class="align-right">
                  {{
                  (triple_captain_used != 1)
                  ? "Unused"
                  : "Used"
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Wildcard</th>
                <td class="align-right">
                  {{
                  (wildcard_used != 1) ? "Unused" : "Used"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
<footer>
    <div class="container-fluid footer-icons pt pb">
        <div class="row">
          <div class="col-3">
            <router-link to="/leagues">
              <img
                class="img-fluid mx-auto d-block menu-icons"
                src="@/assets/images/home-no-players/league-icon.svg"
                alt="league"
              >
              <p class="menu-label mb0">LEAGUES</p>
            </router-link>
          </div>
          <div class="col-3">
            <router-link to="/overview">
              <img
                class="img-fluid mx-auto d-block menu-icons"
                src="@/assets/images/home-no-players/team-icon.svg"
                alt="team"
              >
              <p class="menu-label mb0">TEAM</p>
            </router-link>
          </div>
          <div class="col-3">
            <router-link to="/transfermarket/all">
              <img
                class="img-fluid mx-auto d-block menu-icons"
                src="@/assets/images/home-no-players/transfers-icon.svg"
                alt="transfers"
              >
              <p class="menu-label mb0">MARKET</p>
            </router-link>
          </div>
          <div class="col-3">
            <router-link to="/settings">
              <img
                class="img-fluid mx-auto d-block menu-icons"
                src="@/assets/images/home-no-players/settings-icon.svg"
                alt="settings"
              >
              <p class="menu-label mb0">SETTINGS</p>
            </router-link>
          </div>
      </div>
    </div>
    </footer>
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
      team_total_points: "",
      overallrank: 0,
      leagues: "",
      site_settings: "",
      bench_boost_used: 0,
      wildcard_used: 0,
      triple_captain_used: 0
    };
  },
  created() {
    if (Auth.state.api_token !== "" && Auth.state.user_id !== "") {
      this.isProcessing = true;
      this.error = {};
      get(`https://backend.fantasyfootballscotland.com/api/league/all`)
        .then(response => {
          this.team_total_points = response.data.team_total_points;
          this.leagues = response.data.leagues;
          this.overallrank = response.data.overallrank;
          this.bench_boost_used = response.data.fantasyteam.bench_boost_used;
          this.triple_captain_used = response.data.fantasyteam.triple_captain_used;
          this.wildcard_used = response.data.fantasyteam.wildcard_used;
          this.site_settings = JSON.parse(Auth.state.site_settings);
          //console.log(this.site_settings);
        })
        .catch(error => {
          //console.log(error);
          //Auth.set('','','');
          //this.$router.push({path: '/login'});
        });
      this.isProcessing = false;
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
    login() {
      this.isProcessing = true;
      this.error = {};
      post("https://backend.fantasyfootballscotland.com/api/league/all", this.form)
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
    }
  }
};
</script>

<style>
body {
  background: #eee !important;
}
</style>
