import Help from '@/views/Help.vue';
import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';

let wrapper;

beforeEach(() => {
	wrapper = shallowMount(Help);
});

describe('AppFooter.vue', () => {
	Vue.use(vuetify);
	Vue.use(VueRouter);

	it('renders a Vue instance', () => {
		expect(wrapper.isVueInstance).toBeTruthy();
	});

	it('has help id', () => {
		expect(wrapper.contains('#help')).toBe(true);
	});

	it('has help-email class', () => {
		expect(wrapper.contains('.help-email')).toBe(true);
	});

	it('has only one help-email class', () => {
		expect(wrapper.findAll('.help-email').length).toBe(1);
	});

	it('has four <p> tag', () => {
		expect(wrapper.findAll('p').length).toBe(4);
	});

	it('has four <span> tag', () => {
		expect(wrapper.findAll('span').length).toBe(4);
	});
});
