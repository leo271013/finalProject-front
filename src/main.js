import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueToggles from "vue-toggles";
import "./plugins/axios.js";
import "animate.css";
import ImgInputer from "vue-img-inputer";
import "vue-img-inputer/dist/index.css";

Vue.component("VueToggles", VueToggles);
Vue.component("ImgInputer", ImgInputer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
