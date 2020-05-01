//Load Discord.JS and establish bot.
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const fetch = require('node-fetch');

//Load config file.
const { prefix, token } = require('./config.json');

//Load commands.
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

//Start bot things.
bot.once('ready', () => {
	console.log('ready!');
	bot.user.setPresence({game: {name: "Online!", type: 0}});
});



//Message goodness below.
bot.on('message', async message => {

	if (message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (message.content.includes('\<:nickCringe:510507274096082945>')) {
		message.react('510507274096082945');
	}

	if (!command) return;

	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);

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

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('I couldn\'t do that!');
	}
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

bot.login(token);
