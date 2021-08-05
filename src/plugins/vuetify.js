import Vue from 'vue';

import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify, {
	iconfont: 'mdi'
});

export default new Vuetify({
	theme: {
		options: {
			customProperties: true
		},
		dark: true,
		themes: {
			light: {
				primary: '#F7882F',
				secondary: '#F7C331',
				text: '#1A1A1A',
				invert_text: '#F0F0F0'
			},
			dark: {
				primary: '#F7882F',
				secondary: '#F7C331',
				text: '#F0F0F0',
				invert_text: '#1A1A1A'
			}
		}
	}
});
