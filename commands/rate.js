module.exports = {
	name: 'rate',
	description: 'Rates something from 1 to 10.',
	usage: '<object>',
	args: true,
	execute(message, args) {
		const objectRated = args.join(' ');
        var rateValue = Math.floor((Math.random() * 11));
        if(args.includes('ben\'s hoeness') || args.includes('Ben\'s hoeness')) {
            newRateValute = rateValue + 8;
            message.channel.send('I rate ' + objectRated + ' a ' + newRateValute + '/10!');
        } else {
            message.channel.send('I rate ' + objectRated + ' a ' + rateValue + '/10!');
        }
	},
};
