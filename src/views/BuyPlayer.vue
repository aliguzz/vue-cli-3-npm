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

            <h3 class="text-center header-title">Player</h3>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-4 mtx2">
          <img
            class="img-fluid back-arrow imageheigth"
            :src="
              'https://backend.fantasyfootballscotland.com/uploads/clubs/' +
                playershirt
            "
            alt="arrow"
          />
        </div>
        <div class="col-8 mtx2">
          <h3 class="mb">{{ playerdetails.name }}</h3>
          <div class="row">
            <div class="col-6">
              <h5>
                <strong>{{ playerposition }}</strong>
              </h5>
            </div>
            <div class="col-6">
              <h5 class="float-right">
                <strong>Points: {{ playerdetails.points ? playerdetails.points : 0 }}</strong>
              </h5>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <h5>
                <strong>{{ playerdetails.club_name }}</strong>
              </h5>
            </div>
            <div class="col-8">
              <h5 class="float-right mb">
                <strong>Value: £{{ playerdetails.cost }}m</strong>
              </h5>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <h5 v-if="playerdetails.injured_out == 1">
                <img
                  class="img-fluid"
                  src="@/assets/images/select-players/injured.svg"
                  alt="injured"
                />
                Injured out
              </h5>
              <h5 v-if="playerdetails.suspended == 1">
                <img
                  class="img-fluid"
                  src="@/assets/images/select-players/injured.svg"
                  alt="injured"
                >
                Suspended
              </h5>
              <h5 v-if="playerdetails.missing == 1">
                <img
                  class="img-fluid"
                  src="@/assets/images/select-players/injured.svg"
                  alt="injured"
                >
                Missing
              </h5>
              <h5 v-if="playerdetails.injured_available == 1">
                <img
                  class="img-fluid"
                  src="@/assets/images/select-players/injured.svg"
                  alt="injured"
                >
                Injured Available
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 mtx2">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th colspan="2">Player Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Captain <br>
                  <toggle-button
                    v-on:change="(captain == true) ? c_v_c(1) : c_v_c(0)"
                    :value="false"
                    :sync="true"
                    name="c_v_c"
                    v-model="captain"
                  />
                </td>
                <td>
                  Vice Captain <br>
                  <toggle-button
                    v-on:change="(vice_captain == true) ? c_v_c(2) : c_v_c(0)"
                    :value="false"
                    :sync="true"
                    name="c_v_c"
                    v-model="vice_captain"
                  /> 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mtx2">
          <h3 class="small-title">
            <strong>Player Overview</strong>
          </h3>
        </div>
      </div>

      <div class="row">
        <div class="col-12 smt padd_bottom">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Points type</th>
                <th scope="col" class="align-right">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Points Total</th>
                <td class="align-right">{{ playerdetails.points ? playerdetails.points : 0 }}</td>
              </tr>
              <tr>
                <th scope="row">Goals Scored</th>
                <td class="align-right">
                  {{
                  player_game_week
                  ? player_game_week.number_of_goals
                  : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Games played</th>
                <td class="align-right">
                  {{
                  player_game_week ? player_game_week.week_number : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Clean Sheets</th>
                <td class="align-right">
                  {{
                  player_game_week ? player_game_week.clean_sheet : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Assist</th>
                <td class="align-right">
                  {{
                  player_game_week
                  ? player_game_week.number_of_assists
                  : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Own Goals</th>
                <td class="align-right">
                  {{
                  player_game_week
                  ? player_game_week.number_of_goals
                  : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Goals Conceded</th>
                <td class="align-right">
                  {{
                  player_game_week
                  ? player_game_week.number_of_goals_conceded
                  : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Penalty missed</th>
                <td class="align-right">
                  {{
                  player_game_week ? player_game_week.penalty_miss : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Yellow Card</th>
                <td class="align-right">
                  {{
                  player_game_week
                  ? player_game_week.number_of_yellow_cards
                  : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Red Card</th>
                <td class="align-right">
                  {{
                  player_game_week
                  ? player_game_week.number_of_red_cards
                  : 0
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">Bonus point (Hat Trick)</th>
                <td class="align-right">{{ player_game_week ? player_game_week.hattrick : 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <footer>
      <div class="container-fluid footer-icons pt pb">
        <div class="row justify-content-center">
          <div class="col-6" v-if="already_taken == '0'">
            <button :disabled="isProcessing" @click="buyplayer()" class="btn-primary btn-block btn-lg text-center">Buy</button>
          </div>
          <div class="col-6" v-else>
            <a class="btn-success btn-block btn-lg text-center">{{ already_taken }}</a>
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
      playerdetails: "",
      captain: false,
      vice_captain: false,
      playerposition: "",
      player_game_week: "",
      selected: 0,
      already_taken: "",
      playershirt: ""
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
        `https://backend.fantasyfootballscotland.com/api/players/detail/` +
          this.$route.params.playerId
      )
        .then(response => {
          console.log(response.data);
          if (response.data.PlayerDetail == "") {
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
                this.$router.push({ path: "/allplayers" });
              }.bind(this),
              4000
            );
          } else {
            this.already_taken = response.data.already_taken;
            this.playerdetails = response.data.PlayerDetail[0];
            this.playershirt = this.playerdetails.shirt;
            this.player_game_week = response.data.player_game_week[0];
            if (this.playerdetails.position == "DEF") {
              this.playerposition = "Defender";
            }
            if (this.playerdetails.position == "MID") {
              this.playerposition = "Midfielder";
            }
            if (this.playerdetails.position == "FOR") {
              this.playerposition = "Forward";
            }
            if (this.playerdetails.position == "GK") {
              this.playerposition = "Goalkeeper";
            }
          }
        })
        .catch(error => {
          console.log(error);
          this.flashMessage.error({
            title: "Skint!",
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
    buyplayer() {
      this.isProcessing = true;
      this.error = {};
      get(
        `https://backend.fantasyfootballscotland.com/api/players/buy/` +
          this.$route.params.positionfor +
          "/" +
          this.$route.params.playerId +
          "/" +
          this.selected
      )
        .then(response => {
          //console.log(response.data);
          if (response.data.player_to_team == "") {
            this.flashMessage.error({
              title: "Skint!",
              message: response.data.message,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "#0086d6;"
              }
            });
            setTimeout(
              function() {
                this.$router.push({ path: "/myteam" });
              }.bind(this),
              5000
            );
          } else {
            this.flashMessage.success({
              title: "Success",
              message: response.data.message,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "43d787"
              }
            });
            this.$router.push({ path: "/myteam" });
            console.log(response.data.player_to_team);
          }
          this.isProcessing = false;
        })
        .catch(err => {
          if (err.response.data.code === 422 && err.response.data.error) {
            console.log("inside here");
            //if(err.response.data.error){
            //this.error = err.response.data.errors;

            this.flashMessage.error({
              title: "Skint!",
              message: err.response.data.error,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "#0086d6;"
              }
            });
          }
          this.isProcessing = false;
        });
    },
    c_v_c(cvc) {
      this.isProcessing = true;
      this.error = {};
      // alert(cvc);
      // throw new Error();
      get(
        `https://backend.fantasyfootballscotland.com/api/players/c_v_c/` +
          this.$route.params.playerId +
          "/" +
          cvc
      )
        .then(response => {
          //this.selected = response.data.selected;
          this.selected = response.data.selected;
          if(this.selected === 1){
            this.captain = this.selected;
          }
          if(this.selected === 2){
            this.vice_captain = this.selected;
          }
          this.flashMessage.success({
            title: "Success",
            message: response.data.message,
            time: 3000,
            flashMessageStyle: {
              backgroundColor: "#43d787"
            }
          });
        })
        .catch(err => {});
    }
  }
};
</script>

<style>
 body {
       background: #eee;
 }
</style>
