module.exports = {
	name: 'set-reminder',
	description: 'I\'ll remind you about something later!',
	cooldown: 10,
	async execute(message, args) {
		const filter = m => message.author.id === m.author.id;
		message.channel.send('What do you want me to remind you about?').then(() => {
			message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
				.then(collected => {
					const reminderSubject = collected;
					message.channel.send(`Got it. When do you want me to remind you about ${reminderSubject}?`);
				})
				.catch(collected => {
					message.channel.send('Don\'t worry, take your time.');
				});
		});

	},
};
