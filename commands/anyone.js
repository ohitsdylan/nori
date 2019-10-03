module.exports = {
	name: 'anyone',
	description: 'When you don\'t want to bother everyone',
	usage: '(that\'s it)',
	cooldown: 3,
	execute(message, args) {
		const crewServer = bot.guilds.get('312033482165714944');
		message.channel.send(crewServer);
		//const memberIdSelect = Math.floor((Math.random() * guildList.length));
		//message.channel.send(crewServer[memberIdSelect]);
	},
};
