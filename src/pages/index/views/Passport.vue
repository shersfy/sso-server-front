<template>
	<div class="home passport">
		<Header />
		<PassportForm />
	</div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import PassportForm from "@/components/PassportForm.vue";


export default {
  name: "Passport",
  components: {
    Header,
	PassportForm
  }
};
</script>

<style lang="less">
</style>
