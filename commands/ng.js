module.exports = {
	name: 'ng',
	description: 'NO GOOD',
	execute(message, args) {
		message.delete(message.author);
		message.channel.send(':no_good: :ng:');
	},
};
