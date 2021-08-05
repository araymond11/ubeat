<template>
	<v-app id="app">
		<template>
			<AppBar
				v-if="isSessionActive === true"
				@toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"
			/>
			<AppNavigationDrawer v-if="isSessionActive === true" ref="drawer" />
			<v-content>
				<v-container fluid style="height:100%;">
					<router-view :key="$route.fullPath" />
				</v-container>
			</v-content>
		</template>
		<v-snackbar></v-snackbar>
		<AppFooter />
	</v-app>
</template>

<style>
#app {
	font-family: 'PT Sans', sans-serif;
}
</style>

<script>
import AppBar from '@/components/app/AppBar';
import AppFooter from '@/components/app/AppFooter';
import AppNavigationDrawer from '@/components/app/AppNavigationDrawer';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import router from '@/router';

export default {
	name: 'App',
	components: {
		AppBar: AppBar,
		AppFooter: AppFooter,
		AppNavigationDrawer: AppNavigationDrawer
	},

	methods: {
		...mapActions([
			'getTokenInfo',
			'setIsSessionActive',
			'setHomeAlbums',
			'updatePlaylists'
		])
	},
	computed: {
		...mapGetters({
			isSessionActive: 'isSessionActive',
			loggedInUser: 'loggedInUser'
		})
	},
	async created() {
		await this.setHomeAlbums();
		if (!Vue.$cookies.get('UBEAT_user')) {
			this.setIsSessionActive(false);
			if (router.currentRoute.name !== 'Login') {
				router.push({ name: 'Login' });
			}
		} else {
			await this.getTokenInfo();
			this.setIsSessionActive(true);
			await this.updatePlaylists(this.loggedInUser['id']);
		}
	}
};
</script>
