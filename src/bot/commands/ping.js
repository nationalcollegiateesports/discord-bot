const { Command } = require('discord-akairo');
const Pinger = require('../../common/config/pinger');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'] 
        });
    }

    async exec(message) {
        const { url } = message;
        const { id } = message.member;
        await this.client.config.set(Pinger, { id, url, guildId: message.guild.id });
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;
