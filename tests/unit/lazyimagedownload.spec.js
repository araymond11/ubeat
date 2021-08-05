import LazyImageDownload from '@/components/LazyImageDownload';
import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';

describe('Search.vue', () => {
	let wrapper;
	Vue.use(vuetify);
	Vue.use(VueRouter);

	beforeEach(() => {
		wrapper = shallowMount(LazyImageDownload);
	});

	it('renders a Vue instance', () => {
		expect(wrapper.isVueInstance).toBeTruthy();
	});

	it('has fill-height class', () => {
		expect(wrapper.contains('.fill-height')).toBe(true);
	});
});
