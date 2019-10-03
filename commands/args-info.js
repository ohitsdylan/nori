module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided.',
	usage: '<list> <of> <arguments> <here>',
    args: true,
    execute(message, args) {
        if (args[0] === 'sports') {
	    return message.channel.send('ball');
        }
        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};
