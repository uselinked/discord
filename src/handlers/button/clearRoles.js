const { collect } = require('collect.js');
const { ROLES } = require('../../constants');

module.exports = {
	name: 'clearRoles',

	async execute(interaction) {
		const rolesToRemove = collect(ROLES)
			.map(roleId =>
				interaction.guild.roles.cache.find(
					serverRole => serverRole.id === roleId,
				),
			)
			.toArray();

		try {
			await interaction.member.roles.remove(rolesToRemove);
			await interaction.reply({ content: `Removed ${rolesToRemove}`, ephemeral: true });
		}
		catch (error) {
			await interaction.reply({ content: `There was an error assigning roles ${error}`, ephemeral: true });
			return;
		}
	},
};
