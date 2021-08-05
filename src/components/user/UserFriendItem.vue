<template>
	<div v-if="friend !== undefined">
		<v-hover v-slot:default="{ hover }">
			<v-list-item>
				<v-list-item-avatar>
					<GravatarIcon v-bind:email="friend.email" />
				</v-list-item-avatar>
				<v-list-item-content @click="changeUserProfile">
					<v-list-item-title v-if="hover" class="friend-hover">
						{{ friend.name }}
					</v-list-item-title>
					<v-list-item-title v-else class="friend">
						{{ friend.name }}
					</v-list-item-title>
					<v-list-item-subtitle class="subtitle">
						{{ friend.email }}
					</v-list-item-subtitle>
				</v-list-item-content>
				<template v-if="$route.name === 'Friends'">
					<v-btn
						@click="deleteFriend()"
						:loading="isLoading"
						icon
						large
						color="primary"
						style="margin-left:10px;"
					>
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</template>
				<template v-if="$route.name === 'Search'">
					<template v-if="!following">
						<v-btn
							@click="followFriend()"
							:loading="isLoading"
							icon
							large
							color="primary"
							style="margin-left:10px;"
						>
							<v-icon>mdi-account-plus</v-icon>
						</v-btn>
					</template>
					<template v-else>
						<v-btn
							@click="deleteFriend()"
							:loading="isLoading"
							icon
							large
							color="red"
							style="margin-left:10px;"
						>
							<v-icon>mdi-delete</v-icon>
						</v-btn>
					</template>
				</template>
			</v-list-item>
		</v-hover>
		<SnackBarInfo :info="snackbarInfo" />
	</div>
</template>

<style scoped>
.friend-hover {
	font-size: calc(12px + 0.3vw);
}
.friend {
	font-size: calc(12px + 0.3vw);
	color: white;
}

.subtitle {
	font-size: calc(10px + 0.3vw);
	font-style: italic;
}

.router-link {
	text-decoration: none;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import SnackBarInfo from '@/components/SnackBarInfo';
import GravatarIcon from '@/components/GravatarIcon';

export default {
	props: ['friend'],
	data() {
		return {
			name: this.friend.name,
			id: this.friend.id,
			snackbarInfo: '',
			following: false,
			isLoading: false
		};
	},
	components: {
		GravatarIcon: GravatarIcon,
		SnackBarInfo: SnackBarInfo
	},
	computed: {
		...mapGetters({ loggedInUser: 'loggedInUser' })
	},
	methods: {
		...mapActions([
			'unfollowUserById',
			'followUserById',
			'updatePlaylists',
			'changeCurrentUser'
		]),
		async deleteFriend() {
			this.isLoading = true;
			this.snackbarInfo =
				'This operation can take some time... Please be patient';
			await this.unfollowUserById(this.friend['id']);
			this.snackbarInfo =
				this.friend['name'] + ' has been removed from your friends!';
			this.following = false;
			this.isLoading = false;
		},
		async followFriend() {
			this.isLoading = true;
			this.snackbarInfo =
				'This operation can take some time... Please be patient';
			await this.followUserById(this.friend['id']);
			this.snackbarInfo =
				this.friend['name'] + ' has been added to your friends!';
			this.following = true;
			this.isLoading = false;
		},
		isAlreadyFollowing() {
			const currentFriends = this.loggedInUser['following'];
			for (let i = 0; i < currentFriends.length; i++) {
				if (currentFriends[i].id === this.friend['id']) {
					this.following = true;
				}
			}
		},
		async changeUserProfile() {
			if (this.$router.name !== 'Profile') {
				this.$router.push({ name: 'Profile', params: { id: this.friend.id } });
			} else {
				await this.changeCurrentUser(this.friend.id);
				await this.updatePlaylists(this.friend.id);
			}
		}
	},
	async created() {
		this.isAlreadyFollowing();
	}
};
</script>
