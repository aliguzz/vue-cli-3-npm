<template>
  <div class="home-bg">
    <FlashMessage class="flashmessage"></FlashMessage>

    <header class="top-bar mb0">
      <div class="container header-padding">
        <div class="row">
          <div class="col-12">
            <div class="inline-block">
              <router-link to="/leagues">
                <img
                  class="img-fluid back-arrow float-left"
                  src="@/assets/images/select-players/back-arrow.svg"
                  alt="arrow"
                />
              </router-link>
              <h3 class="text-center header-title">Team</h3>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container-fluid name-input otherteam">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h4 class="text-center name-input-text">{{ fantasyteam.name }}</h4>
          </div>
          <div class="col-12 d-flex justify-content-center">
            <div class="newcont">
              <h4 class="name-input-text threeprop">
                <img
                  v-if="fantasyteam.bench_boost_used == 1"
                  class="img-fluid back-arrow float-left margtop"
                  src="@/assets/images/login/chip-green.png"
                  alt="arrow"
                />

                <img
                  v-if="fantasyteam.bench_boost_used == 0"
                  class="img-fluid back-arrow float-left margtop"
                  src="@/assets/images/login/red-chip.png"
                  alt="arrow"
                />
                Bench Boost
              </h4>

              <h4 class="name-input-text threeprop">
                <img
                  v-if="fantasyteam.triple_captain_used == 1"
                  class="img-fluid back-arrow float-left margtop"
                  src="@/assets/images/login/chip-green.png"
                  alt="arrow"
                />

                <img
                  v-if="fantasyteam.triple_captain_used == 0"
                  class="img-fluid back-arrow float-left margtop"
                  src="@/assets/images/login/red-chip.png"
                  alt="arrow"
                />
                Triple Captain
              </h4>

              <h4 class="name-input-text threeprop">
                <img
                  v-if="fantasyteam.wildcard_used == 1"
                  class="img-fluid back-arrow float-left margtop"
                  src="@/assets/images/login/chip-green.png"
                  alt="arrow"
                />

                <img
                  v-if="fantasyteam.wildcard_used == 0"
                  class="img-fluid back-arrow float-left margtop"
                  src="@/assets/images/login/red-chip.png"
                  alt="arrow"
                />
                Wildcard
              </h4>
            </div>
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
              <h2 class="formation">{{ fantasyteam.formation }}</h2>
              <h5 class="formation">FORMATION</h5>
            </div>
          </div>

          <div class="row justify-content-center spacing-players">
            <!--points row-->
            <!--players row1-->
            <div class="col-3 player-box" v-html="goalkeeper"></div>
          </div>

          <div class="row justify-content-center spacing-players" v-html="defender">
            <!--points row-->
          </div>

          <div class="row justify-content-center spacing-players" v-html="midfielders">
            <!--points row-->
          </div>

          <div class="row justify-content-center spacing-players" v-html="forwards">
            <!--points row-->
          </div>
        </div>
        <!--end-->
      </div>
      <!--row-->
    </div>
    <!--container-->

    <footer>
      <div class="container-fluid offside-holder pb">
        <div class="row justify-content-center spacing-players">
          <div class="col player-box" v-html="bench_goal_keeper"></div>
          <div class="col player-box" v-html="bench_player_one"></div>
          <div class="col player-box" v-html="bench_player_two"></div>
          <div class="col player-box" v-html="bench_player_three"></div>
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
              <p class="menu-label mb0">MY TEAM</p>
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
      bench_boost_used: 0,
      triple_captain_used: 0,
      wildcard_used: 0,
      bench_goal_keeper: [],
      bench_player_one: [],
      bench_player_two: [],
      bench_player_three: [],
      team_total_points: ""
    };
  },
  mounted() {
    this.isProcessing = true;
    this.error = {};
    // console.log(Auth.state.site_settings);
    // console.log(JSON.parse(Auth.state.site_settings));
    console.log("my team console");
    if (Auth.state.api_token && Auth.state.user_id) {
      get(
        `https://backend.fantasyfootballscotland.com/api/team/show/` +
          this.$route.params.teamId
      )
        .then(response => {
          console.log(response.data);
          if (response.data.FantasyTeam.spark_team_id > 0) {
            this.fantasyteam = response.data.FantasyTeam;
            this.bench_boost_used = response.data.FantasyTeam.bench_boost_used;
            this.triple_captain_used =
              response.data.FantasyTeam.triple_captain_used;
            this.wildcard_used = response.data.FantasyTeam.wildcard_used;
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
          }
        })
        .catch(err => {
          if (err.response.data.message == "unauthenticated") {
            Auth.set("", "", "");
            this.$router.push({ path: "/login" });
          }
        });
      this.isProcessing = false;
    } else {
      Auth.set("", "", "");
      this.$router.push({ path: "/login" });
    }
  },

  methods: {}
};
</script>

<style scoped>
html,
body {
    overflow: hidden;
    position: relative;
    height: 100%;
}
.margtop {
  margin: 0 5px 0 0;
}
.threeprop {
  float: left !important;
  margin: 0 5px 0 0;
}
.newcont h4 {
  line-height: 2.2;
  font-size:9px;
}


@media (max-width: 768px) {
  .otherteam.name-input {
    background: #1a6ab4;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    height: 70px;
  }
}
</style>
