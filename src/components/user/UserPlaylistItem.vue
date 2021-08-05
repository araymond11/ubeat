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
			name: this.playlist.name
		};
	},
	watch: {
		playlist: async function(newVal) {
			this.playlist = newVal;
		}
	},
	methods: {
		...mapActions([])
	}
};
</script>
