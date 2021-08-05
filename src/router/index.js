import Home from '@/views/Home';
import Album from '@/views/Album';
import Artist from '@/views/Artist';
import Settings from '@/views/Settings';
import Help from '@/views/Help';
import Playlists from '@/views/Playlists';
import Search from '@/views/Search.vue';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';
import login from '@/views/Login';
import Profile from '@/views/Profile';
import Friends from '@/views/Friends';

import Vue from 'vue';

import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
	mode: 'history',

	routes: [
		{
			path: '/home',
			name: 'Home',
			component: Home
		},
		{
			path: '/artist/:id',
			name: 'Artist',
			component: Artist
		},
		{
			path: '/album/:id',
			name: 'Album',
			component: Album
		},
		{
			path: '/settings',
			name: 'Settings',
			component: Settings
		},
		{
			path: '/help',
			name: 'Help',
			component: Help
		},
		{
			path: '/playlists',
			name: 'Playlists',
			component: Playlists
		},
		{
			path: '/playlist/tracks',
			name: 'PlaylistTracks',
			component: PlaylistTracks,
			props: true
		},
		{
			path: '/login',
			name: 'Login',
			component: login
		},
		{
			path: '/search',
			name: 'Search',
			component: Search
		},
		{
			path: '/profile/:id',
			name: 'Profile',
			component: Profile
		},
		{
			path: '/friends',
			name: 'Friends',
			component: Friends
		}
	]
});
export default router;
