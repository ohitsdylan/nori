module.exports = {
	name: 'ping',
	description: 'I\'m awake!',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Pong!');
	},
};
