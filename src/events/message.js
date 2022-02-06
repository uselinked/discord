module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        console.log(`${message}`);
    },
};