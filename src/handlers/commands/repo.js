const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

const embed = new MessageEmbed()
    .setTitle('linked')
    .setDescription('Forget less by daily journaling - when note taking meets a calender!')
    // adds the logo to the embed
    // .setThumbnail('https://cdn.discordapp.com/emojis/884752568952193025.webp')
    .addFields(
        { name: 'Website', value: '[uselinked.com](https://uselinked.com)', inline: true },
        { name: 'Twitter', value: '[@uselinked](https://twitter.com/uselinked)', inline: true },
        { name: 'Respository', value: '[lostdesign/linked](https://github.com/lostdesign/linked)', inline: true },
    );

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Returns generic information about the project.'),

    async execute(interaction) {
        await interaction.reply({embeds: [embed]});
    },
};