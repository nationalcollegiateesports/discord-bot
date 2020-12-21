const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const path = require('path');

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
        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, '../src/bot/listeners/' )
        })
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
    }
}

const client = new NCEBot();
client.login(process.env.BOT_TOKEN);
