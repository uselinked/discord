const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getReleaseByTag, getAllTagNames, filterReleaseAssets } = require('../../lib/github');
const { DateTime } = require('luxon');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('release')
		.setDescription('Get information about a release ℹ️')
		.addStringOption(option =>
			option.setName('version')
				.setDescription('Try for example: 1.0.0')
				.setRequired(true),
		),

	async execute(interaction, client) {
		const { value: versionInput } = interaction.options.get('version');
		const release = await getReleaseByTag(versionInput);

		if (release === false || release.message === 'Not Found') {
			const tags = (await getAllTagNames())
				.map(tag => `\`${tag.slice(1)}\``)
				.toString().split(',').join(', ');

			await interaction.reply({
				ephemeral: true,
				embeds: [
					new MessageEmbed()
						.setTitle('Invalid version provided')
						.setColor('#FF005C')
						.setDescription('Please provide a semver version like **1.0.0**.\n\nHere is a list of valid tags:\n' + tags),
				],
			});
			return;
		}


		const fields = filterReleaseAssets(release.assets);

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(`Release v${versionInput}`)
					.setColor('#FF005C')
					.setDescription(release.body)
					.addFields(fields)
					.setFooter({
						text: `Released ${DateTime.fromISO(release.created_at).toRelative({ locale: 'en-US' })}`,
					}),
			],
		});
	},
};