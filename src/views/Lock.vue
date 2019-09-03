<template>
  <div class="blue-bg">
    <div class="splashscreendiv">
      
      <span class="img-fluid mx-auto d-block splash-logo" style="color:#fff; font-size:40px; text-align:center;">Gameweek Scores are being added, please check back later</span>
      
      <img
        class="img-fluid mx-auto d-block adeo-logo"
        src="./../assets/images/splash-screen/adeo-logo.svg"
        alt="logo"
      />
    </div>
  </div>
</template>

<script>
import Auth from "../assets/store/auth";
import { get, post } from "../assets/helpers/api";
export default {
  data() {
    return {
      display: "none"
    };
  },
  created() {
      get(`https://backend.fantasyfootballscotland.com/api/team/detail`)
        .then(response => {
          
          if (new Date(response.data.site_settings.gameweek_deadline) > new Date()) {
            this.$router.push({ path: "/myteam" });
          }

        })
        .catch(err => {
        
        });
    
  }
};
</script>

<style>
.navbar {
  display: none;
}
</style>
