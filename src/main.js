import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueCookie from "vue-cookie";
import BootstrapVue from "bootstrap-vue";
//import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import stylesboot from "./styles/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faEnvelope,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import VueAxios from "vue-axios";
import BlockUI from "vue-blockui";
import "./styles/global.scss";
import styles from "./styles/css/style.css";
import FlashMessage from "@smartweb/vue-flash-message";
import SortedTablePlugin from "vue-sorted-table";
import ToggleButton from 'vue-js-toggle-button'

Vue.use(FlashMessage);

Vue.use(BootstrapVue);

Vue.use(styles);

Vue.use(stylesboot);

Vue.use(VueCookie);

Vue.use(VueAxios, axios);

Vue.use(BlockUI);

library.add(faCoffee, faEnvelope, faUser);

library.add(faFacebook, faTwitter);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(SortedTablePlugin);

Vue.use(ToggleButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
