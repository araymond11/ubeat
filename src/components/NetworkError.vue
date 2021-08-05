<template>
	<v-row class="fill-height" align="center" justify="center">
		<v-avatar size="64">
			<v-icon x-large color="red">mdi-alert-circle-outline</v-icon>
		</v-avatar>
		<h4>Network error occurred :(</h4>
		<h4 style="margin-top: -10px;">Impossible to retrieve {{ msg }}</h4>
	</v-row>
</template>

<style scoped>
h4 {
	font-weight: initial;
	color: rgb(221, 100, 100);
	font-size: calc(15px + 0.2vw);
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>

<script>
export default {
	props: ['msg'],
	watch: {
		msg: function(newVal) {
			this.msg = newVal;
		}
	}
};
</script>
