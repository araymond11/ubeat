<template>
	<v-flex v-if="album !== undefined" cols="12" sm12 md3 lg3 xl3 id="album">
		<v-img class="album-image" :src="album.getArtwork(400)">
			<template v-slot:placeholder>
				<LazyImageDownload />
			</template>
		</v-img>
		<h1 class="album-title">{{ album.name }}</h1>
		<h2 class="album-author">{{ album.artistName }} - {{ album.genre }}</h2>
		<div id="album-info-block">
			<h3 class="album-info">Released on {{ album.releaseDate }}</h3>
			<h4 class="album-info">Price: {{ album.price }}</h4>
			<h4 class="album-copyright">{{ album.copyright }}</h4>
		</div>
		<v-layout class="apple-layout">
			<v-flex cols="5" sm5 md5 lg5 xl5>
				<a :href="album.url" target="blank" class="button-apple" />
			</v-flex>
		</v-layout>
	</v-flex>
	<v-flex v-else cols="12" sm12 md3 lg3 xl3>
		<NetworkError msg="album information" />
	</v-flex>
</template>

<style scoped>
#album-info-block {
	padding-top: 10px;
	margin-top: 15px;
	padding-bottom: 10px;
}
#album {
	height: max-content;
	border-radius: 5px;
}

@media only screen and (min-width: 960px) {
	#album {
		height: max-content;
		border-radius: 5px;
		margin-top: 15vh;
	}
}

.album-image {
	display: flex;
	justify-content: center;
	align-content: center;
	text-align: center;
	width: 225px;
	margin: auto;
	margin-top: 15px;
	border-radius: 50%;
}
@media only screen and (min-width: 1904px) {
	.album-image {
		max-width: 400px;
	}
}
@media only screen and (max-width: 600px) {
	.album-image {
		max-width: 140px;
	}
}

.album-title {
	font-size: calc(20px + 0.4vw);
	text-align: center;
	margin-top: 5px;
	font-weight: initial;
}

.album-author {
	font-size: calc(16px + 0.4vw);
	text-align: center;
	color: var(--v-primary-base);
	font-weight: initial;
	font-style: italic;
}

.album-info {
	font-size: calc(13px + 0.4vw);
	font-weight: initial;
	text-align: center;
}

.album-copyright {
	font-size: calc(10px + 0.3vw);
	text-align: center;
	font-weight: initial;
	font-style: italic;
	margin-top: 5px;
}

.apple-layout {
	justify-content: center;
	margin-top: 10px;
	text-align: center;
}

.button-apple {
	display: inline-block;
	overflow: hidden;
	background: url('./../../assets/button-apple.png') no-repeat;
	background-size: 100%;
	width: 160px;
	height: 55px;
}
</style>

<script>
import LazyImageDownload from '@/components/LazyImageDownload';
import NetworkError from '@/components/NetworkError';
import { mapGetters } from 'vuex';

export default {
	components: {
		LazyImageDownload: LazyImageDownload,
		NetworkError: NetworkError
	},
	computed: {
		...mapGetters({ album: 'currentAlbum' })
	}
};
</script>
