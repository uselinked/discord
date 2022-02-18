const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getAllDownloads } = require('../../lib/github');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('downloads')
		.setDescription('Total download count 💻'),

	async execute(interaction) {
		const {
			mac,
			windows,
			appImage,
			deb,
			snap,
			rpm,
			total,
			updates,
			raw,
		} = await getAllDownloads();

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('Download Stats')
					.setColor('#FF005C')
					.addFields([
						{ name: 'Installations', value: `${total}`, inline: true },
						{ name: 'Update Requests', value: `${updates}`, inline: true },
						{ name: 'Total Downloads', value: `${raw}`, inline: true },
						{ name: '\u200B', value: '\u200B' },
						{ name: 'macOS', value: `${mac}`, inline: true },
						{ name: 'Windows', value: `${windows}`, inline: true },
						{ name: 'AppImage', value: `${appImage}`, inline: true },
						{ name: 'deb', value: `${deb}`, inline: true },
						{ name: 'snap', value: `${snap}`, inline: true },
						{ name: 'rpm', value: `${rpm}`, inline: true },
					]),
			],
		});
	},
};