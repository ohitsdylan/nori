//Load Discord.JS
const Discord = require('discord.js');

//Load config file.
const { prefix, token } = require('./config.json');

//Grant life to Nori
const bot = new Discord.Client();

//Load commands and node modules
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const fetch = require('node-fetch');
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const schedule = require('node-schedule');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

//Start bot things.
bot.once('ready', () => {
	console.log('ready!');
	bot.user.setPresence({game: {name: "Online!", type: 0}});
});

//Delete 500 messages everyday at midnight from the #tmp channel
let job = schedule.scheduleJob('0 0 * * *', function() {
	const channel = bot.channels.cache.get('733877790914641991');

	for (let i = 0; i < 5; i++) {
		channel.bulkDelete(100) //Maximum allowed deletion is 100 messages
			.then(messages => console.log(`Bulk deleted ${messages.size} messages`))
			.catch(console.error);
	}
});

//Message goodness below.
bot.on('message', async message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\n The manual for \`${prefix}${command.name}\` is: ${command.usage} `;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown) * 1000;

	if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('I couldn\'t do that!');
	}
});

process.on('unhandledRejection', error => {
	console.error('Uncaught Promise Rejection:', error);
});

bot.login(token);
