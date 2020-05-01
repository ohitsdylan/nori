module.exports = {
	name: 'pick',
	description: 'Picks a thing from a list of things.',
	usage: '<thing> <thing> <thing> etc...',
	args: true,
	execute(message, args) {
		const pickLength = args.length;
		const pickIndex = Math.floor((Math.random() * pickLength));
		message.channel.send(args[pickIndex] + '!');
	},
};
