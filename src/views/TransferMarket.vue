<template>
  <div class="scroll-bg">
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
                />
              </router-link>
              <h3 class="text-center header-title">Players</h3>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container-fluid name-input">
      <div class="row">
        <div class="col-12">
          <h3 class="text-center budget-title">
            £{{ budget }}m
            <span class="small-title-white">Budget</span>
          </h3>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 mt">
          <div
            class="btn-group btn-block"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              @click="positionfilter('all')"
              class="btn btn-outline"
              :disabled="
                this.$route.params.positionfor.includes('def') ||
                this.$route.params.positionfor == 'gk' ||
                this.$route.params.positionfor.includes('for') ||
                this.$route.params.positionfor.includes('mid')
                  ? true
                  : false
              "
            >
              All
            </button>
            <button
              type="button"
              @click="positionfilter('GK')"
              class="btn btn-outline"
              :disabled="
                this.$route.params.positionfor.includes('def') ||
                this.$route.params.positionfor == '' ||
                this.$route.params.positionfor.includes('for') ||
                this.$route.params.positionfor.includes('mid')
                  ? true
                  : false
              "
            >
              GK
            </button>
            <button
              type="button"
              @click="positionfilter('DEF')"
              class="btn btn-outline"
              :disabled="
                this.$route.params.positionfor == 'gk' ||
                this.$route.params.positionfor == '' ||
                this.$route.params.positionfor.includes('for') ||
                this.$route.params.positionfor.includes('mid')
                  ? true
                  : false
              "
            >
              DEF
            </button>
            <button
              type="button"
              @click="positionfilter('MID')"
              class="btn btn-outline"
              :disabled="
                this.$route.params.positionfor.includes('def') ||
                this.$route.params.positionfor == '' ||
                this.$route.params.positionfor.includes('for') ||
                this.$route.params.positionfor == 'gk'
                  ? true
                  : false
              "
            >
              MID
            </button>
            <button
              type="button"
              @click="positionfilter('FOR')"
              class="btn btn-outline"
              :disabled="
                this.$route.params.positionfor.includes('def') ||
                this.$route.params.positionfor == '' ||
                this.$route.params.positionfor == 'gk' ||
                this.$route.params.positionfor.includes('mid')
                  ? true
                  : false
              "
            >
              FOR
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-6 mt">
          <h3 class="small-title smt">
            <strong>Player Listing</strong>
          </h3>
        </div>
      </div>
      </div>
      <div class="container">
      <div class="row">
        <div class="col-12 smt">
          <SortedTable :values="allplayers">
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
                <td scope="row">
                  <router-link
                    :to="
                      '/show-player/' +
                        $route.params.positionfor +
                        '/' +
                        player.id
                    "
                    >{{ player.position }}</router-link
                  >
                </td>
                <td>
                  <strong>
                    <router-link
                      :to="
                        '/show-player/' +
                          $route.params.positionfor +
                          '/' +
                          player.id
                      "
                      >{{ player.name }}</router-link
                    >
                  </strong>
                </td>
                <td>
                  <router-link
                    :to="
                      '/show-player/' +
                        $route.params.positionfor +
                        '/' +
                        player.id
                    "
                    >{{ player.club_name }}</router-link
                  >
                </td>
                <td>
                  <router-link
                    :to="
                      '/show-player/' +
                        $route.params.positionfor +
                        '/' +
                        player.id
                    "
                    >£{{ player.cost }}M</router-link
                  >
                </td>
                <td>
                  <router-link
                    :to="
                      '/show-player/' +
                        $route.params.positionfor +
                        '/' +
                        player.id
                    "
                  >
                    {{ player.points }}
                    <img
                      class="img-fluid float-right arrow-space"
                      src="@/assets/images/leagues/next-arrow.svg"
                      alt="next arrow"
                    />
                  </router-link>
                </td>
              </tr>
            </tbody>
          </SortedTable>
        </div>
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
      allplayers: [],
      alls: [],
      forwards: [],
      mids: [],
      defs: [],
      gks: [],
      budget: ""
    };
  },
  created() {
    this.isProcessing = true;
    this.error = {};
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      get(`https://backend.fantasyfootballscotland.com/api/players/list`)
        .then(response => {
          //console.log(response.data);
          if (response.data.players == "") {
            this.flashMessage.error({
              title: "Error",
              message: "No player available, please contact",
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
            this.allplayers = response.data.players;
            this.budget = response.data.team_buget;
            this.alls = response.data.players;
            //console.log(this.alls);
            this.allplayers.sort((a, b) => {
              return parseFloat(a.cost) - parseFloat(b.cost);
            });
            this.alls.sort((a, b) => {
              return parseFloat(a.cost) - parseFloat(b.cost);
            });

            this.alls.forEach((item, key) => {
              if (item.position == "FOR") {
                this.forwards.push(item);
              }
              if (item.position == "MID") {
                this.mids.push(item);
              }
              if (item.position == "DEF") {
                this.defs.push(item);
              }
              if (item.position == "GK") {
                this.gks.push(item);
              }
            });

            if (
              this.$route.params.positionfor == "bgk" ||
              this.$route.params.positionfor == "bp1" ||
              this.$route.params.positionfor == "bp2" ||
              this.$route.params.positionfor == "bp3" ||
              this.$route.params.positionfor == ""
            ) {
              this.allplayers = this.alls;
            }
            if (this.$route.params.positionfor.includes("for")) {
              this.allplayers = this.forwards;
            }
            if (this.$route.params.positionfor.includes("mid")) {
              this.allplayers = this.mids;
            }
            if (this.$route.params.positionfor.includes("def")) {
              this.allplayers = this.defs;
            }
            if (this.$route.params.positionfor == "gk") {
              this.allplayers = this.gks;
            }

            // console.log(this.forwards);
            // console.log(this.mids);
            // console.log(this.defs);
            // console.log(this.gks);
          }
        })
        .catch(error => {
          console.log(error);
          this.flashMessage.error({
            title: "Error",
            message: "Error fetching all players",
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

    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      //this.$router.push({path: '/allplayers'});
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
    positionfilter(pos) {
      if (pos == "all") {
        this.allplayers = this.alls;
      }
      if (pos == "FOR") {
        this.allplayers = this.forwards;
      }
      if (pos == "MID") {
        this.allplayers = this.mids;
      }
      if (pos == "DEF") {
        this.allplayers = this.defs;
      }
      if (pos == "GK") {
        this.allplayers = this.gks;
      }
    },
    ascprice() {
      this.allplayers.sort((a, b) => {
        return parseFloat(a.cost) - parseFloat(b.cost);
      });
      this.alls.sort((a, b) => {
        return parseFloat(a.cost) - parseFloat(b.cost);
      });
    },
    descprice() {
      this.allplayers.sort((a, b) => {
        return parseFloat(b.cost) - parseFloat(a.cost);
      });
      this.alls.sort((a, b) => {
        return parseFloat(b.cost) - parseFloat(a.cost);
      });
    },
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
    }
  }
};
</script>

<style>
table th>a {
  color: #eee !important;
}

</style>