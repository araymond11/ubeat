<template>
	<v-flex cols="12" sm12 md3 lg3 xl3 id="info">
		<GravatarIcon
			class="info-image"
			v-bind:email="currentUser['email']"
			v-bind:profile="size"
		/>
		<h1 class="info-name">{{ currentUser['name'] }}</h1>
		<h2 class="info-email">{{ currentUser['email'] }}</h2>
		<div v-if="currentUser['id'] === loggedInUser['id']" />
		<div v-else-if="!following" class="text-center">
			<v-btn
				class="follow-button"
				:loading="isLoading"
				rounded
				color="primary"
				@click="followUser()"
				>Follow</v-btn
			>
		</div>
		<div v-else class="text-center">
			<v-btn
				class="follow-button"
				:loading="isLoading"
				rounded
				color="red"
				@click="unfollowUser()"
				>Unfollow</v-btn
			>
		</div>
		<SnackBarInfo :info="snackbarInfo" />
	</v-flex>
</template>

<style scoped>
#info {
	height: max-content;
	border-radius: 5px;
	margin-left: 50px;
}
@media only screen and (min-width: 960px) {
	#info {
		height: max-content;
		border-radius: 5px;
		margin-top: 15vh;
	}
}

.info-image {
	display: flex;
	justify-content: center;
	align-content: center;
	text-align: center;
	width: 225px;
	margin: auto;
	margin-top: 15px;
	border-radius: 50%;
}
.follow-button {
	margin-top: 20px;
	width: 150px;
}
.info-name {
	font-size: calc(20px + 0.4vw);
	text-align: center;
	margin-top: 5px;
	font-weight: initial;
}
.info-email {
	font-size: calc(16px + 0.4vw);
	text-align: center;
	color: var(--v-primary-base);
	font-weight: initial;
	font-style: italic;
}
</style>

<script>
import GravatarIcon from '@/components/GravatarIcon';
import SnackBarInfo from '@/components/SnackBarInfo';
import { mapActions, mapGetters } from 'vuex';

export default {
	props: ['currentUser'],
	data() {
		return {
			size: 'big',
			isLoading: false,
			snackbarInfo: '',
			following: false
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
		...mapActions(['followUserById', 'unfollowUserById']),
		async followUser() {
			this.isLoading = true;
			this.snackbarInfo =
				'This operation can take some time... Please be patient';
			await this.followUserById(this.currentUser['id']);
			this.snackbarInfo =
				this.currentUser['name'] + ' has been added to your friends!';
			this.isLoading = false;
			this.following = true;
		},
		async unfollowUser() {
			this.isLoading = true;
			this.snackbarInfo =
				'This operation can take some time... Please be patient';
			await this.unfollowUserById(this.currentUser['id']);
			this.snackbarInfo =
				this.currentUser['name'] + ' has been removed from your friends!';
			this.isLoading = false;
			this.following = false;
		},
		isAlreadyFollowing() {
			const currentFriends = this.loggedInUser['following'];
			for (let i = 0; i < currentFriends.length; i++) {
				if (currentFriends[i].id === this.currentUser.id) {
					this.following = true;
				}
			}
		}
	},
	async created() {
		this.isAlreadyFollowing();
	}
};
</script>
