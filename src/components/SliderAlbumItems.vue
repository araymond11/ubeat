<template>
	<v-slide-group class="pa-4 mx-auto" show-arrows center-active>
		<v-slide-item
			v-for="(album, index) in albums"
			:key="index"
			style="padding: 10px;"
		>
			<AlbumItem :item="album" />
		</v-slide-item>
	</v-slide-group>
</template>

<script>
import AlbumItem from '@/components/album/AlbumItem';

export default {
	components: {
		AlbumItem: AlbumItem
	},
	props: ['albums']
};
</script>
