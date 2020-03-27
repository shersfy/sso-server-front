import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
Vue.use(Router);

export default new Router({
	//	mode: "history",
	base: process.env.BASE_URL,
	routes: [{
			path: "/login.html",
			component: Login
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/",
			component: Login
		},
		{
			path: "/index",
			beforeEnter: (to, from, next) => {
				window.location = "/index.html"
			}
		},
		{
			path: "*",
			component: Login
		}
	],

});