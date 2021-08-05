<template>
	<v-container v-if="FriendsIsLoading">
		<LazyImageDownload />
	</v-container>
	<v-container v-else-if="!FriendsIsLoading">
		<v-layout row style="display:flex;justify-content:center;">
			<v-flex cols="12" sm12 md8 lg8 xl8>
				<h1 class="Friend-list">My friends</h1>
				<h2 id="user-friends-details">
					You have currently {{ loggedInUser['following'].length }} friend(s)
				</h2>
				<v-divider
					style="margin: 15px;"
					v-if="loggedInUser['following'].length > 0"
				/>
				<template v-if="this.loggedInUser !== undefined">
					<v-list two-line flat v-if="loggedInUser['following'].length > 0">
						<v-list-item-group>
							<template
								v-for="(friend, index) in this.loggedInUser['following']"
							>
								<UserFriendItem :friend="friend" :key="friend.id" />
								<v-divider
									v-if="index + 1 < loggedInUser['following'].length"
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
	</v-container>
</template>
<style>
.Friend-list {
	margin-top: 5px;
	text-align: center;
	font-size: calc(20px + 0.4vw);
	font-weight: initial;
}
#user-friends-details {
	font-size: calc(16px + 0.3vw);
	text-align: center;
	color: var(--v-primary-base);
	font-weight: initial;
	font-style: italic;
}
</style>
<script>
import UserFriendItem from '@/components/user/UserFriendItem';
import LazyImageDownload from '@/components/LazyImageDownload';
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			FriendsIsLoading: false
		};
	},
	components: {
		UserFriendItem: UserFriendItem,
		LazyImageDownload: LazyImageDownload
	},
	computed: {
		...mapGetters({
			loggedInUser: 'loggedInUser'
		})
	},
	methods: {
		...mapActions(['changeCurrentUser', 'getTokenInfo'])
	},
	async created() {
		this.FriendsIsLoading = true;
		await this.getTokenInfo();
		this.FriendsIsLoading = false;
	}
};
</script>
