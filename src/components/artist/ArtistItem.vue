<template>
	<router-link v-bind:to="{ name: 'Artist', params: { id: item.id } }">
		<v-card class="artist" hover>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="artist-title">
						{{ item.name }}
					</v-list-item-title>
					<v-list-item-subtitle class="artist-subtitle">
						{{ item.genre }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-card>
	</router-link>
</template>

<style scoped>
a {
	text-decoration: none;
}

.artist {
	width: 160px;
	transition: opacity 0.5s ease-in-out;
	opacity: 0.6;
	cursor: pointer;
	margin-bottom: 15px;
}
@media only screen and (max-width: 600px) {
	.artist {
		width: 110px;
	}
}
@media only screen and (min-width: 1904px) {
	.artist {
		width: 220px;
	}
}

.artist:hover {
	opacity: 1;
}

.artist-title,
.artist-subtitle {
	padding: 5px;
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--v-primary-base) !important;
}

.artist-title {
	padding-top: 0px;
	margin-top: 0px;
	font-size: 16px;
	color: var(--v-text-base);
}

.artist-subtitle {
	font-size: 12px;
	font-style: italic;
}

@media only screen and (max-width: 600px) {
	.artist-title {
		font-size: 13px;
	}
	.artist-subtitle {
		font-size: 11px;
	}
}
@media only screen and (min-width: 1904px) {
	.artist-title {
		font-size: 18px;
	}
	.artist-subtitle {
		font-size: 15px;
	}
}
</style>

<script>
export default {
	props: ['item'],
	watch: {
		item: function(newVal) {
			this.item = newVal;
		}
	}
};
</script>
