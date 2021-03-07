const { Command } = require("discord-akairo");
//const Pinger = require("../models/pinger");

class ArgsCommand extends Command {
  constructor() {
    super("Args", {
      aliases: ["Args"],
      args: [
          {
          id:'string',
          default: 'none'
          }
      ]
    });
  }

  async exec(message, args) {
    return message.reply("Pong! " + args.string);
  }
}

module.exports = ArgsCommand;