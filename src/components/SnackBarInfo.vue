<template>
	<v-snackbar v-model="snackbar" bottom>
		{{ info }}
		<v-btn dark color="primary" text @click="snackbar = false">
			Close
		</v-btn>
	</v-snackbar>
</template>

<script>
export default {
	data() {
		return {
			snackbar: false,
			timer: undefined
		};
	},
	props: ['info'],
	watch: {
		info: async function(newVal) {
			this.info = newVal;
			if (this.timer !== undefined) {
				clearInterval(this.timer);
			}
			this.snackbar = true;
			this.timer = setTimeout(() => {
				this.snackbar = false;
				this.timer = undefined;
			}, 3000);
		}
	}
};
</script>
