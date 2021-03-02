const { Command } = require('discord-akairo');
const Pinger = require('./model');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'] 
        });
    }

    async exec(message) {
        const { url } = message;
        const { id } = message.member;
        const guildId = message.guild.id;
        const document = { id, url, guildId };

        if (await Pinger.findOneAndUpdate({ guildId }, document).exec() === null) {
            await Pinger.create(document);
        }

        return message.reply('Pong!');
    }
}

module.exports = PingCommand;
