<template>
	<v-navigation-drawer
		v-model="drawer"
		app
		fixed
		clipped
		:temporary="$vuetify.breakpoint.xsOnly"
		:expand-on-hover="$vuetify.breakpoint.smOnly"
		:hide-overlay="$vuetify.breakpoint.smAndUp"
		:class="{ 'navigation-drawer-sm': $vuetify.breakpoint.sm }"
	>
		<v-list>
			<v-list-item link to="/home">
				<v-list-item-action>
					<v-icon>mdi-home</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Home</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-divider />
		<v-list>
			<v-list-item
				v-bind:to="{ name: 'Playlists', params: { id: loggedInUser.id } }"
			>
				<v-list-item-action>
					<v-icon>mdi-music</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>My playlists</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item link to="/friends">
				<v-list-item-action>
					<v-icon>mdi-account-group</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Social</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action> </v-list-item-action>
			</v-list-item>
			<v-list-item link to="/settings">
				<v-list-item-action>
					<v-icon>mdi-account-settings</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Settings</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-divider />
		<v-list>
			<v-list-item to="/help">
				<v-list-item-action>
					<v-icon>mdi-help-circle-outline</v-icon>
				</v-list-item-action>
				<v-list-item-content>Help</v-list-item-content>
			</v-list-item>
			<v-list-item @click="logout()">
				<v-list-item-action>
					<v-icon>mdi-logout</v-icon>
				</v-list-item-action>
				<v-list-item-content>Log Out</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-divider />
		<MusicPlayer />
	</v-navigation-drawer>
</template>

<style scoped>
.navigation-drawer-sm {
	top: 56px !important;
}

.v-list-item--active {
	color: var(--v-primary-base);
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import MusicPlayer from '@/components/MusicPlayer';
import Vue from 'vue';
import router from '@/router';

export default {
	name: 'AppNavigationDrawer',
	components: {
		MusicPlayer: MusicPlayer
	},
	data: () => ({
		drawer: null
	}),
	computed: {
		...mapGetters(['loggedInUser'])
	},
	methods: {
		...mapActions(['changeCurrentAlbum', 'setIsSessionActive']),
		logout() {
			Vue.$cookies.remove('UBEAT_user');
			this.setIsSessionActive(false);
			router.push({ name: 'Login' });
		}
	}
};
</script>
