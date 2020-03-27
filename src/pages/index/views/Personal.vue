<template>
	<div class="home personal">
		<Header />
		<PersonalForm />
	</div>
</template>

<script>
	// @ is an alias to /src
	import Header from "@/components/Header.vue";
	import PersonalForm from "@/components/PersonalForm.vue";

	export default {
		name: "Personal",
		components: {
			Header,
			PersonalForm
		},
		data() {
			return {
			}
		}
	};
</script>

<style lang="less">

</style>