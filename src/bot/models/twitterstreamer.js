const mongoose = require("mongoose");

module.exports = mongoose.model("Twitterstreamer", {
  guildId: String,
  twitterId: String,
  channelId: String,
});