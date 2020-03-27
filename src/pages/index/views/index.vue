<template>
	<div class="home">
		<Header />
        <div class="tipContainer">
            <h1 style="font-size: 24px; padding: 10px 0;">登录成功</h1>
            <p style="padding: 10px 0;">您已经成功登录中央认证系统。</p>
            <p style="padding: 10px 0;">出于安全考虑，一旦您访问过那些需要您提供凭证信息的应用时，请操作完成之后<span @click="signOut" style="color:#409eff;cursor: pointer;">登出</span>并关闭浏览器。</p>
        </div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import Header from "@/components/Header.vue";
    import { oldBase } from "@/api/api";
	export default {
		name: "Home",
		data() {
			return {};
		},
		components: {
			Header
		},
		methods: {
            delCookie($name){    
	            var myDate=new Date();    
	            myDate.setTime(-1000);//设置时间    
	            document.cookie=$name+"=''; expires="+myDate.toGMTString();                
	     	},
            signOut() {
				this.delCookie('SESSION');
				window.location = oldBase + "/sign/out";
			},
        }
	};
</script>

<style lang="less">
</style>