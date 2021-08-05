<template>
	<v-container
		id="player"
		v-if="mpTrack !== undefined && musicPlayer !== undefined"
	>
		<router-link v-bind:to="{ name: 'Album', params: { id: mpTrack.albumId } }">
			<v-img :src="mpTrack.getArtwork(400)">
				<template v-slot:placeholder>
					<LazyImageDownload />
				</template>
			</v-img>
		</router-link>

		<v-progress-linear
			:value="progressValue"
			min="0.0"
			max="100.0"
			style="height: 5px;"
		/>
		<v-layout row>
			<v-flex cols="2" sm2 md2 lg2 xl2>
				<p>{{ timer }}</p>
			</v-flex>
			<v-flex cols="7" sm7 md7 lg7 xl7>
				<v-slider
					v-model="volume"
					:prepend-icon="
						volume != 0 ? 'mdi-volume-source' : 'mdi-volume-variant-off'
					"
					@click:prepend="muteVolume"
					@input="updateVolume(volume)"
					thumb-label
					thumb-color="primary"
					max="100"
					step="1"
					style="padding-top:10px;padding-bottom:0px;max-height:30px;"
				/>
			</v-flex>
			<v-flex cols="2" sm2 md2 lg2 xl2>
				<p>{{ formatTime(musicPlayer.duration()) }}</p>
			</v-flex>
		</v-layout>

		<v-list two-line>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="music-title">
						{{ mpTrack.name }}
					</v-list-item-title>
					<v-list-item-subtitle class="music-subtitle">
						{{ mpTrack.albumName }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-layout row>
			<v-flex cols="12" sm12 md12 lg12 xl12>
				<template v-if="mpLength > 1">
					<v-btn icon small fab color="primary" @click="skipTrack('prev')">
						<v-icon>mdi-skip-backward</v-icon>
					</v-btn>
				</template>
				<template v-else>
					<v-btn icon small fab color="primary" disabled>
						<v-icon>mdi-skip-backward</v-icon>
					</v-btn>
				</template>

				<v-btn icon large fab color="primary" @click="playAndPause()">
					<v-icon v-if="musicPlayer.playing()">mdi-pause</v-icon>
					<v-icon v-else>mdi-play</v-icon>
				</v-btn>

				<template v-if="mpLength > 1">
					<v-btn icon small fab color="primary" @click="skipTrack('next')">
						<v-icon>mdi-skip-forward</v-icon>
					</v-btn>
				</template>
				<template v-else>
					<v-btn icon small fab color="primary" disabled>
						<v-icon>mdi-skip-forward</v-icon>
					</v-btn>
				</template>

				<template v-if="musicPlayer.loop()">
					<v-btn icon small fab color="primary" @click="loop()">
						<v-icon>mdi-repeat</v-icon>
					</v-btn>
				</template>
				<template v-else>
					<v-btn icon small fab color="grey" @click="loop()">
						<v-icon>mdi-repeat-off</v-icon>
					</v-btn>
				</template>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<style scoped>
#player {
	bottom: 0px;
	padding: 0px;
}

.layout {
	display: flex;
	justify-content: center;
	text-align: center;
}

.music-title {
	font-size: calc(18px + 0.1vw);
	text-align: center;
	color: var(--v-primary-base);
}

.music-subtitle {
	font-size: calc(15px + 0.1vw);
	font-style: italic;
	text-align: center;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Howl, Howler } from 'howler';
import LazyImageDownload from '@/components/LazyImageDownload';

export default {
	components: {
		LazyImageDownload: LazyImageDownload
	},
	data() {
		return {
			musicPlayer: undefined,
			progress: 0.0,
			timer: '0:00',
			volume: 50.0,
			mutedVolume: 50.0
		};
	},
	computed: {
		...mapGetters({
			mpTrack: 'musicPlayerCurrentTrack',
			mpLength: 'musicPlayerTracksNumber',
			isSessionActive: 'isSessionActive'
		}),

		actualTime: function() {
			return this.timer;
		},
		progressValue: function() {
			return this.progress;
		}
	},

	watch: {
		mpTrack: function(newTrack) {
			this.updateVolume(this.volume);
			let self = this;
			if (this.musicPlayer !== undefined) {
				this.musicPlayer.stop();
			}
			this.musicPlayer = new Howl({
				src: [newTrack.previewUrl],
				html5: true,
				onend: function() {
					self.skipTrack('next');
				},
				onplay: function() {
					requestAnimationFrame(self.step.bind(self));
				}
			});
			this.musicPlayer.play();
		}
	},

	methods: {
		...mapActions(['skipTrack']),
		formatTime(secs) {
			const minutes = Math.floor(secs / 60);
			const seconds = secs - minutes * 60;
			const dispMinutes = minutes == 0 ? '0' : minutes;
			return dispMinutes + ':' + (seconds < 10 ? '0' : '') + seconds;
		},

		playAndPause() {
			if (this.musicPlayer.playing()) {
				this.musicPlayer.pause();
			} else {
				this.musicPlayer.play();
			}
		},

		loop() {
			this.musicPlayer.loop(!this.musicPlayer.loop());
		},

		step() {
			const seek = Math.round(this.musicPlayer.seek());
			this.timer = this.formatTime(seek);
			this.progress = (seek / this.musicPlayer.duration()) * 100.0;
			if (this.musicPlayer.playing()) {
				requestAnimationFrame(this.step.bind(this));
			}
		},

		updateVolume(volume) {
			Howler.volume(volume / 100.0);
		},

		muteVolume() {
			if (this.volume == 0) {
				this.volume = this.mutedVolume;
			} else {
				this.mutedVolume = this.volume;
				this.volume = 0;
			}
			this.updateVolume(this.volume);
		}
	}
};
</script>
