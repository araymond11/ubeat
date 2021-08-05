<template>
	<router-link v-bind:to="{ name: 'Album', params: { id: item.id } }">
		<v-card class="album" hover>
			<v-img :src="item.getArtwork(300)" :title="item.name">
				<template v-slot:placeholder>
					<LazyImageDownload />
				</template>
				<v-menu offset-y open-on-hover close-on-content-click nudge-width="150">
					<template v-slot:activator="{ on }">
						<v-btn
							icon
							rounded
							depressed
							:loading="isLoading"
							max-width="45px"
							max-height="45px"
							v-on="on"
							style="margin-top: 5px;margin-left:5px;z-index:100"
						>
							<v-icon medium>mdi-content-save</v-icon>
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
			</v-img>
			<v-card-title class="album-title">
				{{ item.name }}
			</v-card-title>
			<v-card-subtitle class="album-subtitle primary--text">
				{{ item.artistName }} - {{ item.trackCount }} songs
			</v-card-subtitle>
		</v-card>
	</router-link>
</template>

<style scoped>
a {
	text-decoration: none;
}

.album {
	max-width: 160px;
	transition: opacity 0.5s ease-in-out;
	opacity: 0.6;
	cursor: pointer;
	margin-bottom: 15px;
}
@media only screen and (max-width: 600px) {
	.album {
		max-width: 110px;
	}
}
@media only screen and (min-width: 1904px) {
	.album {
		max-width: 220px;
	}
}

.album:hover {
	opacity: 1;
}

.album-title,
.album-subtitle {
	padding: 5px;
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.album-title {
	padding-top: 0px;
	margin-top: 0px;
	font-size: 16px;
	color: var(--v-text-base);
}

.album-subtitle {
	font-size: 12px;
	font-style: italic;
}

@media only screen and (max-width: 600px) {
	.album-title {
		font-size: 13px;
	}
	.album-subtitle {
		font-size: 11px;
	}
}
@media only screen and (min-width: 1904px) {
	.album-title {
		font-size: 18px;
	}
	.album-subtitle {
		font-size: 15px;
	}
}
</style>

<script>
import LazyImageDownload from '@/components/LazyImageDownload';
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			snackBarInfo: '',
			isLoading: false
		};
	},
	components: {
		LazyImageDownload: LazyImageDownload
	},
	props: ['item'],
	watch: {
		item: function(newVal) {
			this.item = newVal;
		}
	},
	computed: {
		...mapGetters({
			tracks: 'currentAlbumTracks',
			playlists: 'userPlaylists',
			getPlaylistById: 'getPlaylistById'
		})
	},
	methods: {
		...mapActions(['addNewTrackToPlaylist']),

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
