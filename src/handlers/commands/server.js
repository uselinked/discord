const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('members')
		.setDescription('Current member count'),

	async execute(interaction) {
		await interaction.reply(`${interaction.guild.memberCount} members`);
	},
};