<template>
	<v-container style="max-width: 85%;">
		<template v-if="searchAlbums.length > 0">
			<h1 class="title" style="padding-top: 40px;">Albums</h1>
			<v-divider style="margin: 15px;" />
			<v-layout row wrap>
				<v-flex
					v-for="album of searchAlbums"
					:key="album.id"
					cols="6"
					sm4
					md3
					lg2
					xl2
					class="list"
				>
					<AlbumItem :item="album" />
				</v-flex>
			</v-layout>
		</template>

		<template v-if="searchTracks.length > 0">
			<h1 class="title">Tracks</h1>
			<v-divider style="margin: 15px;" />
			<v-list two-line flat>
				<v-list-item-group>
					<template v-for="(track, index) in searchTracks">
						<TrackItem :track="track" :search="true" :key="track.id" />
						<v-divider v-if="index + 1 < searchTracks.length" :key="index" />
					</template>
				</v-list-item-group>
			</v-list>
			<SnackBarInfo :info="snackBarInfo" />
		</template>

		<template v-if="searchArtists.length > 0">
			<h1 class="title" style="padding-top: 40px;">Artists</h1>
			<v-divider style="margin: 15px;" />
			<v-layout row wrap>
				<v-flex
					v-for="artist of searchArtists"
					:key="artist.id"
					cols="6"
					sm4
					md3
					lg2
					xl2
					class="list"
				>
					<ArtistItem v-if="artist.genre !== undefined" :item="artist" />
				</v-flex>
			</v-layout>
		</template>

		<template v-if="searchUsers.length > 0">
			<h1 class="title" style="padding-top: 40px;">Users</h1>
			<v-divider style="margin: 15px;" />
			<v-list two-line flat>
				<v-list-item-group>
					<template v-for="(user, index) in searchUsers">
						<UserFriendItem :friend="user" :key="user.id" />
						<v-divider v-if="index + 1 < searchUsers.length" :key="index" />
					</template>
				</v-list-item-group>
			</v-list>
		</template>
	</v-container>
</template>

<style scoped>
.v-application .title {
	font-size: calc(25px + 0.5vw) !important;
	margin-top: 5px;
	text-align: center;
	font-weight: initial;
}

.list {
	display: flex;
	justify-content: center;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-bottom: 12px solid transparent;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import TrackItem from '@/components/track/TrackItem';
import SnackBarInfo from '@/components/SnackBarInfo';
import AlbumItem from '@/components/album/AlbumItem';
import ArtistItem from '@/components/artist/ArtistItem';
import UserFriendItem from '@/components/user/UserFriendItem';

export default {
	name: 'SearchElements',
	data() {
		return {
			snackBarInfo: ''
		};
	},
	components: {
		TrackItem: TrackItem,
		SnackBarInfo: SnackBarInfo,
		AlbumItem: AlbumItem,
		ArtistItem: ArtistItem,
		UserFriendItem: UserFriendItem
	},
	computed: {
		...mapGetters({
			searchArtists: 'searchArtists',
			searchTracks: 'searchTracks',
			searchAlbums: 'searchAlbums',
			searchUsers: 'searchUsers'
		})
	},
	methods: {
		...mapActions(['listenTrack'])
	}
};
</script>
