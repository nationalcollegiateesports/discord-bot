const { Command } = require("discord-akairo");
const Livestreamer = require("../models/livestreamer");

class addLivestreamCommand extends Command {
  constructor() {
    super("addLivestream", {
      aliases: ["addLivestream"],
      args: [
        {
          id: "roleName",
          type: "string",
          default: "none",
        }
      ],
    });
  }

  async exec(message, args) {
    const guildId = message.guild.id;
    const roleName = args.roleName;
    const document = {guildId, roleName}

    if ((await Livestreamer.findOneAndUpdate({ guildId }, document).exec()) === null) {
        await Livestreamer.create(document);
      }
      Livestreamer.find(function (err, Livestreamers) {
        if (err) return console.error(err);
        console.log(Livestreamers);
        })
  }
}

module.exports = addLivestreamCommand;
