const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
     data: new SlashCommandBuilder()
          .setName("ping")
          .setDescription("Replies with Pong 🏓"),

     async execute(interaction) {
          let uptime = Math.floor(Client.uptime / 1000 / 60 / 60);
          let sufix = "h";
          if (uptime === 0) {
               uptime = Math.floor(Client.uptime / 1000 / 60);
               sufix = "min";
          }
          if (uptime === 0) {
               uptime = Math.floor(Client.uptime / 1000);
               sufix = "sec";
          }
          const embed = new MessageEmbed()
               .setTitle("Ping command")
               .setTimestamp()
               .addField("API latency", `${Math.round(Client.ws.ping)}ms`)
               .addField(
                    "Bot latency",
                    `${Math.round(Date.now() - interaction.createdTimestamp)}ms`
               )
               .addField("Uptime", `${uptime}${sufix}`)
               .setFooter("/ping")
               .setColor("RANDOM");
          await interaction.reply({
               embeds: [embed],
               ephemeral: true,
          });
     },
};
