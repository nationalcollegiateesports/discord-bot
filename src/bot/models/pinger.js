const mongoose = require("mongoose");

module.exports = mongoose.model("Pinger", {
  guildId: String,
  id: String,
  url: String,
});
