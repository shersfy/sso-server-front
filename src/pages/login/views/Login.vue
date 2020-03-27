<template>
	<div class="login" @keyup.enter="signIn()">
		<div class="login_bi"><img src="../../../assets/images/index_background.jpg"></div>
		<div class="sign" v-if="signVisible">
			<div class="sign_logo"><img src="../../../assets/images/logo.png"></div>
			<div class="sign_title">欢迎登录EDP</div>
			<div class="sign_name" id="sign_name_id">
				<img src="../../../assets/images/index_login_icons_name.png" />
				<input spellcheck="false" v-model="username" id="usernameid" type="text" placeholder="用户名/邮箱/手机号" />
			</div>
			<div class="sign_name sign_paw" id="sign_paw_id">
				<img src="../../../assets/images/index_login_icons_key.png" />
				<input v-model="password" id="passwordid" type="password" placeholder="请输入密码" />
			</div>
			<div class="sign_button" v-if="!isActive">
				<input type="button" value="登录" /></div>
			<div class="sign_button sign_button_in" v-if="isActive">
				<!--<input type="button" value="登录" @click="signIn()" />-->
				<span class="submitBtn" @click="signIn()">确定</span>
			</div>
			<div class="sign_forget changepaw_return" @click="forgetPasswordIn()">忘记密码</div>
			<div class="sign_tips" v-if="errorVisible">
				<img src="../../../assets/images/index_topbar_icons_wrong.png" />
				{{errorPrompt}}
			</div>
		</div>
		<div class="sign changepaw loginChangePaw" v-if="changepawVisible">
			<div class="sign_title">修改密码</div>
			<div class="sign_name changepaw_name">用户名<input type="text" v-model="username" placeholder="用户名/邮箱/手机号" readonly/></div>
			<div class="sign_name modify_contact">验证方式
				<span class="modify_contact_1">
					<el-radio v-model="contactRadio" label="1">手机号：{{userphone}}</el-radio>
				</span>
				<div class="modify_contact_2">
					<el-radio v-model="contactRadio" label="2">邮箱：{{useremail}}</el-radio>
				</div>
			</div>
			<div class="sign_name modify_code"><input v-model="verificationCode" placeholder="请输入验证码" />
				<div v-if="ifModifyCode1" class="modify_code_2">{{countDown}}s后重试</div>
				<div v-if="ifModifyCode2" @click="getCode()" class="modify_code_1">获取验证码</div>
			</div>
			<div class="sign_name sign_paw">新设密码<input v-model="newPassword" type="password" placeholder="新密码建议6-18位" /></div>
			<div class="sign_name sign_paw">确认密码<input v-model="repeatPassword" type="password" placeholder="请再次输入新密码" /></div>
			<div class="sign_button sign_button_in">
				<!--<input type="button" value=" 确定" @click="modifyPaw()" />-->
				<span class="submitBtn" @click="modifyPaw()">确定</span>
			</div>
			<div class="sign_forget changepaw_return" @click="returnIn()">返回上一步</div>
		</div>
		<div class="sign changepaw forgetpaw" v-if="forgetpawVisible">
			<div class="sign_title">忘记密码</div>
			<div class="sign_name changepaw_name">用户名<input type="text" v-model="username" placeholder="用户名" /></div>
			<div class="sign_name sign_paw">联系方式<input v-model="phoneOrEmail" placeholder="请输入手机号或邮箱" /></div>
			<div class="sign_button sign_button_in">
				<!--<input type="button" value=" 确定" @click="forgetPassword()" />-->
				<span class="submitBtn" @click="forgetPassword()">确定</span>
			</div>
			<div class="sign_forget changepaw_return" @click="forgetIn()">返回上一步</div>
		</div>
		<div class="sign reviseSuccess" v-if="modifiedSuccessVisible">
			<div class="reviseSuccess_logo">
				<div><img src="../../../assets/images/index_login_icons_changepassword.png" /></div>
				<div>密码修改成功</div>
			</div>
			<div class="sign_button sign_button_in">
				<!--<input type="button" value=" 确定" @click="reLogin()" />-->
				<span class="submitBtn" @click="reLogin()">确定</span>
			</div>
			<div class="sign_forget">请重新登录</div>
		</div>
	</div>
</template>

