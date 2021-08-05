<template>
	<v-container>
		<v-layout row wrap justify-space-around>
			<template v-if="!isAlbumLoading">
				<AlbumInfo />
			</template>
			<template v-else>
				<v-flex cols="12" sm12 md3 lg3 xl3>
					<LazyImageDownload />
				</v-flex>
			</template>

			<template v-if="!isTracksLoading">
				<Tracks />
			</template>
			<template v-else>
				<LazyImageDownload />
			</template>
		</v-layout>
	</v-container>
</template>

<script>
import { scrollToTop } from '@/utils/utils';
import Tracks from '@/components/track/Tracks';
import AlbumInfo from '@/components/album/AlbumInfo';
import LazyImageDownload from '@/components/LazyImageDownload';
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			isAlbumLoading: true,
			isTracksLoading: true
		};
	},
	components: {
		AlbumInfo: AlbumInfo,
		Tracks: Tracks,
		LazyImageDownload: LazyImageDownload
	},
	methods: {
		...mapActions(['changeCurrentAlbum', 'changeCurrentAlbumTracks'])
	},
	async created() {
		scrollToTop();
		await this.changeCurrentAlbum(this.$route.params.id);
		this.isAlbumLoading = false;
		await this.changeCurrentAlbumTracks(this.$route.params.id);
		this.isTracksLoading = false;
	}
};
</script>
