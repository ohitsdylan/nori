module.exports = {
	name: 'booru',
	description: 'Finds an image from Danbooru with the given tags.',
	usage: '<tag_to_search_for>+<maybe_another_tag>',
	cooldown: 5,
	args: true,
	async execute(message, args) {
		const snekfetch = require('snekfetch');
		const tags = args[0];

		try {
			const { body } = await snekfetch.get(`https://danbooru.donmai.us/posts.json?random=true&limit=1&tags=${tags}`);

			if(body[0].rating !== 's') {
				return message.channel.send('L-lewd!');
			} else

			message.channel.send(body[0].file_url);
		}
		catch(error) {
			message.channel.send('I couldn\'t find that!');
		}
	},
};
