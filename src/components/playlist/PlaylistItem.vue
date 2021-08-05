<template>
	<v-hover v-slot:default="{ hover }">
		<v-list-item>
			<v-list-item-avatar>
				<v-icon v-if="hover" large color="primary">mdi-bookmark-music</v-icon>
				<v-icon large v-else>mdi-bookmark-music</v-icon>
			</v-list-item-avatar>
			<v-list-item-content>
				<router-link
					v-bind:to="{ name: 'PlaylistTracks', params: { playlist } }"
					class="router-link"
				>
					<v-list-item-title class="playlist">
						{{ playlist.name }}
					</v-list-item-title>
					<v-list-item-subtitle class="subtitle">
						{{ playlist.tracks.length }} songs
					</v-list-item-subtitle>
				</router-link>
			</v-list-item-content>
			<v-btn icon large color="primary" @click="dialog = !dialog">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
			<v-btn
				icon
				:loading="deleteLoading"
				large
				color="primary"
				@click="deleteThisPlaylist"
				style="margin-left:10px;"
			>
				<v-icon>mdi-delete</v-icon>
			</v-btn>

			<v-dialog
				v-model="dialog"
				max-width="500px"
				max-height="200px"
				persistent
			>
				<v-card>
					<v-card-title>Rename my playlist</v-card-title>
					<v-card-text>
						<v-text-field
							label="New name of your playlist"
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
							@click="renamePlaylist"
						>
							Rename
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-list-item>
	</v-hover>
</template>

<style scoped>
.playlist {
	font-size: calc(14px + 0.3vw);
}

.router-link {
	text-decoration: none;
}
</style>

<script>
import { mapActions } from 'vuex';

export default {
	props: ['playlist'],
	data() {
		return {
			deleteLoading: false,
			dialog: false,
			name: this.playlist.name,
			buttonLoading: false,
			rules: {
				required: v => !!v || 'You need at least one character'
			}
		};
	},
	watch: {
		playlist: async function(newVal) {
			this.playlist = newVal;
		}
	},
	methods: {
		...mapActions(['deletePlaylist', 'changePlaylistName']),

		async deleteThisPlaylist() {
			this.deleteLoading = true;
			await this.deletePlaylist(this.playlist.id);
			this.deleteLoading = false;
		},

		cleanDialog() {
			this.name = this.playlist.name;
			this.dialog = false;
		},

		async renamePlaylist() {
			this.buttonLoading = true;
			await this.changePlaylistName({ id: this.playlist.id, name: this.name });
			this.buttonLoading = false;
			this.cleanDialog();
		}
	}
};
</script>
