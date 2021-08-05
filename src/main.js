import Vue from 'vue';

import 'vuetify/dist/vuetify.min.css';

import 'core-js/stable';

import App from './App.vue';
import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';
Vue.use(require('vue-cookies'));
Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	vuetify,
	store,
	router
}).$mount('#app');
