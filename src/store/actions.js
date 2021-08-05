import * as ubeat from '@/apis/ubeat.js';

export default {
	/* === SETTINGS === */
	changeAppColor({ commit }, newColor) {
		commit('changeAppColor', newColor);
	},
	/* === HOME === */
	async setHomeAlbums({ commit }) {
		let searchAlbums = await ubeat.GET_searchAlbums('Epic%20music', 30);
		if (searchAlbums !== undefined) {
			commit('setHomeAlbums', { type: 'epic', albums: searchAlbums.results });
		}
		searchAlbums = await ubeat.GET_searchAlbums('Rock', 30);
		if (searchAlbums !== undefined) {
			commit('setHomeAlbums', { type: 'rock', albums: searchAlbums.results });
		}
		searchAlbums = await ubeat.GET_searchAlbums('Disney', 30);
		if (searchAlbums !== undefined) {
			commit('setHomeAlbums', { type: 'disney', albums: searchAlbums.results });
		}
	},
	/* === ALBUM === */
	async changeCurrentAlbum({ commit }, id) {
		commit('changeCurrentAlbum', undefined);
		const album = await ubeat.GET_albumById(id);
		if (album !== undefined) {
			commit('changeCurrentAlbum', album.results[0]);
		}
	},

	async changeCurrentAlbumTracks({ commit }, id) {
		commit('changeCurrentAlbumTracks', undefined);
		const tracks = await ubeat.GET_albumTracksById(id);
		if (tracks !== undefined) {
			commit('changeCurrentAlbumTracks', tracks.results);
		}
	},
	/* === ARTISTS === */
	async changeCurrentArtist({ commit }, id) {
		commit('changeCurrentArtist', undefined);
		const artist = await ubeat.GET_artistById(id);
		if (artist !== undefined) {
			commit('changeCurrentArtist', artist.results[0]);
		}
	},

	async changeCurrentArtistAlbum({ commit }, id) {
		commit('changeCurrentArtistAlbum', undefined);
		const albums = await ubeat.GET_artistAlbumsById(id);
		if (albums !== undefined) {
			commit('changeCurrentArtistAlbum', albums.results);
		}
	},

	/* === Playlist ===*/
	async addNewTrackToPlaylist({ commit }, data) {
		const result = await ubeat.POST_addNewTrack(
			data.playlist.id,
			data.track.apiTrack
		);
		if (result !== undefined) {
			commit('addNewTrackToPlaylist', {
				id: data.playlist.id,
				track: data.track
			});
			return true;
		}
		return false;
	},

	changeCurrentPlaylist({ commit }, playlist) {
		commit('changeCurrentPlaylist', playlist);
	},

	async updatePlaylists({ commit }, id) {
		const playlists = await ubeat.GET_playlistByUserId(id);
		commit('updatePlaylist', playlists);
	},

	async changePlaylistName({ commit }, data) {
		await ubeat.PUT_changePlaylistName(data);
		commit('changePlaylistName', data);
	},

	async deleteTrack({ commit }, data) {
		const playlist = await ubeat.DEL_deleteTrack(data.playlist, data.track);
		if (playlist !== undefined) {
			commit('deleteTrack', playlist);
			return false;
		}
		return true;
	},

	async deletePlaylist({ commit }, id) {
		const response = await ubeat.DEL_deletePlaylist(id);
		if (response !== undefined) {
			commit('deletePlaylist', id);
		}
	},

	async createPlaylist({ commit }, name) {
		const playlist = await ubeat.POST_createPlaylist(name);
		if (playlist === undefined) {
			return false;
		} else {
			commit('createPlaylist', playlist);
		}
	},

	/* === SEARCH === */
	async updateSearch({ commit }, search) {
		const options = search.options;
		if (search.keyword !== null) {
			search.keyword.replace(/ /g, '%20');
		}
		const searchTracks = !options.tracks
			? undefined
			: await ubeat.GET_searchTracks(search.keyword, options.limit);
		if (searchTracks !== undefined) {
			commit('updateSearchTracks', searchTracks.results);
		} else {
			commit('updateSearchTracks', []);
		}
		const searchArtists = !options.artists
			? undefined
			: await ubeat.GET_searchArtists(search.keyword, options.limit);
		if (searchArtists !== undefined) {
			commit('updateSearchArtists', searchArtists.results);
		} else {
			commit('updateSearchArtists', []);
		}
		const searchAlbums = !options.albums
			? undefined
			: await ubeat.GET_searchAlbums(search.keyword, options.limit);
		if (searchAlbums !== undefined) {
			commit('updateSearchAlbums', searchAlbums.results);
		} else {
			commit('updateSearchAlbums', []);
		}
		const searchUsers = !options.users
			? undefined
			: await ubeat.GET_searchUsers(search.keyword, options.limit);
		if (searchUsers !== undefined) {
			commit('updateSearchUsers', searchUsers);
		} else {
			commit('updateSearchUsers', []);
		}
	},

	cleanSearch({ commit }) {
		commit('cleanSearch');
	},

	/* === PLAYLISTS === */
	listenTrack({ commit }, data) {
		if (data.isPlaylist) commit('listenTrackFromPlaylist', data.track);
		else commit('listenTrack', data);
	},

	listenAlbumTracks({ commit }, albumTracks) {
		commit('listenAlbumTracks', albumTracks);
	},

	skipTrack({ commit }, direction) {
		commit('skipTrack', direction);
	},
	/* === USERS === */
	async changeCurrentUser({ commit }, id) {
		commit('changeCurrentUser', undefined);
		const currentUser = await ubeat.GET_userById(id);
		if (currentUser !== undefined) {
			commit('changeCurrentUser', currentUser);
		}
	},
	async unfollowUserById({ commit }, id) {
		const response = await ubeat.DEL_unfollowFriendById(id);
		if (response !== undefined) {
			commit('unfollowUserById', response);
		}
	},
	async followUserById({ commit }, id) {
		const response = await ubeat.POST_followFriendById(id);
		if (response !== undefined) {
			commit('followUserById', response);
		}
	},
	/* === LOGIN/SignUp === */
	async getTokenInfo({ commit }) {
		const response = await ubeat.GET_tokenInfo();
		commit('setUser', response);
	},

	async loginWithCredentials({ commit }, credentials) {
		const response = await ubeat.POST_login(credentials);
		commit('setCookie', response);
	},

	async signUpWithCredentials({ commit }, credentials) {
		await ubeat.POST_signup(credentials);
		commit('setIsSessionActive', false);
	},

	async setIsSessionActive({ commit }, bool) {
		commit('setIsSessionActive', bool);
	}
};
