module.exports = {
	name: 'anyone',
	description: 'When you don\'t want to bother everyone',
	usage: '(that\'s it)',
	cooldown: 3,
	execute(message, args) {

		const bot = message.client;
		const guild = bot.guilds.get('312033482165714944'); //obtain the server object
		const memberList = guild.members; //is the collections of users
		const memberCount = guild.memberCount; //is how many members are in the server

		const memberIdSelect = Math.floor((Math.random() * memberCount)); //obtain a random user index
		var memberArray = new Array();

		for (var [key, value] of memberList) {
			memberArray.push(value);
		}

		const selectedMember = memberArray[memberIdSelect];

		console.log(selectedMember);
		message.channel.send(selectedMember.find('username'));
	},
};
