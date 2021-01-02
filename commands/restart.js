module.exports = {
	name: 'restart',
	description: 'R-restarts me...! I\'ll come back, right?',
	cooldown: 10,
	execute(message, args) {
		if (message.member.id !== '312049352249966593') {
			return message.channel.send('You\'re not my supervisor!');
		}
		else {
			message.channel.send('Restarting...!');
			process.exit(0);
		}
	},
};
