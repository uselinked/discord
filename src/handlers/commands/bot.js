const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ms = require('pretty-ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot')
		.setDescription('Replies info & stats about the bot 🤖'),

	async execute(interaction, client) {
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('Latency')
					.setDescription('The repository can be found at [lostdesign/linked-discord-bot](https://github.com/lostdesign/linked-discord-bot), feel free to suggest new features or make a PR')
					.setColor('#FF005C')
					.addFields([
						{
							name: 'Bot',
							value: ms(interaction.createdTimestamp - Date.now()),
							inline: true,
						},
						{ name: 'API', value: ms(client.ws.ping), inline: true },
						{ name: 'Uptime', value: ms(client.uptime), inline: true },
					]),
			],
		});
	},
};