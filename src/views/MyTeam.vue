<template class="noscroll">
  <div class="home-bg">
    <FlashMessage class="flashmessage"></FlashMessage>

    <!-- code for empty team players -->

    <header class="top-bar mb0">
      <router-link to="/myteam">
        <img
          class="img-fluid mx-auto d-block logo-menu pt pb"
          src="@/assets/images/home-no-players/logo-menu.svg"
          alt="logo"
        />
      </router-link>
    </header>

    <div class="container-fluid name-input">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <router-link :to="'/editteam/' + fantasyteam.name + '/'+ fantasyteam.formation">
              <h4 class="text-center name-input-text">
                {{ fantasyteam.name }}
                <img
                  class="img-fluid float-right"
                  src="@/assets/images/home-no-players/settings-icon.svg"
                  alt="logo"
                  style="width:16px;"
                />
              </h4>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid deadline">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h5 class="text-center deadline-text">Deadline: {{ sitesettings.gameweek_deadline }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="pitch pb small-iphone-fix pitch-background">
      <div class="row">
        <div class="col-12">
          <div class="row mt">
            <!--points row-->
            <div class="col-4">
              <h2 class="budget">£{{ fantasyteam.budget }}m</h2>
              <h5 class="budget">BUDGET</h5>
            </div>
            <div class="col-4">
              <h2 class="points">{{ team_total_points }}</h2>
              <h5 class="points">POINTS</h5>
            </div>
            <div class="col-4">
              <router-link :to="'/editteam/' + fantasyteam.name + '/'+ fantasyteam.formation">
                <h2 class="formation">{{ fantasyteam.formation }}</h2>
              </router-link>
              <h5 class="formation">FORMATION</h5>
            </div>
          </div>

          <div class="row justify-content-center spacing-players">
            <div class="col-3 player-box" v-html="goalkeeper"></div>
          </div>

          <div class="row justify-content-center spacing-players" v-html="defender"></div>

          <div class="row justify-content-center spacing-players" v-html="midfielders"></div>

          <div class="row justify-content-center spacing-players" v-html="forwards"></div>
        </div>
      </div>
    </div>

    <footer>
      <div class="container-fluid offside-holder pb">
        <div class="row justify-content-center spacing-players boxcontainer">
          <div class="col offside-player-box" v-html="bench_goal_keeper"></div>
          <div class="col offside-player-box" v-html="bench_player_one"></div>
          <div class="col offside-player-box" v-html="bench_player_two"></div>
          <div class="col offside-player-box" v-html="bench_player_three"></div>
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
    </footer>
  </div>
</template>
<script type="text/javascript">
import Auth from "../assets/store/auth";
import { get, post } from "../assets/helpers/api";

export default {
  data() {
    return {
      error: {},
      name: "",
      isProcessing: false,
      sitesettings: JSON.parse(Auth.state.site_settings),
      fantasyteam: "",
      formiddef: "",
      loopformation: "",
      player_to_team: "",
      goalkeeper: [],
      defender: [],
      midfielders: [],
      forwards: [],
      bench_goal_keeper: [],
      bench_player_one: [],
      bench_player_two: [],
      bench_player_three: [],
      team_total_points: "",
      counter: 1
    };
  },
  created() {
    this.isProcessing = true;
    this.error = {};
    // console.log(Auth.state.site_settings.gameweek_deadline);

    if (Auth.state.api_token && Auth.state.user_id) {
      get(`https://backend.fantasyfootballscotland.com/api/team/detail`)
        .then(response => {
          //if(new Date(JSON.parse(response.data.site_settings).gameweek_deadline) < new Date() || new Date(this.sitesettings.gameweek_deadline) < new Date()){
          if (new Date(response.data.site_settings.gameweek_deadline) < new Date()) {
            this.$router.push({ path: "/lockscreen" });
          }

          if (response.data.FantasyTeam.spark_team_id > 0) {
            this.fantasyteam = response.data.FantasyTeam;
            this.formiddef = response.data.FantasyTeam.formation;
            this.loopformation = response.data.FantasyTeam.formation.split("-");

            this.player_to_team = response.data.player_to_team;
            this.defender = response.data.defenders;
            this.midfielders = response.data.midfielders;
            this.forwards = response.data.forwards;

            this.team_total_points = response.data.team_total_points;
            this.goalkeeper = response.data.goalkeeper;

            this.bench_goal_keeper = response.data.benchgoalkeeper;

            this.bench_player_one = response.data.benchplayerone;

            this.bench_player_two = response.data.benchplayertwo;

            this.bench_player_three = response.data.benchplayerthree;
          } else {
            this.$router.push({ path: "/createteam" });
          }
        })
        .catch(err => {
          if (err.response.data.message == "unauthenticated") {
            Auth.set("", "", "");
            this.$router.push({ path: "/login" });
          } else {
            this.$router.push({ path: "/createteam" });
          }
        });
      this.isProcessing = false;
    } else {
      Auth.set("", "", "");
      this.$router.push({ path: "/login" });
    }
  },

  methods: {
    createTeam() {
      this.isProcessing = true;

      this.error = {};
      post("https://backend.fantasyfootballscotland.com/api/team/create", this.form)
        .then(response => {
          if (response.data.FantasyTeam) {
            this.flashMessage.success({
              title: "Success",
              message: response.data.message,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "#43d787"
              }
            });

            //  setTimeout(function(){
            //     this.$router.push({path: '/'});
            // }.bind(this), 2000);
          } else {
            this.flashMessage.error({
              title: "Error",
              message: response.data.error,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "#C91F40"
              }
            });
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
                backgroundColor: "#43d787"
              }
            });
          }
          this.isProcessing = false;
        });
    }
  }
};
</script>

<style scoped>
html,
body {
    overflow: hidden;
    position: relative;
    height: 100%;
}
</style>
