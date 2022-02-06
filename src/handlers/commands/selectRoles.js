const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageSelectMenu} = require('discord.js');
const { ROLES } = require('../../constants')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Select your server roles'),

    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('selectRoles')
                    .setPlaceholder('Select your roles')
                    .setMinValues(1)
                    .addOptions([
                        {
                            label: 'Newsletter',
                            description: 'Be notified if there are any linked news',
                            value: ROLES.newsletter,
                        },
                        {
                            label: 'Beta Tester',
                            description: 'Select this if you want to beta-test new features',
                            value: ROLES.betaTester,
                        },
                        {
                            label: 'macOS',
                            description: 'Select this if you are a macOS user',
                            value: ROLES.macos,
                        },
                        {
                            label: 'windows',
                            description: 'Select this if you are a windows user',
                            value: ROLES.windows,
                        },
                        {
                            label: 'linux',
                            description: 'Select this if you are a linux user',
                            value: ROLES.linux,
                        },
                    ]),
            );

        await interaction.reply({content: 'Select the roles you want to add!', components: [row], ephemeral: true});
    },
};