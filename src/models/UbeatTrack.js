export default class UbeatTrack {
	constructor(ubeatTrack) {
		this.apiTrack = ubeatTrack;
		this.id = ubeatTrack.trackId;
		this.name = ubeatTrack.trackName;
		this.previewUrl = ubeatTrack.previewUrl;
		this.price = ubeatTrack.trackPrice + ' ' + ubeatTrack.currency;
		this.number = ubeatTrack.trackNumber;
		this.timeMillis = ubeatTrack.trackTimeMillis;
		this.albumId = ubeatTrack.collectionId;
		this.albumName = ubeatTrack.collectionName;
		this.artistId = ubeatTrack.artistId;
		this.artistName = ubeatTrack.artistName;
		if (ubeatTrack.artworkUrl100 !== undefined) {
			this.artwork = ubeatTrack.artworkUrl100.replace(/100x100/g, 'SIZExSIZE');
		}
	}

	getArtwork(size) {
		return this.artwork.replace(/SIZE/g, size);
	}
}
