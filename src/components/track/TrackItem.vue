<template>
	<v-hover v-slot:default="{ hover }" :key="track.id">
		<div>
			<v-list-item :key="track.id">
				<v-list-item-avatar v-if="hover || isPlaying(track.id)">
					<v-btn icon large color="primary" @click="listenThisTrack(track)">
						<v-icon v-if="isPlaying(track.id)">mdi-reload</v-icon>
						<v-icon v-else>mdi-play-circle-outline</v-icon>
					</v-btn>
				</v-list-item-avatar>
				<v-list-item-avatar v-else>
					<v-avatar v-if="index || index === 0" class="indexes">
						{{ index + 1 }}
					</v-avatar>
					<v-avatar v-else>
						<v-img :src="track.getArtwork(100)">
							<template v-slot:placeholder>
								<LazyImageDownload />
							</template>
						</v-img>
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content @click="listenThisTrack(track)">
					<v-list-item-title
						:class="[
							hover || isPlaying(track.id)
								? 'music-title-active'
								: 'music-title'
						]"
						v-text="track.name"
					>
					</v-list-item-title>
					<v-list-item-subtitle class="subtitle">
						{{ track.artistName }} - {{ track.albumName }}
					</v-list-item-subtitle>
				</v-list-item-content>
				<template v-if="index || index === 0 || search">
					<v-menu
						offset-y
						open-on-hover
						close-on-content-click
						nudge-width="150"
					>
						<template v-slot:activator="{ on }">
							<v-btn :loading="isLoading" icon large color="primary" v-on="on">
								<v-icon>mdi-music-note-plus</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item
								v-for="(playlist, p) in playlists"
								:key="p"
								@click="addTrackToPlaylist(playlist.id)"
							>
								<v-list-item-title>{{ playlist.name }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</template>
				<template v-else>
					<v-btn
						:loading="isLoading"
						icon
						large
						color="primary"
						@click="removeFromPlaylist"
					>
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</template>

				<v-list-item-action>
					<v-list-item-action-text class="time" v-text="displayTime()" />
				</v-list-item-action>
			</v-list-item>
			<SnackBarInfo :info="snackBarInfo" />
		</div>
	</v-hover>
</template>

<style scoped>
.music-title {
	font-size: calc(12px + 0.3vw);
}
.music-title-active {
	font-size: calc(12px + 0.3vw);
	color: var(--v-primary-base) !important;
}

.subtitle {
	font-size: calc(10px + 0.3vw);
	font-style: italic;
}

.time {
	font-size: 16px;
	font-weight: bold;
}

.indexes {
	font-size: 16px;
	font-weight: bold;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import { msToMinsAndSecs } from '@/utils/utils';
import LazyImageDownload from '@/components/LazyImageDownload';
import SnackBarInfo from '@/components/SnackBarInfo';

export default {
	data() {
		return {
			snackBarInfo: '',
			isLoading: false
		};
	},
	components: {
		LazyImageDownload: LazyImageDownload,
		SnackBarInfo: SnackBarInfo
	},
	computed: {
		...mapGetters({
			musicPlayerTrack: 'musicPlayerCurrentTrack',
			playlists: 'userPlaylists',
			getPlaylistById: 'getPlaylistById',
			playlist: 'currentPlaylist'
		})
	},
	props: ['track', 'index', 'search'],
	watch: {
		track: function(newVal) {
			this.track = newVal;
		}
	},
	methods: {
		...mapActions(['listenTrack', 'addNewTrackToPlaylist', 'deleteTrack']),

		listenThisTrack(track) {
			if (this.index || this.index === 0) {
				this.listenTrack({ track: track, isPlaylist: false, search: false });
			} else if (this.search) {
				this.listenTrack({ track: track, isPlaylist: false, search: true });
			} else {
				this.listenTrack({ track: track, isPlaylist: true, search: false });
			}
		},

		displayTime() {
			return msToMinsAndSecs(this.track.timeMillis, false);
		},

		isPlaying(id) {
			return (
				this.musicPlayerTrack !== undefined && this.musicPlayerTrack.id === id
			);
		},

		isTrackAlreadyPresent(id, tracks) {
			for (const track of tracks) {
				if (id === track.id) {
					return true;
				}
			}
			return false;
		},

		async addTrackToPlaylist(playlistId) {
			this.isLoading = true;
			const playlistTmp = this.getPlaylistById(playlistId);
			this.snackBarInfo =
				'This operation can take some time... Please be patient';
			if (!this.isTrackAlreadyPresent(this.track.id, playlistTmp.tracks)) {
				await this.addNewTrackToPlaylist({
					playlist: playlistTmp,
					track: this.track
				});
				this.snackBarInfo =
					this.track.name + ' has been added to ' + playlistTmp.name;
			} else {
				this.snackBarInfo = this.track.name + ' already in ' + playlistTmp.name;
			}
			this.isLoading = false;
		},

		async removeFromPlaylist() {
			this.isLoading = true;
			this.snackBarInfo =
				'This operation can take some time... Please be patient';
			if (
				await this.deleteTrack({ playlist: this.playlist, track: this.track })
			) {
				this.snackBarInfo = this.track.name + ' removed';
			} else {
				this.snackBarInfo = this.track.name + " can't be removed";
			}
			this.isLoading = false;
		}
	}
};
</script>
