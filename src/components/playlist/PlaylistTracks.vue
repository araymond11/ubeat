<template>
	<v-container style="margin-top: 15px;">
		<v-layout row wrap justify-space-around>
			<v-flex
				id="playlist"
				v-if="playlist !== undefined"
				cols="12"
				sm12
				md3
				lg3
				xl3
			>
				<v-layout row style="text-align:center;">
					<v-flex cols="12" sm12 md12 lg12 xl12>
						<h1 class="playlist-title">{{ playlist.name }}</h1>
						<span class="playlist-desc">
							{{ displayPlaylist() }}
						</span>
					</v-flex>
					<v-flex class="layout" cols="12" sm12 md12 lg12 xl12>
						<v-btn
							:disabled="playlist.tracks.length === 0"
							class="tracks-button"
							rounded
							depressed
							large
							color="primary"
							@click="listenAlbumTracks(playlist.tracks)"
						>
							<v-icon left>mdi-play</v-icon>
							PLAY
						</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
			<v-flex
				v-if="playlist !== undefined && playlist.tracks.length > 0"
				cols="12"
				sm12
				md8
				lg8
				xl8
			>
				<v-list two-line flat>
					<v-list-item-group>
						<template v-for="(track, index) in playlist.tracks">
							<TrackItem :track="track" :key="track.id" />
							<v-divider
								v-if="index + 1 < playlist.tracks.length"
								:key="index"
							/>
						</template>
					</v-list-item-group>
				</v-list>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<style scoped>
#playlist {
	height: max-content;
	border-radius: 5px;
}

@media only screen and (min-width: 960px) {
	#playlist {
		height: max-content;
		margin-top: 15vh;
	}
}

.playlist-title {
	font-size: calc(20px + 0.4vw);
	text-align: center;
	margin-top: 5px;
	font-weight: initial;
}

.playlist-desc {
	font-size: calc(16px + 0.4vw);
	text-align: center;
	color: var(--v-primary-base);
	font-weight: initial;
	font-style: italic;
}

.layout {
	display: flex;
	justify-content: center;
}

.tracks-button {
	margin-top: 35px;
	margin-bottom: 10px;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import TrackItem from '@/components/track/TrackItem';
import * as utils from '@/utils/utils';

export default {
	name: 'PlaylistTracks',
	data() {
		return {
			c_index: -1,
			selected: []
		};
	},
	components: {
		TrackItem: TrackItem
	},
	computed: {
		...mapGetters({
			currentMusic: 'musicPlayerCurrentTrack',
			playlist: 'currentPlaylist'
		})
	},
	methods: {
		...mapActions(['listenAlbumTracks', 'changeCurrentPlaylist']),

		isPlaying(id) {
			return this.currentMusic !== undefined && this.currentMusic.id === id;
		},
		displayPlaylist() {
			return (
				this.playlist.tracks.length +
				' songs - ' +
				utils.albumTotalTime(this.playlist.tracks, true)
			);
		}
	},

	async created() {
		if (this.$route.params.playlist !== undefined) {
			await this.changeCurrentPlaylist(this.$route.params.playlist);
		} else {
			this.$router.push({ name: 'Playlists' });
		}
	}
};
</script>