<script>
	import { gainK, entry, getValidation, revisePaw, forgetPaw } from "@/api/api";
	import { mapState } from "vuex";
	import { Loading } from 'element-ui';

	export default {
		name: "Login",
		components: {},
		data() {
			return {
				ifModifyCode1: false,
				ifModifyCode2: true,
				contactRadio: "1",
				signVisible: true,
				changepawVisible: false,
				forgetpawVisible: false,
				errorVisible: false,
				modifiedSuccessVisible: false,
				errorPrompt: "",
				username: "",
				password: "",
				phoneOrEmail: "",
				publicKey: "",
				requestKey: "",
				userphone: "",
				useremail: "",
				countDown: 60,
				newPassword: "",
				repeatPassword: "",
				verificationCode: "",
				isActive: true,
			};
		},
		methods: {
			forgetIn() {
				this.forgetpawVisible = false;
				this.signVisible = true;
				this.phoneOrEmail = "";
			},
			forgetPasswordIn() {
				this.signVisible = false;
				this.password = "";
				this.forgetpawVisible = true;
			},
			reLogin() {
				this.modifiedSuccessVisible = false;
				this.signVisible = true;
			},
			returnIn() {
				this.userphone = "";
				this.useremail = "";
				this.verificationCode = "";
				this.newPassword = "";
				this.repeatPassword = "";
				this.changepawVisible = false;
				this.signVisible = true;
			},
			forgetPassword() {
				if(this.username !== "" && this.phoneOrEmail !== "") {
					gainK().then(res => {
						this.publicKey = res.data.model.p;
						this.requestKey = res.data.model.k;
						let id = {
							username: this.username,
							phoneOrEmail: this.phoneOrEmail,
							k: this.requestKey
						};
						let jsencrypt = new JSEncrypt();
						jsencrypt.setPublicKey(this.publicKey);
						let para = {
							data: jsencrypt.encrypt(JSON.stringify(id))
						};
						forgetPaw(para).then(res => {
							if(res.data.code == 0) {
								this.username = res.data.model.username;
								this.userphone = res.data.model.phone;
								this.useremail = res.data.model.email;
								this.phoneOrEmail = "";
								this.forgetpawVisible = false;
								this.changepawVisible = true;
							} else {
								this.$message.error(res.data.msg);
							}
						});
					});
				}
			},
			signIn() {
				let loadingInstance = Loading.service();
				gainK().then(res => {
					this.publicKey = res.data.model.p;
					this.requestKey = res.data.model.k;
					let id = {
						username: this.username,
						password: this.password,
						k: this.requestKey
					};
					let jsencrypt = new JSEncrypt();
					jsencrypt.setPublicKey(this.publicKey);
					let para = {
						id: jsencrypt.encrypt(JSON.stringify(id))
					};
					entry(para).then(res => {
						if(res.data.code == 0) {
							loadingInstance.close();
							if(res.data.model.status == 0) {
								this.$router.push("/index");
							}
							if(res.data.model.status == -1) {
								this.username = res.data.model.username;
								this.userphone = res.data.model.phone;
								this.useremail = res.data.model.email;
								this.password = "";
								this.signVisible = false;
								this.changepawVisible = true;
							}
						} else {
							loadingInstance.close();
							this.errorVisible = true;
							this.errorPrompt = res.data.msg;
						}
					});
				});
			},
			modifyPaw() {
				if(this.verificationCode !== "") {
					if(this.newPassword === this.repeatPassword) {
						if(
							this.newPassword !== "" &&
							this.newPassword.length >= 6 &&
							this.newPassword.length <= 18
						) {
							gainK().then(res => {
								this.publicKey = res.data.model.p;
								this.requestKey = res.data.model.k;
								let id = {
									code: this.verificationCode,
									password: this.newPassword
								};
								let jsencrypt = new JSEncrypt();
								jsencrypt.setPublicKey(this.publicKey);
								let para = {
									data: jsencrypt.encrypt(JSON.stringify(id))
								};

								revisePaw(para).then(res => {
									if(res.data.code == 0) {
										this.userphone = "";
										this.useremail = "";
										this.verificationCode = "";
										this.newPassword = "";
										this.repeatPassword = "";
										this.changepawVisible = false;
										this.modifiedSuccessVisible = true;
									} else {
										this.$message.error(res.data.msg);
									}
								});
							});
						} else {
							this.$message.error("新密码输入错误");
						}
					} else {
						this.$message.error("密码两次输入不一致");
					}
				} else {
					this.$message.error("验证码不能为空");
				}
			},
			getCode() {
				let para = {
					type: this.contactRadio
				};
				getValidation(para).then(res => {
					if(res.data.code == 0) {
						this.ifModifyCode1 = true;
						this.ifModifyCode2 = false;
						let clock = window.setInterval(() => {
							if(this.countDown == 0) {
								this.ifModifyCode1 = false;
								this.ifModifyCode2 = true;
								this.countDown = 60;
								window.clearInterval(clock);
							} else {
								this.countDown--;
							}
						}, 1000);
					} else {
						this.$message.error(res.data.msg);
					}
				});
			}
		},
		mounted() {

		},
		watch: {
			//			username: function() {
			//				if(this.username !== "") {
			//					if(this.password !== "") {
			//						this.isActive = true
			//					} else {
			//						this.isActive = false
			//					}
			//				} else {
			//					this.isActive = false
			//				}
			//			},
			//			password: function() {
			//				if(this.password !== "") {
			//					if(this.username !== "") {
			//						this.isActive = true
			//					} else {
			//						this.isActive = false
			//					}
			//				} else {
			//					this.isActive = false
			//				}
			//			},
		},
		computed: {

		},
	};
</script>

<style lang="less">

</style>