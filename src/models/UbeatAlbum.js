export default class UbeatAlbum {
	constructor(ubeatAlbum) {
		this.id = ubeatAlbum.collectionId;
		this.name = ubeatAlbum.collectionName;
		this.url = ubeatAlbum.collectionViewUrl;
		this.price = ubeatAlbum.collectionPrice + ' ' + ubeatAlbum.currency;
		this.genre = ubeatAlbum.primaryGenreName;
		this.releaseDate = ubeatAlbum.releaseDate.substring(0, 10);
		this.country = ubeatAlbum.country;
		this.trackCount = ubeatAlbum.trackCount;
		this.copyright = ubeatAlbum.copyright;
		this.artistId = ubeatAlbum.artistId;
		this.artistName = ubeatAlbum.artistName;
		this.artistUrl = ubeatAlbum.artistViewUrl;
		this.artwork = ubeatAlbum.artworkUrl100.replace(/100x100/g, 'SIZExSIZE');
	}

	getArtwork(size) {
		return this.artwork.replace(/SIZE/g, size);
	}
}
