import UbeatFriend from './UbeatFriend';

export default class UbeatUser {
	constructor(user) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
		this.friends = [];
		user['following'].forEach(friend => {
			this.friends.push(new UbeatFriend(friend));
		});
	}
}
