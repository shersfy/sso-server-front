import Vue from "vue";
import "@/plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import "@/plugins/element.js";
import "@/assets/css/theme-default.scss";
import jsencrypt from "jsencrypt";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
