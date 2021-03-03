const { Command } = require("discord-akairo");
const Pinger = require("../models/pinger");

class PingerCommand extends Command {
  constructor() {
    super("pinger", {
      aliases: ["pinger"],
    });
  }

  async exec(message) {
    const { guild } = message;
    const pinger = await Pinger.find({ guildId: guild.id }).exec();

    if (pinger.length === 0) {
      return message.reply("No last pinger!");
    } else {
      const { id, url } = pinger[0];
      return message.reply(`Last pinger: ${guild.member(id)} @ ${url}`);
    }
  }
}

module.exports = PingerCommand;
