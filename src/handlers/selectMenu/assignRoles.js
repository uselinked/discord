const { collect } = require('collect.js')
const {ROLES} = require("../../constants");

const getRoleMessage = (assignedRoles) => {
    return assignedRoles.length >= 1
        ? `Assigned ${assignedRoles}`
        : `Removed all roles`
}

module.exports = {
    name: 'selectRoles',

    async execute(interaction) {
        const rolesToRemove = collect(ROLES)
            .filter(roleId => !interaction.values.includes(roleId))
            .map(roleId =>
                interaction.guild.roles.cache.find(
                    serverRole => serverRole.id === roleId
                )
            )
            .toArray()

        const rolesToAssign = collect(interaction.values).map(desiredRoleId =>
            interaction.guild.roles.cache.find(
                serverRole => serverRole.id === desiredRoleId
            )
        ).toArray()

        try {
            await interaction.member.roles.remove(rolesToRemove)
            await interaction.member.roles.add(rolesToAssign)
            await interaction.reply({
                content: getRoleMessage(rolesToAssign),
                ephemeral: true
            });
        } catch (error) {
            await interaction.reply({ content: `There was an error assigning roles ${error}`, ephemeral: true});
            return
        }
    },
};
