<template>
  <div class="white-bg-100">
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
              <h3 class="text-center header-title">Team</h3>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container padd_bottom">
      <div class="row">
        <div class="col-8 mt">
          <h2>
            <strong class>{{ fantasy_team.name }}</strong>
          </h2>
        </div>
        <div class="col-4 mt">
          <h4 class="float-right">
            Points:
            <span class="h2">
              <strong>{{ team_total_points }}</strong>
            </span>
          </h4>
        </div>
      </div>
    </div>



    <div class="container">
     
      <div class="">
        <table class="table">
           <thead class="thead-dark">
              <tr>
                <th colspan="3">Single-Use Chips</th>
               
              </tr>
            </thead>
          <tbody>
            <tr>
              <td>
                Wildcard <br><toggle-button v-on:change="threeprops('wildcard_used', wildcard_used, '')" :disabled="wildcard_used == 1 ? true : false" :value="false" :sync="true" v-model="wildcard_used"/>
              </td>
            
              <td>
                Triple Captain <br><toggle-button v-on:change="threeprops('triple_captain_used', triple_captain_used, 'triple_captain_week_number')" :disabled="triple_captain_used === false ? false : true" :value="false" :sync="true" v-model="triple_captain_used" />
              </td>
           
              <td>
                 Bench Boost <br><toggle-button v-on:change="threeprops('bench_boost_used', bench_boost_used, 'bench_boost_week_number')" :disabled="bench_boost_used === false ? false : true" :value="false" :sync="true" v-model="bench_boost_used" />
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    </div>
     

   <div class="container">
      <div class="row">

        <div class="col-12 mt">
          <h3 class="small-title">
            <strong>Players Overview</strong>
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 smt bmb padd_bottom">
          <SortedTable :values="allteamplayers">
            <thead class="thead-dark">
              <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                  <SortLink name="position">Pos</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                  <SortLink name="name">Player</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                  <SortLink name="club_name">Club</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                  <SortLink name="cost">Value</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                  <SortLink name="points">Pts</SortLink>
              </th>
               
              </tr>
            </thead>
            <tbody slot="body" slot-scope="sort">
              <tr v-for="player in sort.values" :key="player.id">
                <td>
                  <router-link
                    :to="
                      '/buy-player/' +
                        player.position_used_for +
                        '/' +
                        player.id
                    "
                  >
                    <strong>{{ player.position }}</strong>
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="
                      '/buy-player/' +
                        player.position_used_for +
                        '/' +
                        player.id
                    "
                  >
                    <strong>{{ player.name }}</strong>
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="
                      '/buy-player/' +
                        player.position_used_for +
                        '/' +
                        player.id
                    "
                  >{{ player.club_name }}</router-link>
                </td>
                <td>
                  <router-link
                    :to="
                      '/buy-player/' +
                        player.position_used_for +
                        '/' +
                        player.id
                    "
                  >£{{ player.cost }}M</router-link>
                </td>
                <td>
                  <router-link
                    :to="
                      '/buy-player/' +
                        player.position_used_for +
                        '/' +
                        player.id
                    "
                  >
                    {{ player.points }}
                    <img
                      class="img-fluid float-right arrow-space"
                      src="@/assets/images/leagues/next-arrow.svg"
                      alt="next arrow"
                    >
                  </router-link>
                </td>
              </tr>
            </tbody>
          </SortedTable>
        </div>
      </div>
      </div>
      <footer>
      <div class="container-fluid footer-icons pt pb">
          <div class="row justify-content-center">
            <div class="col-3">
              <router-link to="/overview">
                <img
                  class="img-fluid mx-auto d-block menu-icons"
                  src="@/assets/images/home-no-players/team-icon.svg"
                  alt="team"
                >
                <p class="menu-label mb0">CURRENT</p>
              </router-link>
            </div>
            <div class="col-3">
              <router-link to="/mytransfers/all">
                <img
                  class="img-fluid mx-auto d-block menu-icons"
                  src="@/assets/images/home-no-players/transfers-icon.svg"
                  alt="transfers"
                >
                <p class="menu-label mb0">HISTORY</p>
              </router-link>
            </div>
        </div>
      </div>
      </footer>
      <FlashMessage class="flashmessage"></FlashMessage>
    
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
      allteamplayers: [],
      fantasy_team: "",
      team_total_points: 0,
      bench_boost_used: false,
      triple_captain_used: false,
      wildcard_used: false,
      disables: ""
    };
  },
  created() {
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      this.$router.push({ path: "/overview" });
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
      get(`https://backend.fantasyfootballscotland.com/api/team/overview`)
        .then(response => {
          // console.log(response.data);
          if (response.data == "") {
            this.flashMessage.error({
              title: "Error",
              message:
                "No player in your team yet, please add players to your team",
              time: 3000,
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
            this.allteamplayers = response.data.team_players;
            this.fantasy_team = response.data.fantasy_team;

            this.allteamplayers.forEach(element => {
              this.team_total_points += parseInt(element.points);
            });

            //this.team_total_points = response.data.team_total_points;
            this.bench_boost_used = response.data.fantasy_team.bench_boost_used
              ? true
              : false;
               console.log(this.bench_boost_used);
            this.triple_captain_used = response.data.fantasy_team
              .triple_captain_used
              ? true
              : false;
              console.log(this.triple_captain_used);
            this.wildcard_used = response.data.fantasy_team.wildcard_used
              ? true
              : false;
              console.log(this.wildcard_used);
            //console.log(this.wildcard_used);
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

          setTimeout(
            function() {
              this.$router.push({ path: "/myteam" });
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
    threeprops(att_types, att_val, weeknumberkey) {
    //  alert(att_val);
      if (att_val === true) {
        att_val = 1;
      } else {
        att_val = 0;
      }

      console.log(att_types);
      console.log(att_val);
 //throw new Error();
      get(
        "https://fantasyfootball.adeogroup.co.uk/api/team/update_triple_values/" +
          att_types +
          "/" +
          att_val + "/" + weeknumberkey
      )
        .then(response => {
          if (response.data.status) {
            // this.bench_boost_used =  (response.data.fantasy_team.bench_boost_used == 1) ? true : false;
            // this.triple_captain_used = (response.data.fantasy_team.triple_captain_used == 1) ? true : false;
            // this.wildcard_used = (response.data.fantasy_team.wildcard_used == 1) ? true : false;

            this.flashMessage.success({
              title: "Selected!",
              message: "You have chosen to use your " + att_types,
              time: 3000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });

            setTimeout(
              function() {
                window.location.reload(true);
              }.bind(this),
              2000
            );
          }
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error",
            message: "value could not be updated",
            time: 5000,
            flashMessageStyle: {
              backgroundColor: "linear-gradient(#e66465, #9198e5)"
            }
          });
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
