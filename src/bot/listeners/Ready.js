const { Listener } = require("discord-akairo");
//This is the recommended way of doing a listener
//Listeners Pass all paramiters by default of the event triggered
class ReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    });
  }

  exec() {
    console.log("I'm ready!");
  }
}

module.exports = ReadyListener;
