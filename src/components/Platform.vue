<template>
	<div class="platform">
		<div v-for="item in listData" v-if="item && item.webapps && item.webapps.length > 0">
			<div class="platform_header">
				<div class="platform_header_line"></div>
				<div>{{item.fullName}}</div>
				<div class="platform_header_horn"><img src="../assets/images/index_icons_close.png" /></div>
			</div>
			<div class="platform_entrance">
				<div class="platform_entrance_lattice" v-for="appdata in item.webapps">
					<a :href="'/goto?tenant='+item.account+'&webapp=' + appdata.webappHome" target="_blank">
						<div class="platform_entrance_lattice_icon">
							<img :src="imgUrlAbsolute + appdata.icon" />
						</div>
						<div class="platform_entrance_lattice_text">{{appdata.name}}</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { appList } from "../api/api";
	import { mapState } from "vuex";

	export default {
		name: "Platform",
		props: {
			listSearchData: "",
		},
		data() {
			return {
				listData: ""
			};
		},
		mounted() {
			let updateList = {
				'menuName': '',
				'menuListName': '',
				'crumbsIsShow': false
			}
			this.$store.dispatch('gainUpdateList', updateList);
			let para = {
				keyword: ""
			};
			appList(para).then(res => {
				if(res.data.code == 0) {
					this.listData = res.data.model;
				} else {
					this.$message.error(res.data.msg);
				}
			});
		},
		watch: {
			listSearchData(newListSearchData, oldListSearchData) {
				let para = {
					keyword: newListSearchData
				}
				appList(para).then(res => {
					if(res.data.code == 0) {
						this.listData = res.data.model;
					} else {
						this.$message.error(res.data.msg);
					}
				});
			}
		},
		computed: {
			...mapState({
				imgUrlAbsolute: state => state.imgUrlAbsolute,
			})
		},
	};
</script>

<style lang="less">

</style>