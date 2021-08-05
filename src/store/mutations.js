import UbeatAlbum from '@/models/UbeatAlbum';
import UbeatTrack from '@/models/UbeatTrack';
import UbeatArtist from '@/models/UbeatArtist';
import UbeatUser from '@/models/UbeatUser';
import UbeatPlaylist from '@/models/UbeatPlaylist';

import Vue from 'vue';

export default {
	/* === SETTINGS === */
	changeAppColor(state, color) {
		state.appColor = color;
	},
	/* === HOME === */
	setHomeAlbums(state, data) {
		if (data.type === 'epic') {
			state.homeAlbumsEpic = [];
			data.albums.forEach(element => {
				state.homeAlbumsEpic.push(new UbeatAlbum(element));
			});
		} else if (data.type === 'disney') {
			state.homeAlbumsDisney = [];
			data.albums.forEach(element => {
				state.homeAlbumsDisney.push(new UbeatAlbum(element));
			});
		} else if (data.type === 'rock') {
			state.homeAlbumsRock = [];
			data.albums.forEach(element => {
				state.homeAlbumsRock.push(new UbeatAlbum(element));
			});
		}
	},
	/* === ALBUMS === */
	changeCurrentAlbum(state, album) {
		if (album === undefined) {
			state.currentAlbum = undefined;
		} else {
			state.currentAlbum = new UbeatAlbum(album);
			state.historic = state.historic.filter(
				elem => elem.id !== state.currentAlbum.id
			);
			state.historic.unshift(new UbeatAlbum(album));
		}
	},
	changeCurrentAlbumTracks(state, tracks) {
		if (tracks === undefined) {
			state.currentAlbumTracks = undefined;
		} else {
			state.currentAlbumTracks = [];
			tracks.forEach(track => {
				state.currentAlbumTracks.push(new UbeatTrack(track));
			});
		}
	},

	/* === ARTISTS === */
	changeCurrentArtist(state, artist) {
		if (artist === undefined) {
			state.currentArtist = undefined;
		} else {
			state.currentArtist = new UbeatArtist(artist);
		}
	},

	changeCurrentArtistAlbum(state, albums) {
		if (albums === undefined) {
			state.currentArtistAlbums = undefined;
		} else {
			state.currentArtistAlbums = [];
			albums.forEach(element => {
				state.currentArtistAlbums.push(new UbeatAlbum(element));
			});
		}
	},

	async updateSearchArtists(state, artists) {
		state.searchArtists = [];
		artists.forEach(artist => {
			state.searchArtists.push(new UbeatArtist(artist));
		});
	},

	async updateSearchTracks(state, tracks) {
		state.searchTracks = [];
		tracks.forEach(track => {
			state.searchTracks.push(new UbeatTrack(track));
		});
	},

	async updateSearchAlbums(state, albums) {
		state.searchAlbums = [];
		albums.forEach(album => {
			state.searchAlbums.push(new UbeatAlbum(album));
		});
	},
	async updateSearchUsers(state, users) {
		state.searchUsers = [];
		users.forEach(user => {
			state.searchUsers.push(new UbeatUser(user));
		});
	},

	cleanSearch(state) {
		state.searchAlbums = [];
		state.searchArtists = [];
		state.searchTracks = [];
		state.searchUsers = [];
	},

	/* === MUSIC PLAYER === */
	listenTrackFromPlaylist(state, track) {
		state.musicPlayerIndex = 0;
		state.musicPlayerTracks = [];
		state.currentPlaylist.tracks.forEach(element => {
			state.musicPlayerTracks.push(element);
		});
		for (
			;
			state.musicPlayerIndex < state.musicPlayerTracks.length;
			state.musicPlayerIndex += 1
		) {
			if (state.musicPlayerTracks[state.musicPlayerIndex].id === track.id)
				break;
		}
	},
	listenTrack(state, data) {
		state.musicPlayerIndex = 0;
		state.musicPlayerTracks = [];
		if (data.search) {
			state.musicPlayerTracks.push(data.track);
		} else if (state.currentAlbumTracks !== undefined) {
			state.currentAlbumTracks.forEach(element => {
				state.musicPlayerTracks.push(element);
			});
			for (
				;
				state.musicPlayerIndex < state.musicPlayerTracks.length;
				state.musicPlayerIndex += 1
			) {
				if (
					state.musicPlayerTracks[state.musicPlayerIndex].id === data.track.id
				)
					break;
			}
		} else {
			state.musicPlayerTracks.push(data.track);
		}
	},

	listenAlbumTracks(state, tracks) {
		state.musicPlayerIndex = 0;
		state.musicPlayerTracks = [];
		tracks.forEach(element => {
			state.musicPlayerTracks.push(element);
		});
	},
	skipTrack(state, direction) {
		if (
			direction === 'next' &&
			state.musicPlayerIndex < state.musicPlayerTracks.length - 1
		) {
			state.musicPlayerIndex += 1;
		} else if (direction === 'prev' && state.musicPlayerIndex > 0) {
			state.musicPlayerIndex -= 1;
		}
	},

	/* === PLAYLISTS === */
	changeCurrentPlaylist(state, playlist) {
		state.currentPlaylist = playlist;
	},
	async updatePlaylist(state, playlists) {
		state.userPlaylists = [];
		if (playlists !== undefined) {
			playlists.forEach(playlist => {
				state.userPlaylists.push(new UbeatPlaylist(playlist));
			});
		}
	},

	async changePlaylistName(state, data) {
		state.userPlaylists.forEach(playlist => {
			if (playlist.id === data.id) {
				playlist.name = data.name;
			}
		});
	},

	async addNewTrackToPlaylist(state, data) {
		let array = [];
		state.userPlaylists.forEach(playlist => {
			if (playlist.id === data.id) {
				playlist.tracks.push(data.track);
			}
			array.push(playlist);
		});
		state.userPlaylists = array;
	},

	async deleteTrack(state, playlist) {
		state.currentPlaylist = new UbeatPlaylist(playlist);
		let array = [];
		state.userPlaylists.forEach(uPlaylist => {
			if (uPlaylist.id === playlist.id) {
				array.push(new UbeatPlaylist(playlist));
			} else {
				array.push(uPlaylist);
			}
		});
		state.userPlaylists = array;
	},

	async deletePlaylist(state, playlistId) {
		let index = 0;
		state.userPlaylists.forEach(playlist => {
			if (playlist.id === playlistId) {
				state.userPlaylists.splice(index, 1);
			}
			index += 1;
		});
	},

	async createPlaylist(state, playlist) {
		state.userPlaylists.push(new UbeatPlaylist(playlist));
	},
	/* === USER === */
	changeCurrentUser(state, currentUser) {
		if (currentUser === undefined) {
			state.currentUser = undefined;
		} else {
			state.currentUser = new UbeatUser(currentUser);
		}
	},
	async followUserById(state, response) {
		state.loggedInUser = {};
		state.loggedInUser = response;
	},
	async unfollowUserById(state, response) {
		state.loggedInUser = {};
		state.loggedInUser = response;
	},

	async setIsSessionActive(state, bool) {
		state.isSessionActive = bool;
	},
	setCookie(state, cookie) {
		const UBEAT_user = {
			following: cookie.data.following,
			name: cookie.data.name,
			email: cookie.data.email,
			token: cookie.data.token
		};
		//remove old token on sign in
		if (Vue.$cookies.get('UBEAT_user')) {
			Vue.$cookies.remove('UBEAT_user');
		}
		//21600 = 6 heure
		Vue.$cookies.set(
			'UBEAT_user',
			JSON.stringify(UBEAT_user),
			21600,
			'localhost'
		);
	},
	setUser(state, token) {
		token = JSON.parse(JSON.stringify(token));
		state.loggedInUser.id = token.id;
		state.loggedInUser.name = token.name;
		state.loggedInUser.email = token.email;
		state.loggedInUser.following = token.following;
		state.isSessionActive = true;
	}
};
