module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isButton()) return;

		const handler = interaction.client.handlers.button.get(interaction.customId);
		if (!handler) return;

		try {
			await handler.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
