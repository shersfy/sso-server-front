import Vue from "vue";
import "@/plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import "@/plugins/element.js";
import "@/assets/css/theme-default.scss";
import jsencrypt from "jsencrypt";

Vue.config.productionTip = false;

//添加全局过滤器
import * as filters from '@/filters' // global filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");