<template>
	<v-avatar v-if="image === ''">
		<template v-slot:placeholder>
			<LazyImageDownload />
		</template>
	</v-avatar>
	<v-avatar
		v-else-if="image !== undefined && image !== '' && profile !== 'big'"
	>
		<v-img :src="image" :alt="email" />
	</v-avatar>
	<v-avatar
		size="220"
		tile
		v-else-if="image !== undefined && image !== '' && profile === 'big'"
	>
		<v-img position="center" :src="image" :alt="email" />
	</v-avatar>
	<v-avatar v-else size="36" color="primary">
		<span>{{ email[0] }}</span>
	</v-avatar>
</template>

<script>
import { getGravatarImage } from '@/apis/gravatar';
import LazyImageDownload from '@/components/LazyImageDownload';

export default {
	data: () => ({
		image: ''
	}),
	components: {
		LazyImageDownload: LazyImageDownload
	},
	props: {
		email: String,
		profile: String
	},
	async created() {
		if (this.profile !== undefined && this.profile == 'big') {
			this.image = await getGravatarImage(this.email, 220);
		} else {
			this.image = await getGravatarImage(this.email, 100);
		}
	}
};
</script>
