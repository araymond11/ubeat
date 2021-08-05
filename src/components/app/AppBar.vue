<template>
	<v-app-bar app clipped-left>
		<v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')">
		</v-app-bar-nav-icon>
		<router-link to="/home">
			<v-img
				src="@/assets/logos/sounder.png"
				max-width="32px"
				class="sounder-img"
			/>
		</router-link>
		<v-toolbar-title id="toolbar-title" class="align-center hidden-sm-and-down">
			<router-link to="/home" id="router">
				<span class="title">Sound<span id="sounder-end">er</span></span>
			</router-link>
		</v-toolbar-title>
		<SearchBar />
		<v-spacer />
		<div
			class="text-center ml-3 d-none d-sm-flex"
			style="font-size: calc(10px + 0.6vw);"
		>
			<span>
				Hello, <span class="user-color">{{ loggedInUser.name }}</span>
			</span>
		</div>
		<div class="text-center ml-3 d-none d-sm-flex">
			<v-menu v-model="menu" :nudge-width="200" offset-x>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" icon>
						<GravatarIcon v-bind:email="loggedInUser.email" />
					</v-btn>
				</template>
				<v-card>
					<v-list>
						<v-list-item>
							<GravatarIcon v-bind:email="loggedInUser.email" />
							<v-list-item-content>
								<v-list-item-title style="margin-left: 10px">
									{{ loggedInUser.name }}
								</v-list-item-title>
								<v-list-item-subtitle style="margin-left: 10px">
									{{ loggedInUser.email }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
					<v-divider />
					<v-list>
						<v-list-item
							link
							v-if="$route.name === 'Profile'"
							@click="changeUserProfile"
						>
							<v-list-item-action>
								<v-icon>mdi-account-circle</v-icon>
							</v-list-item-action>
							<v-list-item-content>Profile</v-list-item-content>
						</v-list-item>
						<v-list-item
							link
							v-else
							v-bind:to="{ name: 'Profile', params: { id: loggedInUser.id } }"
						>
							<v-list-item-action>
								<v-icon>mdi-account-circle</v-icon>
							</v-list-item-action>
							<v-list-item-content>Profile</v-list-item-content>
						</v-list-item>
						<v-list-item link to="/friends">
							<v-list-item-action>
								<v-icon>mdi-account-group</v-icon>
							</v-list-item-action>
							<v-list-item-content>Social</v-list-item-content>
						</v-list-item>
						<v-list-item link to="/settings">
							<v-list-item-action>
								<v-icon>mdi-account-settings</v-icon>
							</v-list-item-action>
							<v-list-item-content>Settings</v-list-item-content>
						</v-list-item>
					</v-list>
					<v-divider />
					<v-list>
						<v-list-item @click="logout()">
							<v-list-item-action>
								<v-icon>mdi-logout</v-icon>
							</v-list-item-action>
							<v-list-item-content>Log Out</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>
			</v-menu>
		</div>
	</v-app-bar>
</template>

<style scoped>
.v-application .title {
	font-family: 'Audiowide', cursive !important;
	font-size: 1.4em !important;
	padding-left: 5px !important;
	text-decoration: none;
	color: var(--v-text-base);
}

#router {
	text-decoration: none;
}

#toolbar-title {
	padding-left: 5px;
}

.sounder-img {
	margin-left: 10px;
}

#sounder-end {
	color: var(--v-primary-base);
}

.user-color {
	color: var(--v-primary-base);
}

.v-list-item--active {
	color: var(--v-primary-base) !important;
}
</style>

<script>
import SearchBar from '@/components/search/SearchBar';
import GravatarIcon from '@/components/GravatarIcon';
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
import router from '@/router';

export default {
	name: 'AppBar',
	components: {
		SearchBar: SearchBar,
		GravatarIcon: GravatarIcon
	},
	data: () => ({
		menu: null
	}),
	computed: {
		...mapGetters(['loggedInUser'])
	},
	methods: {
		...mapActions([
			'setIsSessionActive',
			'updatePlaylists',
			'changeCurrentUser'
		]),
		logout() {
			Vue.$cookies.remove('UBEAT_user');
			this.setIsSessionActive(false);
			router.push({ name: 'Login' });
		},

		async changeUserProfile() {
			await this.changeCurrentUser(this.loggedInUser.id);
			await this.updatePlaylists(this.loggedInUser.id);
		}
	}
};
</script>
