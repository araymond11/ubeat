import Search from '@/views/Search.vue';
import SearchElements from '@/components/search/SearchElements';
import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';

describe('Search.vue', () => {
	let wrapper;
	Vue.use(vuetify);
	Vue.use(VueRouter);

	beforeEach(() => {
		wrapper = shallowMount(Search);
	});

	it('renders a Vue instance', () => {
		expect(wrapper.isVueInstance).toBeTruthy();
	});

	it('contains the SearchElements component', () => {
		expect(wrapper.contains(SearchElements)).toBe(true);
	});
});
