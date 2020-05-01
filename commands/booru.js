module.exports = {
	name: 'booru',
	description: 'Finds an image from Danbooru with the given tags.',
	usage: '<tag_to_search_for>+<maybe_another_tag>',
	cooldown: 5,
	args: true,
	async execute(message, args) {
		const fetch = require('node-fetch');
		const tags = args[0];

		const { body } = await fetch('https://danbooru.donmai.us/posts.json?random=true&limit=1&tags=${tags}').then(response => response.json());

		if (body[0].rating !== 's') {
			return message.channel.send('L-lewd!');
		} else

		message.channel.send('Character Tag: ' + body[0].tag_string_character + '\n' +
		'Artist: ' + body[0].tag_string_artist + '\n' +
		'Series/Franchise Copyright: ' + body[0].tag_string_copyright + '\n' +
		body[0].file_url);

		catch(error) {
			message.channel.send('I couldn\'t find that!');
		}
	},
};
