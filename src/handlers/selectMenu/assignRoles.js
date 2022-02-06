module.exports = {
    name: 'selectRoles',

    async execute(interaction) {
        const rolesToAssign = interaction.values.map(desiredRoleId =>
            interaction.guild.roles.cache.find(
                serverRole => serverRole.id === desiredRoleId
            )
        )

        try {
            await interaction.member.roles.add(rolesToAssign)
            await interaction.reply({ content: `Assigned ${rolesToAssign}`, ephemeral: true });
        } catch (error) {
            await interaction.reply({ content: `There was an error assigning roles ${error}`, ephemeral: true});
            return
        }
    },
};