const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const {token} = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
});

client.handlers = new Collection();
client.handlers.commands = new Collection();
const commandFiles = fs.readdirSync('./src/handlers/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./src/handlers/commands/${file}`);
    client.handlers.commands.set(command.data.name, command);
}

client.handlers.selectMenu = new Collection();
const selectMenuHandlers = fs.readdirSync('./src/handlers/selectMenu').filter(file => file.endsWith('.js'));

for (const file of selectMenuHandlers) {
    const selectMenuHandler = require(`./src/handlers/selectMenu/${file}`);
    client.handlers.selectMenu.set(selectMenuHandler.name, selectMenuHandler);
}

client.handlers.button = new Collection();
const buttonHandlers = fs.readdirSync('./src/handlers/button').filter(file => file.endsWith('.js'));

for (const file of buttonHandlers) {
    const buttonHandler = require(`./src/handlers/button/${file}`);
    client.handlers.button.set(buttonHandler.name, buttonHandler);
}

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(token);

// To make ping work
module.exports.Client = Client;