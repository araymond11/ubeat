import axios from 'axios';

import md5 from 'js-md5';

const GRAVATAR_BASE_API = 'https://www.gravatar.com/';

export function getGravatarImage(email, size) {
	md5(email);
	let hash = md5.create();
	hash.update(email);
	return axios
		.get(GRAVATAR_BASE_API + 'avatar/' + hash.hex() + '?s=' + size, {})
		.then(value => {
			return value.config.url;
		})
		.catch(() => {
			return undefined;
		});
}
