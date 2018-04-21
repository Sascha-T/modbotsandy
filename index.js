const Commando = require('discord.js-commando');
const r = require('rethinkdb');
const cfg = require('./config.json');
let conn;
const client = new Commando.Client({
    owner: cfg.discord.owner,
    commandPrefix: cfg.discord.prefix
});
const path = require('path');
const colors = require('colors'); {
    let oldLog = console.log;
    console.log = function(text) {
        let dateFormat = require('dateformat');
        let now = new Date();
        oldLog('['.gray + dateFormat(now, 'HH:MM:ss').cyan + '] ['.gray + 'INFO'.green + ']: '.gray + text);
    }
}
async function main() {
    console.log("Registering GROUPS and COMMANDS");
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

    console.log("Logging in");
    try {
        conn = await r.connect({ 'host': cfg.db.host, 'port': cfg.db.port, 'password': cfg.db.password, 'db': cfg.db.database });
        module.exports = { conn: conn }
        console.log('Logged in to RethinkDB!');
    } catch (ex) {
        console.log('Failed to login to RethinkDB, aborting!');
        process.exit(1);
    }
    client.on('ready', () => {
        console.log('Logged in!');
        client.user.setActivity('around.');
    });
    client.login(cfg.discord.token);
}
console.log("Running [MAIN] function");
main()