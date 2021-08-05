import NetworkError from '@/components/NetworkError.vue';
import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';

describe('NetworkError.vue', () => {
	let wrapper;
	Vue.use(vuetify);
	Vue.use(VueRouter);

	beforeEach(() => {
		wrapper = shallowMount(NetworkError);
	});
	it('renders a Vue instance', () => {
		expect(wrapper.isVueInstance).toBeTruthy();
	});

	it('renders correctly the msg props', () => {
		expect(wrapper.vm.msg).toBeUndefined();
	});

	it('contains h4 tags', () => {
		expect(wrapper.contains('h4')).toBe(true);
	});

	it('has fill-height class', () => {
		expect(wrapper.contains('.fill-height')).toBe(true);
	});
});
