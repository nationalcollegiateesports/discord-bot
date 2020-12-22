const { Listener } = require("discord-akairo");
const Twitter = require("twitter-lite");
require("dotenv").config();
//This is the recommended way of doing a listener
class OpenStreamListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    });
  }
  exec() {
    //Problems with this code - Has the issue of being coded before bot start so when a bot joins a new server it becomes and issue. If we make a command to open stream that would solve the issue
    //But for now testing it within the ready listener is good practice to mess with this and easy testing.
    console.log("test");
    this.client.channels.cache.get("763951657418883093").send("Bot On");
    const Twitterclient = new Twitter({
      consumer_key: process.env.CONSUMER_KEY, // from Twitter.
      consumer_secret: process.env.CONSUMER_SECRET, // from Twitter.
      access_token_key: process.env.ACCESS_TOKEN_KEY, // from your User (oauth_token)
      access_token_secret: process.env.ACCESS_TOKEN_SECRET, // from your User (oauth_token_secret)
    });
    const parameters = {
      follow: "3145201245", // Could be just in the stream paramiters but this is just for good practice if we wanted multiple filters.
    };
    const stream = Twitterclient.stream("statuses/filter", parameters);
    stream.on("start", (response) => console.log("start"));
    stream.on("data", (tweet) => {
      //Channel is a testing channel ID in personal server This should be changed to a variable that can be edited so a user can point it to a specific channel
      this.client.channels.cache.get("763951657418883093").send("testing");
      console.log(tweet);
    });
  }
}

module.exports = OpenStreamListener;
