import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index";
import Personal from "./views/Personal";
import Passport from "./views/Passport";
import { oldBase } from "../../api/api";

Vue.use(Router);

export default new Router({
    //	mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "",
            component: Index
        },
        {
            path: "/index",
            component: Index
        },
        {
            path: "/index.html",
            component: Index
        },
        {
            path: "/login",
            beforeEnter: (to, from, next) => {
                if (oldBase == "") {
                    window.location = "/login"
                } else {
                    window.location = "/login.html"
                }
            }
        },
        {
            path: "/login.html",
            beforeEnter: (to, from, next) => {
                window.location = "/login.html"
            }
        },
        {
            path: "/personal",
            component: Personal
        },
        {
            path: "/passport",
            component: Passport
        },
        {
            path: "*",
            component: Index
        }
    ]
});