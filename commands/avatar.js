module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description: 'Gets the mentioned user\'s profile picture. If no user is specified, gets your own picture.',
	usage: '<optional_user_mention>',
	cooldown: 1,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`<${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`<${taggedUser.displayAvatarURL({ format: "png", dynamic: true })}>`);
	},
};
