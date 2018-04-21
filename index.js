const Commando = require('discord.js-commando');
const r = require('rethinkdb');
let conn;
const client = new Commando.Client({
    owner: '133885827523674112',
    commandPrefix: 'sandy!'
});
const path = require('path');
const colors = require('colors');

async function main() {
    {
        let oldLog = console.log;
        console.log = function(text) {
            let dateFormat = require('dateformat');
            let now = new Date();
            oldLog('['.gray + dateFormat(now,'HH:MM:ss').cyan + '] ['.gray + 'INFO'.green + ']: '.gray + text);
        }
    }
    client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['fun', 'Fun Commands'],
        ['mod', 'Moderation Commands'],
        ['staff', 'Staff Only Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));


    try {
        conn = await r.connect({'host': 'localhost', 'port': 28015, 'password': 'SaschaT1602', 'db': 'sandybot'});
        module.exports = {conn: conn}
        console.log('Logged in to RethinkDB!');
    }   catch(ex) {
        console.log('Failed to login to RethinkDB, aborting!');
        process.exit(1);
    }
    client.on('ready', () => {
        console.log('Logged in!');
        client.user.setActivity('around.');
    });
    client.login('MzQ1MjA2NzYxNTM3NjY3MDcz.DagKHg.1iPvrrRW1Jy2a4wLDLRAGEk3Yg0');
}
main()