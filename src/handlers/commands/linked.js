const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { sumDownloads, getRepoStats, getLatestReleaseStats } = require('../../lib/github');
const { DateTime } = require('luxon');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('linked')
		.setDescription('Returns information & stats about the project 🧠'),

	async execute(interaction) {
		const { stargazers_count, open_issues_count, updated_at } = await getRepoStats();
		const { assets, name, url } = await getLatestReleaseStats();

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('linked')
					.setDescription('Forget less by daily journaling - when note taking meets a calender!')
					.setColor('#FF005C')
					.addFields([
						{ name: 'Website', value: '[uselinked.com](https://uselinked.com)', inline: true },
						{ name: 'Twitter', value: '[@uselinked](https://twitter.com/uselinked)', inline: true },
						{
							name: 'Repository',
							value: '[lostdesign/linked](https://github.com/lostdesign/linked)',
							inline: true,
						},
						{ name: 'Stars', value: `⭐️ ${stargazers_count}`, inline: true },
						{ name: 'Issues & PRs', value: `📝 ${open_issues_count}`, inline: true },
						{
							name: 'Last Update',
							value: `⏱ ${DateTime.fromISO(updated_at).toRelative({ locale: 'en-US' })}`,
							inline: true,
						},
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Latest Release', value: `[v${name}](${url})`, inline: true },
						{ name: 'Current release downloads', value: `⬇️ ${sumDownloads(assets)}`, inline: true },
					]),
			],
		});
	},
};