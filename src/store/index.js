import Vue from 'vue';

import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	mutations,
	strict: process.env.NODE_ENV !== 'production',

	state: {
		loggedInUser: {
			name: '',
			email: '',
			id: '',
			following: []
		},
		isSessionActive: false,
		appColor: undefined,

		historic: [],
		homeAlbumsEpic: [],
		homeAlbumsRock: [],
		homeAlbumsDisney: [],

		userPlaylists: [],
		currentPlaylist: undefined,

		currentAlbum: undefined,
		currentAlbumTracks: undefined,

		currentArtist: undefined,
		currentArtistAlbums: undefined,

		searchArtists: [],
		searchAlbums: [],
		searchTracks: [],
		searchUsers: [],

		musicPlayerTracks: undefined,
		musicPlayerIndex: 0,

		currentUser: undefined
	},

	getters: {
		appColor: state => {
			return state.appColor;
		},
		historic: state => {
			return state.historic;
		},
		homeAlbumsEpic: state => {
			return state.homeAlbumsEpic;
		},
		homeAlbumsRock: state => {
			return state.homeAlbumsRock;
		},
		homeAlbumsDisney: state => {
			return state.homeAlbumsDisney;
		},

		isSessionActive: state => {
			return state.isSessionActive;
		},
		currentAlbum: state => {
			return state.currentAlbum;
		},
		currentAlbumTracks: state => {
			return state.currentAlbumTracks;
		},
		currentArtist: state => {
			return state.currentArtist;
		},
		currentArtistAlbums: state => {
			return state.currentArtistAlbums;
		},
		musicPlayerTracks: state => {
			return state.musicPlayerTracks;
		},
		musicPlayerCurrentTrack: state => {
			if (state.musicPlayerTracks === undefined) {
				return undefined;
			}
			return state.musicPlayerTracks[state.musicPlayerIndex];
		},
		musicPlayerTracksNumber: state => {
			if (state.musicPlayerTracks === undefined) {
				return 0;
			}
			return state.musicPlayerTracks.length;
		},

		searchAlbums: state => {
			return state.searchAlbums;
		},
		searchArtists: state => {
			return state.searchArtists;
		},
		searchTracks: state => {
			return state.searchTracks;
		},
		searchUsers: state => {
			return state.searchUsers;
		},
		getAutocompleteResults: state => {
			let autocomplete = [];
			for (let album of state.searchAlbums) {
				autocomplete.push({
					value: album.name,
					icon: 'mdi-album',
					type: 'album',
					obj: album
				});
			}
			for (let artist of state.searchArtists) {
				autocomplete.push({
					value: artist.name,
					icon: 'mdi-microphone',
					type: 'artist',
					obj: artist
				});
			}
			for (let track of state.searchTracks) {
				autocomplete.push({
					value: track.name,
					icon: 'mdi-music',
					type: 'track',
					obj: track
				});
			}
			for (let user of state.searchUsers) {
				autocomplete.push({
					value: user.name,
					icon: 'mdi-account',
					type: 'user',
					obj: user
				});
			}
			return autocomplete;
		},

		loggedInUser: state => {
			return state.loggedInUser;
		},
		userPlaylists: state => {
			return state.userPlaylists;
		},
		currentUser: state => {
			return state.currentUser;
		},
		currentPlaylist: state => {
			return state.currentPlaylist;
		},

		getPlaylistById: state => {
			return id => {
				for (let playlist of state.userPlaylists) {
					if (playlist.id === id) {
						return playlist;
					}
				}
				return undefined;
			};
		},
		getUserById: state => {
			return id => {
				for (let user of state.currentUser) {
					if (user.id === id) {
						return user;
					}
				}
				return undefined;
			};
		}
	}
});
