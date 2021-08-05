import UbeatTrack from './UbeatTrack';

export default class UbeatPlaylist {
	constructor(playlist) {
		this.id = playlist.id;
		this.name = playlist.name;
		this.tracks = [];
		playlist.tracks.forEach(track => {
			this.tracks.push(new UbeatTrack(track));
		});
	}
}
