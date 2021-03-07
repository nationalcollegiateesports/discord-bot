const { Command } = require("discord-akairo");
const MasterFollow = require("../models/masterFollow");
const Twitterstreamer = require("../models/twitterstreamer");

class addTwitterCommand extends Command {
  constructor() {
    super("addTwitter", {
      aliases: ["addTwitter"],
      args: [
        {
          id: "accountId",
          type: "string",
        },
        {
          id: "channelId",
          type: "string",
        },
      ],
    });
  }

  async exec(message, args) {
    const twitterId = args.accountId;
    const channelId = args.channelId;
    const guildId = message.guild.id;
    const master = "masterList";
    var followList = "";


    const masterFollow = await MasterFollow.find({ master: "masterList" }).exec();

    if(masterFollow.length !==0){
        followList = masterFollow[0].followList
        followList = followList + ", " + twitterId
    }
    else{
        followList = twitterId
    }

    const masterDoc = {followList, master};
    const twitterstreamerDoc = {guildId, twitterId, channelId };


    if ((await MasterFollow.findOneAndUpdate({ master }, masterDoc).exec()) === null) {
        await MasterFollow.create(masterDoc);
      }
    
    if ((await Twitterstreamer.findOneAndUpdate({ guildId }, twitterstreamerDoc).exec()) === null) {
      await Twitterstreamer.create(twitterstreamerDoc);
    }
  }
}


module.exports = addTwitterCommand;
