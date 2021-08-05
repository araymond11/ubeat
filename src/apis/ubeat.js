import router from '@/router';

import axios from 'axios';

import Vue from 'vue';

import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

const UBEAT_BASE_API = 'https://ubeat.herokuapp.com/';
const qs = require('querystring');
/* === ALBUMS === */
export function GET_albumById(id) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'albums/' + id, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				},
				crossdomain: true
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else backToLogin();
}

export function GET_albumTracksById(id) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'albums/' + id + '/tracks', {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				},
				crossdomain: true
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

/* === ARTISTS === */
export function GET_artistById(id) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'artists/' + id, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

export function GET_artistAlbumsById(id) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'artists/' + id + '/albums', {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

export function GET_search(keyword, limit) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'search?q=' + keyword + '&limit=' + limit, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

export function GET_searchArtists(keyword, limit) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'search/artists?q=' + keyword + '&limit=' + limit, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}
export function GET_searchAlbums(keyword, limit) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'search/albums?q=' + keyword + '&limit=' + limit, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}
export function GET_searchTracks(keyword, limit) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'search/tracks?q=' + keyword + '&limit=' + limit, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}
export function GET_searchUsers(keyword) {
	if (Vue.$cookies.get('UBEAT_user')) {
		if (keyword !== '') {
			return axios
				.get(UBEAT_BASE_API + 'search/users?q=' + keyword, {
					headers: {
						Authorization: Vue.$cookies.get('UBEAT_user').token
					}
				})
				.then(response => {
					return response.data;
				})
				.catch(error => {
					if (error.response.status === 401) {
						backToLogin();
					}
					return undefined;
				});
		} else {
			backToLogin();
		}
	}
}

/* === PLAYLISTS === */
export function GET_playlistByUserId(id) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'users/' + id + '/playlists', {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

export function POST_addNewTrack(id, track) {
	if (Vue.$cookies.get('UBEAT_user')) {
		let headers = {
			'Content-Type': 'application/json',
			Authorization: Vue.$cookies.get('UBEAT_user').token
		};
		return axios
			.post(UBEAT_BASE_API + 'playlists/' + id + '/tracks', track, {
				headers: headers
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

export function PUT_changePlaylistName(data) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.put(
				UBEAT_BASE_API + 'playlists/' + data.id,
				{ name: data.name, owner: Vue.$cookies.get('UBEAT_user').email },
				{
					headers: {
						Authorization: Vue.$cookies.get('UBEAT_user').token
					}
				}
			)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}
export function DEL_deleteTrack(playlist, track) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.delete(
				UBEAT_BASE_API + 'playlists/' + playlist.id + '/tracks/' + track.id,
				{
					headers: {
						Authorization: Vue.$cookies.get('UBEAT_user').token
					}
				}
			)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

export function DEL_deletePlaylist(playlistId) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.delete(UBEAT_BASE_API + 'playlists/' + playlistId, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

export function POST_createPlaylist(playlistName) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.post(
				UBEAT_BASE_API + 'playlists/',
				{
					name: playlistName,
					owner: Vue.$cookies.get('UBEAT_user').email
				},
				{
					headers: {
						Authorization: Vue.$cookies.get('UBEAT_user').token
					}
				}
			)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}

/* === USER === */
export function GET_userById(id) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'users/' + id, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}
export function POST_followFriendById(id) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.post(
				UBEAT_BASE_API + 'follow/',
				{
					id: id,
					'Content-Type': 'application/json'
				},
				{
					headers: {
						Authorization: Vue.$cookies.get('UBEAT_user').token
					}
				}
			)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}
export function DEL_unfollowFriendById(id) {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.delete(UBEAT_BASE_API + 'follow/' + id, {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}
/* === Login/SignUp === */
export function POST_login(credentials) {
	return axios
		.post(UBEAT_BASE_API + 'login', qs.stringify(credentials), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
}
export function GET_tokenInfo() {
	if (Vue.$cookies.get('UBEAT_user')) {
		return axios
			.get(UBEAT_BASE_API + 'tokeninfo', {
				headers: {
					Authorization: Vue.$cookies.get('UBEAT_user').token
				}
			})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				if (error.response.status === 401) {
					backToLogin();
				}
				return undefined;
			});
	} else {
		backToLogin();
	}
}
export function POST_signup(credentials) {
	return axios
		.post(UBEAT_BASE_API + 'signup', qs.stringify(credentials), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
}
function backToLogin() {
	Vue.$cookies.remove('UBEAT_user');
	if (router.currentRoute.name !== 'Login') {
		router.push({ name: 'Login' });
	}
}
