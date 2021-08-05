<template>
	<v-container>
		<v-layout row wrap>
			<template v-if="!userInfoIsLoading && currentUser !== undefined">
				<UserInfo :currentUser="currentUser" />
			</template>
			<template v-else>
				<LazyImageDownload />
			</template>
			<template
				v-if="
					!playlistsIsLoading && !friendsIsLoading && currentUser !== undefined
				"
			>
				<v-layout style="display:flex;justify-content:center;">
					<v-flex cols="12" sm12 md8 lg8 xl8>
						<template v-if="!playlistsIsLoading">
							<h1 class="user-title">Playlists</h1>
							<h2 v-if="playlists.length > 0" class="user-title-details">
								{{ currentUser.name }} has currently
								{{ playlists.length }} playlist(s)
							</h2>
							<h2 v-else class="user-title-details">
								{{ currentUser.name }} hasn't created any playlist for the
								moment
							</h2>
							<v-divider style="margin: 15px;" v-if="playlists.length > 0" />
							<v-list two-line flat v-if="playlists.length > 0">
								<v-list-item-group>
									<template v-for="(playlist, index) in playlists">
										<UserPlaylistItem :playlist="playlist" :key="playlist.id" />
										<v-divider
											v-if="index + 1 < playlists.length"
											:key="index"
										/>
									</template>
								</v-list-item-group>
							</v-list>
						</template>
						<template v-else>
							<LazyImageDownload />
						</template>
						<template v-if="!friendsIsLoading">
							<h1 class="user-title">Friends</h1>
							<h2
								v-if="currentUser.friends.length > 0"
								class="user-title-details"
							>
								{{ currentUser.name }} has currently
								{{ currentUser.friends.length }} friend(s)
							</h2>
							<h2 v-else class="user-title-details">
								{{ currentUser.name }} hasn't followed a person yet
							</h2>
							<v-divider
								style="margin: 15px;"
								v-if="currentUser.friends.length > 0"
							/>
							<v-list two-line flat v-if="currentUser.friends.length > 0">
								<v-list-item-group>
									<template v-for="(friend, index) in currentUser.friends">
										<UserFriendItem :friend="friend" :key="friend.id" />
										<v-divider
											v-if="index + 1 < currentUser.friends.length"
											:key="index"
										/>
									</template>
								</v-list-item-group>
							</v-list>
						</template>
						<template v-else>
							<LazyImageDownload />
						</template>
					</v-flex>
				</v-layout>
			</template>
		</v-layout>
	</v-container>
</template>

<style scoped>
.user-title {
	font-size: calc(20px + 0.4vw);
	text-align: center;
	margin-top: 5px;
	font-weight: initial;
}
.user-title-details {
	font-size: calc(9px + 0.3vw);
	text-align: center;
	color: var(--v-primary-base);
	font-weight: initial;
	font-style: italic;
}
</style>
<script>
import UserPlaylistItem from '@/components/user/UserPlaylistItem';
import UserInfo from '@/components/user/UserInfo';
import UserFriendItem from '@/components/user/UserFriendItem';
import LazyImageDownload from '@/components/LazyImageDownload';
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			userInfoIsLoading: true,
			playlistsIsLoading: true,
			friendsIsLoading: true
		};
	},
	components: {
		UserInfo: UserInfo,
		UserPlaylistItem: UserPlaylistItem,
		UserFriendItem: UserFriendItem,
		LazyImageDownload: LazyImageDownload
	},
	computed: {
		...mapGetters({
			playlists: 'userPlaylists',
			currentUser: 'currentUser',
			loggedInUser: 'loggedInUser'
		})
	},
	methods: {
		...mapActions(['updatePlaylists', 'changeCurrentUser'])
	},
	async created() {
		this.userInfoIsLoading = true;
		this.playlistsIsLoading = true;
		this.friendsIsLoading = true;
		if (this.$route.params.id !== undefined) {
			await this.changeCurrentUser(this.$route.params.id);
			await this.updatePlaylists(this.$route.params.id);
		} else {
			this.$router.push({ name: 'Home' });
		}
		this.userInfoIsLoading = false;
		this.playlistsIsLoading = false;
		this.friendsIsLoading = false;
	}
};
</script>
