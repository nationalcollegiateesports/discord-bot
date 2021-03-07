const mongoose = require("mongoose");

module.exports = mongoose.model("MasterFollow", {
  followList: String,
  master: String
});