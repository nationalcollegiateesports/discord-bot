const mongoose = require("mongoose");

module.exports = mongoose.model("Livestreamer", {
  guildId: String,
  roleName: String,
});