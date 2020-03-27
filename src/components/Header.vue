<template>
	<div class="header">
		<div class="header_logo" @click="signIndex()"><img src="../assets/images/index_topbar_logo.png" /></div>
		<ul class="header_right">
			<div class="header_right_user" @click="userIfShow">
                {{userinfo.realName}}<img v-if="show" src="../assets/images/index_topbar_icons_open.png" />
                <img v-if="!show" src="../assets/images/index_topbar_icons_arrow.png" />
				<transition name="slide-fade">
					<div v-if="show" class="header_right_out">
						<div @click="signPersonal()">个人中心</div>
						<div @click="changePassword()">修改密码</div>
						<div @click="signOut()">退出登录</div>
					</div>
				</transition>
			</div>
		</ul>
	</div>

</template>

<script>
	import { oldBase } from "../api/api";
	import { mapState } from "vuex";

	export default {
		name: "Header",
		inject: ['reload'],
		props: {},
		data() {
			return {
				show: false
			};
		},
		methods: {
			userIfShow() {
				this.show = !this.show;
			},
			signOut() {
				this.delCookie('SESSION');
				window.location = oldBase + "/sign/out";
			},
			delCookie($name){    
	            var myDate=new Date();    
	            myDate.setTime(-1000);//设置时间    
	            document.cookie=$name+"=''; expires="+myDate.toGMTString();                
	     	},    
			signPersonal() {
				this.$router.push({
					path: '/personal'
				})
			},
			signIndex() {
				this.$router.push('/index')
			},
			changePassword() {
				this.$router.push('/passport')
			}
		},
		mounted() {
			this.$store.dispatch('gainUserInfo');
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo
			})
		},
	};
</script>

<style lang="less">
	.slide-fade-enter-active {
		transition: all 0.3s ease;
	}
	
	.slide-fade-leave-active {
		transition: all 0.3s ease;
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */
	
	{
		transform: translateY(-20px);
		opacity: 0;
	}
	
	.curmbs_list {
		position: fixed;
		top: 80px;
		height: 50px;
		padding-left: 30px;
		background: #f4f8f9;
		width: 100%;
		box-sizing: border-box;
		z-index: 10;
		.el-breadcrumb {
			height: 50px;
			line-height: 50px;
		}
	}
	
	.header_menus_list,
	.header_right_out {
		z-index: 1000;
	}
</style>