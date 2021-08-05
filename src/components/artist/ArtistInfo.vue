<template>
	<v-container v-if="artist !== undefined">
		<v-layout column>
			<v-flex cols="12" sm12 md12 lg12 xl12 class="artist-title">
				<p>{{ artist.name }}</p>
			</v-flex>
			<v-flex cols="12" sm12 md12 lg12 xl12 class="artist-genre">
				<p>{{ artist.genre }}</p>
			</v-flex>
			<v-flex cols="12" sm12 md12 lg12 xl12 class="artist-button">
				<a :href="artist.url" target="blank" class="apple-button" />
			</v-flex>
		</v-layout>
	</v-container>
	<v-container v-else>
		<NetworkError msg="artist information" />
	</v-container>
</template>

<style scoped>
.artist-title {
	display: flex;
	justify-content: center;
	font-size: calc(45px + 2.5vw);
	max-height: calc(60px + 2.5vw);
	font-weight: bolder;
}

.artist-genre {
	display: flex;
	justify-content: center;
	font-size: calc(13px + 0.5vw);
	color: var(--v-primary-base);
}

.artist-button {
	margin: calc(5px + 0.3vw);
	margin-bottom: calc(25px + 0.5vw);
	display: flex;
	justify-content: center;
}

.apple-button {
	display: inline-block;
	overflow: hidden;
	background: url('./../../assets/button-apple.png') no-repeat;
	background-size: 100%;
	width: 160px;
	height: 55px;
}
</style>

<script>
import { mapGetters } from 'vuex';
import NetworkError from '@/components/NetworkError';

export default {
	components: {
		NetworkError: NetworkError
	},
	computed: {
		...mapGetters({ artist: 'currentArtist' })
	}
};
</script>
