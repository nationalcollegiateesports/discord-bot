const { AkairoClient, CommandHandler } = require("discord-akairo");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

class NCEBot extends AkairoClient {
  constructor() {
    super(
      {
        // Options for Akairo go here.
      },
      {
        // Options for discord.js goes here.
      }
    );
    
    this.commandHandler = new CommandHandler(this, {
      directory: path.join(__dirname, "../src/bot/commands/"),
      prefix: "nce",
      // Options for the command handler goes here.
    });
    this.listenerHandler = new ListenerHandler(this, {
      directory: path.join(__dirname, '../src/bot/listeners/' )
    })
    this.commandHandler.loadAll();
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
    this.db = mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
}




const client = new NCEBot();





client.login(process.env.BOT_TOKEN);
