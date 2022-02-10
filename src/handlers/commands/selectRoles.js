const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed} = require('discord.js');
const {ROLES} = require('../../constants')
const {collect} = require("collect.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Select your server roles'),

    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('selectRoles')
                    .setPlaceholder('No roles selected')
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

        const clearRolesButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('clearRoles')
                    .setLabel('Clear all roles')
                    .setStyle('DANGER'),
            );

        const roleInfoEmbed = new MessageEmbed()
            .setTitle('Manage your roles')
            .setColor('#FF005C')
            .addFields([
                { name: 'Adding roles', value: 'You can select as many roles as you want, once done click anywhere else.' },
                {
                    name: 'Removing roles',
                    value: 'If you want to remove single roles, either clear all roles or only select the ones you want, all not selected roles will be removed.',
                },
                { name: '\u200B', value: '\u200B' },
                {
                    name: 'Currently available roles',
                    value: collect(ROLES)
                        .values()
                        .map(role => interaction.guild.roles.cache.get(role))
                        .toArray()
                        .toString()
                }
            ])

        await interaction.reply({
            embeds: [roleInfoEmbed],
            components: [row, clearRolesButton]
        });
    },
};