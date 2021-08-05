<template>
	<v-toolbar flat>
		<v-autocomplete
			v-model="keyword"
			:loading="isLoading"
			:search-input.sync="search"
			:items="autocompleteResults"
			v-on:keyup.enter="submit"
			class="mx-4"
			clearable
			flat
			solo
			no-filter
			hide-no-data
			hide-details
			label="Your research..."
			item-text="value"
		>
			<template slot="item" slot-scope="{ item }">
				<template v-if="item.type === 'track' || item.type === 'album'">
					<v-icon style="padding-right:10px;">{{ item.icon }}</v-icon>
					<v-list-item-avatar>
						<v-img :src="item.obj.getArtwork(50)" />
					</v-list-item-avatar>
					<v-list-item-title
						style="padding-left:15px;"
						v-html="item.obj.name"
					/>
				</template>
				<template v-else-if="item.type === 'user'">
					<v-icon style="padding-right:10px;">{{ item.icon }}</v-icon>
					<v-list-item-title style="padding-left:15px;">
						{{ item.obj.name }} - {{ item.obj.email }}
					</v-list-item-title>
				</template>
				<template v-else>
					<v-icon style="padding-right:10px;">
						{{ item.icon }}
					</v-icon>
					<v-list-item-title
						style="padding-left:15px;"
						v-html="item.obj.name"
					/>
				</template>
			</template>
		</v-autocomplete>
		<v-menu :close-on-content-click="false" :nudge-width="200" offset-x>
			<template v-slot:activator="{ on }">
				<v-btn icon v-on="on">
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</template>

			<v-card>
				<v-list>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>Research options</v-list-item-title>
							<v-list-item-subtitle>
								You can choose what you want to see in your research
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-action>
							<v-switch
								v-model="researchOptions.all"
								color="primary"
								@change="researchOptionUpdate(true)"
							/>
						</v-list-item-action>
						<v-icon style="padding-right:15px;">mdi-web</v-icon>
						<v-list-item-title>General research</v-list-item-title>
					</v-list-item>
				</v-list>
				<v-divider></v-divider>
				<v-list>
					<v-list-item>
						<v-list-item-action>
							<v-switch
								v-model="researchOptions.artists"
								color="primary"
								@change="researchOptionUpdate(false)"
							/>
						</v-list-item-action>
						<v-icon style="padding-right:15px">mdi-microphone</v-icon>
						<v-list-item-title>Research artists</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-action>
							<v-switch
								v-model="researchOptions.tracks"
								color="primary"
								@change="researchOptionUpdate(false)"
							/>
						</v-list-item-action>
						<v-icon style="padding-right:15px">mdi-music</v-icon>
						<v-list-item-title>Research tracks</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-action>
							<v-switch
								v-model="researchOptions.albums"
								color="primary"
								@change="researchOptionUpdate(false)"
							/>
						</v-list-item-action>
						<v-icon style="padding-right:15px">mdi-album</v-icon>
						<v-list-item-title>Research albums</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-action>
							<v-switch
								v-model="researchOptions.users"
								color="primary"
								@change="researchOptionUpdate(false)"
							/>
						</v-list-item-action>
						<v-icon style="padding-right:15px">mdi-account</v-icon>
						<v-list-item-title>Research users</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>
	</v-toolbar>
</template>

<style scoped>
.v-toolbar .v-input {
	margin-left: 5vw;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			keyword: '',
			isLoading: false,
			search: null,
			autocompleteTimer: undefined,

			researchOptions: {
				all: true,
				tracks: true,
				artists: true,
				albums: true,
				users: true,
				limit: 15
			}
		};
	},
	watch: {
		search(value) {
			if (value === null || value == '') return;
			if (this.autocompleteTimer !== undefined) {
				clearInterval(this.autocompleteTimer);
			}
			this.autocompleteTimer = setTimeout(async () => {
				this.autocomplete();
			}, 1000);
		}
	},
	computed: {
		...mapGetters({
			autocompleteResults: 'getAutocompleteResults'
		})
	},

	methods: {
		...mapActions(['updateSearch', 'cleanSearch']),

		researchOptionUpdate(isAll) {
			this.cleanSearch();
			if (isAll) {
				if (this.researchOptions.all) {
					this.researchOptions.tracks = true;
					this.researchOptions.artists = true;
					this.researchOptions.albums = true;
					this.researchOptions.users = true;
				}
			} else {
				if (
					!this.researchOptions.tracks ||
					!this.researchOptions.artists ||
					!this.researchOptions.albums ||
					!this.researchOptions.tracks
				) {
					this.researchOptions.all = false;
				} else if (
					this.researchOptions.tracks &&
					this.researchOptions.artists &&
					this.researchOptions.albums &&
					this.researchOptions.tracks
				) {
					this.researchOptions.all = true;
				}
			}
		},

		async autocomplete() {
			if (this.search.length == 0) return;
			this.isLoading = true;
			await this.updateSearch({
				options: this.researchOptions,
				keyword: this.search
			});
			this.isLoading = false;
		},

		async submit() {
			if (this.search.length == 0) return;
			const result = this.search;
			this.search = '';
			this.autocompleteTimer = undefined;
			this.$router.push('/search').catch(error => {
				if (error.name != 'NavigationDuplicated') {
					throw error;
				}
			});
			this.isLoading = true;
			await this.updateSearch({
				options: this.researchOptions,
				keyword: result
			});
			this.isLoading = false;
		}
	}
};
</script>
