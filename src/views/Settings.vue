<template>
	<v-card id="settings" class="mx-auto">
		<v-toolbar color="primary" dark>
			<v-toolbar-title>Settings</v-toolbar-title>
		</v-toolbar>

		<v-list subheader two-line flat>
			<v-subheader>Application settings</v-subheader>
			<v-list-item-group v-model="settings" multiple>
				<v-list-item>
					<template>
						<v-list-item-action class="settings-action">
							<v-switch
								v-model="$vuetify.theme.dark"
								hide-details
								inset
							></v-switch>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>Dark Mode</v-list-item-title>
							<v-list-item-subtitle>
								Activate or desactivate the dark mode
							</v-list-item-subtitle>
						</v-list-item-content>
					</template>
				</v-list-item>
			</v-list-item-group>
		</v-list>

		<v-flex cols="12" sm12 md12 lg12 xl12 class="settings-color-picker">
			<p>Change the main color of Sounder as you wish</p>
		</v-flex>
		<v-flex cols="12" sm12 md12 lg12 xl12 class="settings-color-picker">
			<v-color-picker
				v-model="primary_color"
				flat
				hide-inputs
				hide-mode-switch
			/>
		</v-flex>
	</v-card>
</template>

<style scoped>
.v-toolbar__title {
	font-size: calc(20px + 0.5vw);
}
.v-subheader {
	font-size: calc(12px + 0.3vw);
}
.v-list-item__title {
	font-size: calc(13px + 0.3vw);
}
.v-list-item__subtitle {
	font-size: calc(9px + 0.3vw);
}

#settings {
	width: 70%;
	max-width: 1000px;
	margin-top: 15px;
}
@media only screen and (max-width: 600px) {
	#settings {
		width: 100%;
	}
}

.settings-action {
	width: 5%;
}

.settings-color-picker {
	display: flex;
	justify-content: center;
}
@media only screen and (max-width: 600px) {
	.settings-color-picker {
		transform: scale(0.875);
	}
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data: () => ({
		settings: [],
		type: 'hex'
	}),
	methods: {
		...mapActions(['changeAppColor'])
	},
	computed: {
		...mapGetters({ appColor: 'appColor' }),

		primary_color: {
			get() {
				return this[this.type];
			},
			async set(newColor) {
				await this.changeAppColor(newColor);
				this[this.type] = newColor;
				this.$vuetify.theme.themes.light.primary = newColor.hex;
				this.$vuetify.theme.themes.dark.primary = newColor.hex;
			}
		}
	},
	async created() {
		if (this.appColor !== undefined) {
			this[this.type] = this.appColor;
			this.$vuetify.theme.themes.light.primary = this.appColor.hex;
			this.$vuetify.theme.themes.dark.primary = this.appColor.hex;
		}
	}
};
</script>
