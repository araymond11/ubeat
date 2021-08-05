<template>
	<v-card id="help" class="mx-auto">
		<v-toolbar color="primary" dark>
			<v-toolbar-title>Help</v-toolbar-title>
		</v-toolbar>

		<v-list subheader two-line flat disabled>
			<v-subheader>Application help</v-subheader>
			<v-list-item-group>
				<v-list-item>
					<template>
						<v-list-item-content>
							<v-list-item-title>
								If you have a problem, you can contact one of our developers
							</v-list-item-title>
						</v-list-item-content>
					</template>
				</v-list-item>
			</v-list-item-group>
		</v-list>

		<v-flex cols="12" sm12 md12 lg12 xl12 class="help-email">
			<p>
				Melvyn: <span class="color-email">melvyn-valery.piau.1@ulaval.ca</span>
			</p>
			<p>
				Lawrence: <span class="color-email">lawrence.michaux.1@ulaval.ca</span>
			</p>
			<p>Alex: <span class="color-email">alex.raymond.1@ulaval.ca</span></p>
			<p>Antoine: <span class="color-email">antoine.adam.1@ulaval.ca</span></p>
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

#help {
	width: 70%;
	max-width: 1000px;
	margin-top: 15px;
}
@media only screen and (max-width: 600px) {
	#help {
		width: 100%;
	}
}

.color-email {
	color: var(--v-primary-base);
}

.help-email {
	font-size: calc(13px + 0.3vw);
	text-align: center;
	padding-bottom: 15px;
}
</style>
