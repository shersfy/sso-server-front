<template>
	<div class="personal_form">
		<div class="personal_form_1">
			<div class="personalInfor">
				<div class="personalInfor_1"></div>
				<div class="personalInfor_2">个人信息</div>
				<div class="personalInfor_3">
					<el-button size="small" @click="modifyPersonal()" v-if="!ifModify">修改</el-button>
					<el-button size="small" @click="modifyPersonalKeep()" type="info" v-if="ifModify">保存</el-button>
					<el-button size="small" @click="modifyPersonal()" v-if="ifModify">取消</el-button>
				</div>
			</div>
			<div class="personalField">
				<el-row>
					<el-col :span="12" class="form_border_right">
						<el-row>
							<el-col :span="4">
								<div class="personalFieldName">用户名</div>
							</el-col>
							<el-col :span="12">
								<div class="personalFieldInput">
									<span>{{userData.username}}</span>
								</div>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="12" >
						<el-row>
							<el-col :span="4">
								<div class="personalFieldName">真实姓名</div>
							</el-col>
							<el-col :span="12">
								<div class="personalFieldInput">
									<span v-if="!ifModify">{{userData.realName}}</span>
									<el-input v-if="ifModify" v-model="userData.realName" placeholder="请输入真实姓名"></el-input>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
			<div class="personalField personalField_2">
				<el-row>
					<el-col :span="12" class="form_border_right">
						<el-row>
							<el-col :span="4">
								<div class="personalFieldName">电话</div>
							</el-col>
							<el-col :span="12">
								<div class="personalFieldInput">
									<span v-if="!ifModify">{{userData.phone}}</span>
									<el-input v-if="ifModify" v-model="userData.phone" placeholder="请输入电话"></el-input>
								</div>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="12" >
						<el-row>
							<el-col :span="4">
								<div class="personalFieldName">邮箱</div>
							</el-col>
							<el-col :span="12">
								<div class="personalFieldInput">
									<span v-if="!ifModify">{{userData.email}}</span>
									<el-input v-if="ifModify" v-model="userData.email" placeholder="请输入邮箱"></el-input>
								</div>
							</el-col>
						</el-row>
					</el-col>
					
				</el-row>
			</div>
			<div class="personalField">
				<el-row>
					<el-col :span="12" class="form_border_right">
						<el-row>
							<el-col :span="4">
								<div class="personalFieldName">备注</div>
							</el-col>
							<el-col :span="12">
								<div class="personalFieldInput">
									<span v-if="!ifModify">{{userData.note}}</span>
									<el-input v-if="ifModify" v-model="userData.note" placeholder="请输入备注"></el-input>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { modifyUser } from "../api/api";
	import { mapState } from "vuex";
	import { Loading } from 'element-ui';

	export default {
		name: "PersonalForm",
		props: {},
		data() {
			return {
				ifModify: false,
				ifModifyEnterprise: false,
				licenceSmall: "",
				backgroundSmall: "",
				logoSmall: "",
			};
		},
		methods: {
			modifyPersonal() {
				this.ifModify = !this.ifModify;
				this.$store.dispatch('gainUserInfo')
			},
			modifyPersonalKeep() {
				let para = {
					realName: this.userData.realName,
					phone: this.userData.phone,
					email: this.userData.email,
					idCard: this.userData.idCard,
					note: this.userData.note,
					empCode: this.userData.empCode,
					wechatCom: this.userData.wechatCom,
				};
				modifyUser(para).then(res => {
					if(res.data.code == 0) {
						this.$message({
							message: '修改成功！',
							type: 'success'
						});
						this.ifModify = !this.ifModify;
					} else {
						this.$message.error(res.data.msg);
					}
				});
			}
		},
		mounted() {
             console.log(this.$store.getters.userinfo);
		},
		computed: {
			...mapState({
				userData: state => state.userinfo
			})
		}
	};
</script>

<style lang="less">

</style>