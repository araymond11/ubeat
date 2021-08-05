<template>
	<v-flex cols="12" sm12 md8 lg8 xl8 v-if="tracks !== undefined">
		<v-layout row>
			<v-flex cols="12" sm12 md6 lg6 xl6 style="display:flex;">
				<span class="playlist-display">
					{{ playlistDisplay() }}
				</span>
			</v-flex>
			<v-flex cols="12" sm12 md6 lg6 xl6 style="display:flex;">
				<v-btn
					class="tracks-button"
					rounded
					depressed
					color="primary"
					@click="listenAlbumTracks(tracks)"
				>
					<v-icon left>mdi-play</v-icon>
					PLAY
				</v-btn>
				<v-menu offset-y open-on-hover close-on-content-click nudge-width="150">
					<template v-slot:activator="{ on }">
						<v-btn
							class="tracks-button"
							rounded
							depressed
							v-on="on"
							:loading="isLoading"
						>
							<v-icon left>mdi-plus</v-icon>
							In PLAYLIST
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="(playlist, p) in playlists"
							:key="p"
							@click="addAlbumToPlaylist(playlist.id)"
						>
							<v-list-item-title>{{ playlist.name }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-flex>
		</v-layout>
		<v-list two-line flat>
			<v-list-item-group>
				<template v-for="(track, index) in tracks">
					<TrackItem :track="track" :index="index" :key="track.id" />
					<v-divider v-if="index + 1 < tracks.length" :key="index" />
				</template>
			</v-list-item-group>
		</v-list>
		<SnackBarInfo :info="snackBarInfo" />
	</v-flex>
	<v-flex v-else>
		<NetworkError msg="tracks" />
	</v-flex>
</template>

<style scoped>
.playlist-display {
	font-size: calc(20px + 0.5vw);
	padding-left: 15px;
	margin-left: 8px;
}

.tracks-button {
	margin-left: 30px;
	margin-top: 3px;
	margin-bottom: 10px;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import { albumTotalTime } from '@/utils/utils';
import TrackItem from '@/components/track/TrackItem';
import NetworkError from '@/components/NetworkError';
import SnackBarInfo from '@/components/SnackBarInfo';

export default {
	data() {
		return {
			c_index: -1,
			selected: [],
			snackBarInfo: '',
			isLoading: false
		};
	},
	components: {
		TrackItem: TrackItem,
		NetworkError: NetworkError,
		SnackBarInfo: SnackBarInfo
	},
	computed: {
		...mapGetters({
			tracks: 'currentAlbumTracks',
			currentMusic: 'musicPlayerCurrentTrack',
			playlists: 'userPlaylists',
			getPlaylistById: 'getPlaylistById'
		})
	},

	methods: {
		...mapActions([
			'listenAlbumTracks',
			'addNewTrackToPlaylist',
			'changeCurrentAlbumTracks'
		]),

		playlistDisplay() {
			return (
				this.tracks.length + ' songs - ' + albumTotalTime(this.tracks, true)
			);
		},
		isPlaying(id) {
			return this.currentMusic !== undefined && this.currentMusic.id === id;
		},

		isTrackAlreadyPresent(id, tracks) {
			for (const track of tracks) {
				if (id === track.id) return true;
			}
			return false;
		},

		async addAlbumToPlaylist(playlistId) {
			const playlist = this.getPlaylistById(playlistId);
			this.snackBarInfo =
				'This operation can take some time... Please be patient';
			let added = 0;
			this.isLoading = true;
			for (const track of this.tracks) {
				if (!this.isTrackAlreadyPresent(track.id, playlist.tracks)) {
					await this.addNewTrackToPlaylist({ playlist, track });
					added += 1;
				}
			}
			if (added === 0) {
				this.snackBarInfo = 'All tracks were already in your playlist';
			} else {
				this.snackBarInfo = added + ' tracks have been added to the playlist';
			}
			this.isLoading = false;
		}
	}
};
</script>
