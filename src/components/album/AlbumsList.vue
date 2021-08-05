<template>
	<v-container v-if="albums !== undefined">
		<v-flex cols="12" sm12 md12 lg12 xl12>
			<p>ALBUMS</p>
			<v-divider style="margin-bottom: 15px;" />
		</v-flex>
		<v-layout row wrap>
			<v-flex
				v-for="album of albums"
				:key="album.id"
				cols="6"
				sm4
				md3
				lg2
				xl2
				class="album-list"
			>
				<AlbumItem :item="album" />
			</v-flex>
		</v-layout>
	</v-container>
	<v-container v-else>
		<NetworkError msg="albums list information" />
	</v-container>
</template>

<style scoped>
.album-list {
	display: flex;
	justify-content: center;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-bottom: 12px solid transparent;
}
</style>

<script>
import { mapGetters } from 'vuex';
import AlbumItem from '@/components/album/AlbumItem';

export default {
	components: {
		AlbumItem: AlbumItem
	},
	computed: {
		...mapGetters({ albums: 'currentArtistAlbums' })
	}
};
</script>
