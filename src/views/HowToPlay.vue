<template>
  <div class="bg-grey">
    <header class="top-bar">
      <div class="container header-padding">
        <div class="row">
          <div class="col-12">
            <div class="inline-block">
              <router-link to="/settings">
                <img
                  class="img-fluid back-arrow float-left"
                  src="@/assets/images/select-players/back-arrow.svg"
                  alt="arrow"
                >
              </router-link>
              <h3 class="text-center header-title">HOW TO PLAY</h3>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-12 mt">
          <img
            class="img-fluid mr float-left"
            src="@/assets/images/leagues/logo-ball.svg"
            alt="logo ball"
          >
          <h3 class="mt">
            <strong>HOW TO PLAY</strong>
          </h3>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 bmt">
          <h2>Choosing your team</h2>
          <p></p>
          <h3>Can I have more than one team?</h3>
          <p>We look at this like FIFA do club owners. It wouldn’t be fair to allow players to enter more than one team into a league, so we have kept it to one team per registered user. Of course, you are free to enter as many leagues as you like.</p>

          <h3>How many changes can I make to my team before entering the game?</h3>

          <p>As many as you like. You have unlimited free transfers before the first deadline of the season. Make as many signings as you like. Go Gretna crazy.</p>

          <h2>Managing your team</h2>
          <p></p>

          <h3>What happens if my captain doesn’t play?</h3>
          <p>Then your vice-captain becomes, in effect, your captain for that game week. Your vice captain will receive double game points. However, your vice captaincy will not pass on to another player.</p>

          <h3>What happens when one of my players gets injured?</h3>

          <p>An injury symbol will appear next to your player and in the profile of the player concerned. You will also receive a warning about your injured player(s) ahead of the next game week deadline. It is up to you to make a transfer or a substitution to replace injured players from your team.</p>

          <h3>What formation can I play in?</h3>

          <p>You can play in any formation you desire as long as at least one goalkeeper, three defenders, three midfielders and one forward is selected.</p>

          <h3>How do I change my team name?</h3>

          <p>To the right of your team name on the home page you will see an icon. Click that icon and type your new team name in.</p>

          <h3>How do I change my team’s formation?</h3>

          <p>You will find the option to change your team’s formation in the same section as the option to change your team name - click on the icon to the right of your team name on the home page. There you will find a drop down menu to choose your formation.</p>

          <h3>How are player injuries determined?</h3>

          <p>Player injuries are determined by what team managers or their teams say publicly. Unfortunately, for strategic benefit, some managers like to play down or play up the severity of injuries to their players. We only go by what they, or their team, detail publicly.</p>

          <h2>Transfers</h2>
          <p></p>

          <h3>What value will I get for a player when I sell from my team?</h3>

          <p>Should you decide to sell a player, you will receive the value of that player at the time of the sale, not the value of the player at the time of the initial purchase. Choose when to sell players carefully. It will affect your budget, positively and negatively, across the season.</p>

          <h3>Can I cancel my transfers?</h3>

          <p>No. Once you have confirmed your transfers for a game week, they are final and cannot be reversed.</p>

          <h3>What happens if a player I own joins another team?</h3>

          <p>If a player in your team is transferred to or signs for another team and this transfer takes you over the players per team limit, you will receive an alert that will prevent you from saving your team for the next game week. You will be required to transfer out one of your players from that team to save your team.</p>

          <h3>When will new players be added to the game?</h3>

          <p>New signings will be added to the game database within seven days of the transfer being completed.</p>

          <h3>What happens when one of my players leaves the league?</h3>

          <h2>Chips</h2>
          <p></p>

          <h3>What is the Wildcard chip?</h3>

          <p>A wildcard chip allows you to make unlimited free transfers</p>

          <h3>How many Wildcard chips do I receive?</h3>

          <p>You will receive one wildcard chip to be used before the split. After the split, you will then receive another wildcard chip. If you do not use your wildcard chip before the split, you will not receive a second one afterwards.</p>

          <h3>What is the Triple Captain chip?</h3>

          <p>You will receive one Triple Captain chip per season. The Triple Captain chip means your captain will be awarded triple points for whichever game week you choose to use the chip.</p>

          <h3>What is the Bench Boost chip?</h3>

          <p>You will receive one Bench Boost chip per season. The Bench Boost chip means your bench points will be counted along with your first team points for whichever game week you choose to use the chip.</p>

          <h2>Leagues</h2>
          <p></p>
          <h3>How do I create a private league?</h3>

          <p>Click on the Leagues tab along the bottom of the screen. There you will find the Create button in the top right of the subsequent screen. Enter a league name and off you go.></p>

          <h3>How do I join a private league?</h3>

          <p>There are a number of ways to join a private league. The user who creates a league, the Chairman, will be given a code for other users to enter that league. League chairmen can also share their league through Twitter, Facebook, WhatsApp and the share options on your phone.</p>

          <h3>How many private leagues can I join?</h3>

          <p>You can join as many private leagues as you like.</p>

          <h2>Game weeks</h2>
          <p></p>

          <h3>What happens when there are two rounds of fixtures in a single game week?</h3>

          <p>Any players you have selected from the team playing twice in a single game week will earn two sets of points, assuming that player plays in both fixtures. Same game rules apply - e.g. any team captains playing in two fixtures will also earn double points for each match he plays in.</p>
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
  beforeMount() {},
  created() {
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      //this.$router.push({path: '/settings'});
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
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: {},
      isProcessing: false,
      auth: null,
      status: null
    };
  },
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
    logout() {
      Auth.set("", "", "");
      get("https://backend.fantasyfootballscotland.com/api/logout")
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

<style>
h2, h3{
  text-transform: capitalize !important ; 
}
</style>

