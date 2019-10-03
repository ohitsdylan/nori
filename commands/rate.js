module.exports = {
	name: 'rate',
	description: 'Rates something from 1 to 10.',
	usage: '<object>',
	args: true,
	execute(message, args) {
		const objectRated = args.join(' ');
		const rateValue = Math.floor((Math.random() * 11));
		message.channel.send('I rate ' + objectRated + ' a ' + rateValue + '/10!');
	},
};
