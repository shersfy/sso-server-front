import Vue from "vue";
import Vuex from "vuex";
import { appUserinfo } from "./api/api";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userinfo: "",
		imgUrlAbsolute: "",
		BnavInfo:"",
	},
	mutations: {
		setUserInfo(state, data) {
			state.userinfo = data;
		}
	},
	actions: {
		gainUserInfo({
			commit
		}) {
			appUserinfo().then(res => {
				if(res.data.code == 0) {
					commit('setUserInfo', res.data.model)
				}
			});
		},
    },
    getters:{
        userinfo: (state) => {
            return state.userinfo;
        },
    }
});