<template>
	<v-container>
		<template v-if="!artistIsLoading">
			<ArtistInfo />
		</template>
		<template v-else>
			<LazyImageDownload />
		</template>

		<template v-if="!albumsIsLoading">
			<AlbumsList />
		</template>
		<template v-else>
			<LazyImageDownload />
		</template>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { scrollToTop } from '@/utils/utils';
import ArtistInfo from '@/components/artist/ArtistInfo';
import AlbumsList from '@/components/album/AlbumsList';
import LazyImageDownload from '@/components/LazyImageDownload';

export default {
	data() {
		return {
			artistIsLoading: true,
			albumsIsLoading: true
		};
	},
	components: {
		ArtistInfo: ArtistInfo,
		AlbumsList: AlbumsList,
		LazyImageDownload: LazyImageDownload
	},
	methods: {
		...mapActions(['changeCurrentArtist', 'changeCurrentArtistAlbum'])
	},

	async created() {
		scrollToTop();
		await this.changeCurrentArtist(this.$route.params.id);
		this.artistIsLoading = false;
		await this.changeCurrentArtistAlbum(this.$route.params.id);
		this.albumsIsLoading = false;
	}
};
</script>
