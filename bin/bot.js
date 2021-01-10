const { AkairoClient, CommandHandler } = require('discord-akairo');
const path = require('path');
const ConfigHandler = require('../src/common/config/handler');

require('dotenv').config();

class NCEBot extends AkairoClient {
    constructor() {
        super({
            // Options for Akairo go here.
        }, {
            // Options for discord.js goes here.
        });

        this.commandHandler = new CommandHandler(this, {
            directory: path.join(__dirname, '../src/bot/commands/'),
            prefix: 'nce',
            // Options for the command handler goes here.
        });
        this.commandHandler.loadAll();
        this.config = new ConfigHandler(process.env.DB);
    }
}

const client = new NCEBot();
client.login(process.env.BOT_TOKEN);
