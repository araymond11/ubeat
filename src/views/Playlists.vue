<template>
	<v-container v-if="isLoading">
		<LazyImageDownload />
	</v-container>
	<v-container v-else-if="!isLoading && playlists !== undefined">
		<v-container>
			<v-layout row>
				<v-flex>
					<h1 id="user-playlists">My playlists</h1>
					<h2 id="user-playlists-details">
						You have currently {{ playlists.length }} playlist(s)
					</h2>
					<v-btn
						fab
						dark
						large
						color="primary"
						fixed
						right
						bottom
						style="margin-bottom:30px;"
						@click="dialog = !dialog"
					>
						<v-icon dark>mdi-plus</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>

			<v-dialog
				v-model="dialog"
				max-width="500px"
				max-height="200px"
				persistent
			>
				<v-card>
					<v-card-title>Playlist creation</v-card-title>
					<v-card-text>
						<v-text-field
							label="Name of your new playlist"
							clearable
							prepend-inner-icon="mdi-bookmark-music"
							v-model="name"
							:rules="[rules.required]"
						/>
					</v-card-text>
					<v-card-actions>
						<v-btn large text color="grey" @click="cleanDialog">Cancel</v-btn>
						<v-spacer></v-spacer>
						<v-btn
							:disabled="name.length === 0"
							:loading="buttonLoading"
							text
							color="primary"
							@click="createNewPlaylist"
						>
							Create now
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-container>
		<v-layout
			v-if="playlists.length > 0"
			style="display:flex;justify-content:center;"
		>
			<v-flex cols="12" sm12 md8 lg8 xl8>
				<v-list two-line flat>
					<v-list-item-group>
						<template v-for="(playlist, index) in playlists">
							<PlaylistItem :playlist="playlist" :key="playlist.id" />
							<v-divider v-if="index + 1 < playlists.length" :key="index" />
						</template>
					</v-list-item-group>
				</v-list>
			</v-flex>
		</v-layout>
	</v-container>
	<v-container v-else>
		<NetworkError msg="playlists information" />
	</v-container>
</template>

<style scoped>
#user-playlists {
	font-size: calc(20px + 0.4vw);
	text-align: center;
	margin-top: 5px;
	font-weight: initial;
}
#user-playlists-details {
	font-size: calc(16px + 0.3vw);
	text-align: center;
	color: var(--v-primary-base);
	font-weight: initial;
	font-style: italic;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import PlaylistItem from '@/components/playlist/PlaylistItem';
import NetworkError from '@/components/NetworkError';
import LazyImageDownload from '@/components/LazyImageDownload';

export default {
	data() {
		return {
			isLoading: false,
			dialog: false,
			name: '',
			buttonLoading: false,
			rules: {
				required: v => !!v || 'You need at least one character'
			}
		};
	},
	components: {
		PlaylistItem: PlaylistItem,
		NetworkError: NetworkError,
		LazyImageDownload: LazyImageDownload
	},
	computed: {
		...mapGetters({
			playlists: 'userPlaylists',
			loggedInUser: 'loggedInUser'
		})
	},
	methods: {
		...mapActions(['createPlaylist', 'updatePlaylists', 'getTokenInfo']),

		cleanDialog() {
			this.name = '';
			this.dialog = false;
		},

		async createNewPlaylist() {
			this.buttonLoading = true;
			await this.createPlaylist(this.name);
			this.buttonLoading = false;
			this.cleanDialog();
		}
	},
	async created() {
		this.isLoading = true;
		await this.getTokenInfo();
		await this.updatePlaylists(this.loggedInUser['id']);
		this.isLoading = false;
	}
};
</script>
