const { Listener } = require("discord-akairo");
const Twitter = require("twitter-lite");
const MasterFollow = require("../models/masterFollow");
const Discord = require('discord.js');
const Twitterstreamer = require("../models/twitterstreamer");
require("dotenv").config();
//This is the recommended way of doing a listener
class OpenStreamListener extends Listener {
  constructor() {
    super("OpenStreamListener", {
      emitter: "client",
      event: "ready",
    });
  }
  async exec() {
    //Problems with this code - Has the issue of being coded before bot start so when a bot joins a new server it becomes and issue. If we make a command to open stream that would solve the issue
    //But for now testing it within the ready listener is good practice to mess with this and easy testing.
    //Spam starting and stopping the bot is a no go Twitter api gets mad.


    const masterFollow = await MasterFollow.find({ master: "masterList" }).exec();

    async function testing(tweetx, clientx){
      if(tweetx.user.id !== undefined){
        const test = await Twitterstreamer.find({ twitterId: tweetx.user.id }).exec();
        if(tweetx.user.id == test[0].twitterId){
          var url = "https://twitter.com/" + tweetx.user.screen_name + "/status/" + tweetx.id_str
          const tweetEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`New ${tweetx.user.name} tweet!`)
            .setURL(url)
            .setAuthor('NCE')
            .setThumbnail(tweetx.user.profile_image_url)
            .addFields(
                { name: 'Tweet Contents', value: tweetx.text },
                { name: 'Tweet link', value: url },
            )
            .setTimestamp()
            .setFooter('Bot made by REN');

          clientx.channels.cache.get(test[0].channelId).send(tweetEmbed)
          console.log(tweetx.user.id)
          console.log(test[0])
        }
      }

    }


    //const twitterstreamer = await Twitterstreamer.find({ master: masterList.id }).exec();

    console.log("test");
    this.client.channels.cache.get("763951657418883093").send("Bot On");
    const Twitterclient = new Twitter({
      consumer_key: process.env.CONSUMER_KEY, // from Twitter.
      consumer_secret: process.env.CONSUMER_SECRET, // from Twitter.
      access_token_key: process.env.ACCESS_TOKEN_KEY, // from your User (oauth_token)
      access_token_secret: process.env.ACCESS_TOKEN_SECRET, // from your User (oauth_token_secret)
    });

    const followParam = masterFollow[0].followList
    console.log(followParam)

    const parameters = {
      follow: followParam, // Could be just in the stream paramiters but this is just for good practice if we wanted multiple filters.
    };
    const stream = Twitterclient.stream("statuses/filter", parameters);
     stream.on("data", (tweet) => {
      testing(tweet,this.client)
    });
  }
}

module.exports = OpenStreamListener;
