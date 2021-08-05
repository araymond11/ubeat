import AppFooter from '@/components/app/AppFooter.vue';
import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';

let wrapper;

beforeEach(() => {
	wrapper = shallowMount(AppFooter);
});

describe('AppFooter.vue', () => {
	Vue.use(vuetify);
	Vue.use(VueRouter);

	it('renders a Vue instance', () => {
		expect(wrapper.isVueInstance).toBeTruthy();
	});

	it('has footer id', () => {
		expect(wrapper.contains('#footer')).toBe(true);
	});

	it('has footer-copyright id', () => {
		expect(wrapper.contains('#footer-copyright')).toBe(true);
	});
});
