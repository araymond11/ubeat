import SnackBarInfo from '@/components/SnackBarInfo';
import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';

describe('SnackBarInfo.vue', () => {
	let wrapper;
	Vue.use(vuetify);
	Vue.use(VueRouter);

	beforeEach(() => {
		wrapper = shallowMount(SnackBarInfo);
	});

	it('renders a Vue instance', () => {
		expect(wrapper.isVueInstance).toBeTruthy();
	});

	it('renders correctly the timer props', () => {
		expect(wrapper.vm.timer).toBeUndefined();
	});

	it('renders correctly the snackbar props', () => {
		expect(wrapper.vm.snackbar).toBe(false);
	});
});
