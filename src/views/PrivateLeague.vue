<template>
  <div class="white-bg-100">
    <FlashMessage class="flashmessage"></FlashMessage>

    <header class="top-bar">
      <div class="container header-padding">
        <div class="row">
          <div class="col-12">
            <router-link to="/leagues">
              <img
                class="img-fluid back-arrow float-left"
                src="@/assets/images/select-players/back-arrow.svg"
                alt="arrow"
              />
            </router-link>

            <h3 class="text-center header-title">Private League</h3>
            <a
              @click="sharebuttonclick()"
              class="btn-header"
              title="Share league code"
              style="color:white;"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="share-alt"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="svg-inline--fa fa-share-alt fa-w-14 fa-3x"
              >
                <path
                  fill="currentColor"
                  d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
                  class
                />
              </svg>
            </a>
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
        >Copy</span>
      </b-modal>
    </div>

    <div>
      <div class="share-dialog">
        <header>
          <h3 class="dialog-title">Share League Code</h3>
          <button @click="closebuttonclick()" class="close-button">
            <svg>
              <use href="#close" />
            </svg>
          </button>
        </header>

        <div class="link">
          <div class="pen-url">{{ testingCode }}</div>
          <input type="hidden" id="testing-code" :value="testingCode" />
          <button
            class="btn btn-info text-white copy-btn ml-auto"
            @click.stop.prevent="copyTestingCode"
          >Copy Link</button>
        </div>
      </div>

      <svg class="hidden">
        <defs>
          <symbol
            id="share-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-share"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </symbol>

          <symbol
            id="facebook"
            viewBox="0 0 24 24"
            fill="#3b5998"
            stroke="#3b5998"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </symbol>

          <symbol
            id="twitter"
            viewBox="0 0 24 24"
            fill="#1da1f2"
            stroke="#1da1f2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-twitter"
          >
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            />
          </symbol>

          <symbol
            id="email"
            viewBox="0 0 24 24"
            fill="#777"
            stroke="#fafafa"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-mail"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </symbol>

          <symbol
            id="linkedin"
            viewBox="0 0 24 24"
            fill="#0077B5"
            stroke="#0077B5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-linkedin"
          >
            <path
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
            />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </symbol>

          <symbol
            id="close"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x-square"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </symbol>
        </defs>
      </svg>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-7">
          <h3 class>
            <strong>{{ league_owner_data.league_name }}</strong>
          </h3>
          <h4 class="mt">
            <strong>{{ league_owner_data.user_name }}</strong>
          </h4>
          <h4>
            <strong>Pin {{ league_owner_data.league_code }}</strong>
          </h4>
        </div>
        <div class="col-5">
          <div class>
            <a @click="leaveleague()" class="btn-success text-center btn-sm float-right">Leave</a>
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
        <div class="col-12 smt padd_bottom">
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
                <td scope="row" v-if="league.previous_position > league.current_position">
                  <img
                    class="img-fluid float-left up-down"
                    src="@/assets/images/leagues/down.svg"
                    alt="arrow down"
                  />
                  {{ index + 1 }}
                </td>
                <td scope="row" v-else-if="league.previous_position < league.current_position">
                  <img
                    class="img-fluid float-left up-down"
                    src="@/assets/images/leagues/up.svg"
                    alt="arrow up"
                  />
                  {{ index + 1 }}
                </td>
                <td scope="row" v-else>
                  <img
                    class="img-fluid float-left up-down"
                    width="30"
                    src="@/assets/images/leagues/minus.svg"
                    alt="Level"
                  />
                  {{ index + 1 }}
                </td>
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
    <footer>
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
          // console.log(response.data);

          //this.playerdetails = response.data.PlayerDetail;
          this.league_owner_data = response.data.league_owner_data;
          this.team_total_points = response.data.league_owner_data;
          this.leagues = response.data.leagues;

          var protocol = location.protocol;
          var slashes = protocol.concat("//");
          var host = slashes.concat(window.location.host);
          this.hostname = host;
          this.testingCode =
            "Join my league on Fantasy Football Scotland: " +
            this.league_owner_data.league_code;
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
    sharebuttonclick() {
      /////////////////////////////////////////////////////    web share API code here ////////////////////////
      
      if (navigator.share) {
        console.log("share click");
        console.log(this.testingCode);
        navigator.share({
            title: "FantasyFootball league code", 
            text: this.testingCode,
            url: "https://www.fantasyfootballscotland.com/"
          }).then(() => {
            console.log("Thanks for sharing!");
          }).catch(console.error);
      } else {
        document.querySelector(".share-dialog").classList.add("is-open");
      }

      /////////////////////////////////////////////////////    web share API code here ////////////////////////
    },
    closebuttonclick() {
      document.querySelector(".share-dialog").classList.remove("is-open");
    },
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
              title: "Offski!",
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

<style scoped>
.hidden {
  display: none;
}

svg {
  width: 20px;
  height: 20px;
  margin-right: 7px;
}

button,
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding-top: 8px;
  padding-bottom: 8px;
  color: #777;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 2px;
  text-transform: capitalize;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
}

button:hover,
.button:hover {
  border-color: #cdd;
}

.share-button,
.copy-link {
  padding-left: 30px;
  padding-right: 30px;
}

.share-button,
.share-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.share-dialog {
  display: none;
  width: 95%;
  max-width: 500px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  z-index: -1;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
}

.share-dialog.is-open {
  display: block;
  z-index: 2;
}

header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.targets {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
}

.close-button {
  background-color: transparent;
  border: none;
  padding: 0;
}

.close-button svg {
  margin-right: 0;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  background-color: #eee;
}

.pen-url {
  margin-right: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
