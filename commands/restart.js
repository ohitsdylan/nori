module.exports = {
	name: 'restart',
	description: 'R-restarts me...! I\'ll come back, right?',
	cooldown: 10,
	execute(message, args) {
		if (!message.member.roles.some(r=>["admin"].includes(r.name)) ) {
			return message.channel.send('You\'re not my supervisor!');
		}
		else {
			return message.channel.send('Restarting...!');
			process.exit(0);
		}
	},
};
