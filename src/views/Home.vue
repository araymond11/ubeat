<template>
	<v-container>
		<template v-if="historic.length > 0">
			<v-flex cols="12" sm12 md12 lg12 xl12>
				<p class="category">Albums recently listened</p>
				<v-divider style="margin-bottom: 15px;" />
				<SliderAlbumItems :albums="historic" />
			</v-flex>
		</template>

		<template v-if="homeAlbumsEpic.length > 0">
			<v-flex cols="12" sm12 md12 lg12 xl12>
				<p class="category">
					Popular albums you might be interested to discover
				</p>
				<v-divider style="margin-bottom: 15px;" />
				<SliderAlbumItems :albums="homeAlbumsEpic" />
			</v-flex>
		</template>
		<template v-else>
			<LazyImageDownload />
		</template>

		<template v-if="homeAlbumsRock.length > 0">
			<v-flex cols="12" sm12 md12 lg12 xl12>
				<p class="category">Popular rock albums</p>
				<v-divider style="margin-bottom: 15px;" />
				<SliderAlbumItems :albums="homeAlbumsRock" />
			</v-flex>
		</template>
		<template v-else>
			<LazyImageDownload />
		</template>

		<template v-if="homeAlbumsDisney.length > 0">
			<v-flex cols="12" sm12 md12 lg12 xl12>
				<p class="category">Disney albums</p>
				<v-divider style="margin-bottom: 15px;" />
				<SliderAlbumItems :albums="homeAlbumsDisney" />
			</v-flex>
		</template>
		<template v-else>
			<LazyImageDownload />
		</template>
	</v-container>
</template>

<style scoped>
.home {
	text-align: center;
}

.category {
	font-size: calc(14px + 0.3vw);
}
</style>

<script>
import { mapGetters } from 'vuex';
import SliderAlbumItems from '@/components/SliderAlbumItems';
import LazyImageDownload from '@/components/LazyImageDownload';

export default {
	components: {
		SliderAlbumItems: SliderAlbumItems,
		LazyImageDownload: LazyImageDownload
	},
	computed: {
		...mapGetters({
			loggedInUser: 'loggedInUser',
			historic: 'historic',
			homeAlbumsEpic: 'homeAlbumsEpic',
			homeAlbumsRock: 'homeAlbumsRock',
			homeAlbumsDisney: 'homeAlbumsDisney'
		})
	}
};
</script>
