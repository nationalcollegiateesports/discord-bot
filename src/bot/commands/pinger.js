const { Command } = require('discord-akairo');
const Pinger = require('../../common/config/pinger');

class PingerCommand extends Command {
    constructor() {
        super('pinger', {
           aliases: ['pinger'] 
        });
    }

    async exec(message) {
        const result = await this.client.config.get(Pinger, message.guild.id);

        if (typeof result === 'undefined') {
            return message.reply('No last pinger!')
        } else {
            const { id, url } = result;
            return message.reply(`Last pinger: ${message.guild.member(id)} @ ${url}`);
        }
    }
}

module.exports = PingerCommand;
