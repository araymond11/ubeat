export default class UbeatArtist {
	constructor(ubeatArtist) {
		this.id = ubeatArtist.artistId;
		this.name = ubeatArtist.artistName;
		this.url = ubeatArtist.artistLinkUrl;
		this.genre = ubeatArtist.primaryGenreName;
		this.genreId = ubeatArtist.primaryGenreId;
	}
}
