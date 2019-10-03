module.exports = {
	name: 'say',
	description: 'Don\'t put words in my mouth!',
	usage: '<lies_and_propaganda>',
	args: true,
	cooldown: 3,
	execute(message, args) {
		const sayMessage = args.join(' ');
		message.delete().catch(O_o=>{});
		message.channel.send(sayMessage);
	},
};
