export function scrollToTop() {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}

export function msToMinsAndSecs(ms, isFullDisplay) {
	const mins = Math.floor(ms / 60000);
	const secs = ((ms % 60000) / 1000).toFixed(0);
	if (isFullDisplay) {
		return mins + 'min ' + (secs < 10 ? '0' : '') + secs + 's';
	} else {
		return mins + ':' + (secs < 10 ? '0' : '') + secs;
	}
}

export function albumTotalTime(tracks, isFullDisplay) {
	let sum = 0.0;
	tracks.forEach(element => {
		sum += element.timeMillis;
	});
	return msToMinsAndSecs(sum, isFullDisplay);
}
