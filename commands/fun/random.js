const { Command } = require('discord.js-commando');
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            group: 'fun',
            memberName: 'random',
            description: 'Replies with a pseudo-random number from 0-10.',
            examples: ['random']
        });
    }

    run(msg) {
        return msg.say(getRandomInt(10) + 1);
    }
};