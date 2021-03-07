const { Listener } = require("discord-akairo");
const Livestreamer = require("../models/livestreamer");

//So something interesting about the presenceUpdate event. This is popped and emits a guildMember object so it emits and event multiple times if a user is in the same guild as the bot
//For example I was testing this function and was getting undefined errors for the role but the role assignment was working
//Turns out the test bot was in another server of mine that did not have the role so was causing issues in the code
//Something good to note for using this event further there might be a better way of doing this but as of right now it aint horrible.
//Github issue explaining this https://github.com/discordjs/discord.js/issues/3459
//Outside of that the code works as intended with no major issues/changes but if you review and notice something weird let me know!
class LiveStreamRoleListener extends Listener {
  constructor() {
    super("LiveStreamRoleListener", {
      emitter: "client",
      event: "presenceUpdate",
    });
  }
 ///GOT IT TO WORK IN MULTIPLE SERVERS WITH DIFFERENT CONFIGS LETS GOOO. mongo db kinda nice
  async exec(oldPresence, newPresence) {
    try {
      //console.log(streamRole);
      //The reason we use undefined here is because when a presence changes it does not require an activity (IE. going from away to online with not playing anything)
      //This will throw an error saying that 'newPresence.activities[0]' is undefined causing our logs to get spammed with errors. Their might be a better way of handling this but thats what I got for now.
      const livestreamer = await Livestreamer.find({ guildId: newPresence.guild.id }).exec()
      console.log(newPresence.guild.id + "line 24") 
      console.log(livestreamer.length + "line 25")
      if(livestreamer.length === undefined) {
        console.log("no live stream set");
      } else {
        const {guildId, roleName} = livestreamer[0]
        console.log("line 30")
        if (newPresence.activities.length !== 0) {
          const streamRole = newPresence.guild.roles.cache.find(
            (role) => role.name === roleName
          );
          console.log(streamRole);
          //once the users presence is streaming add the role.
          if (newPresence.activities[0].type === "STREAMING") {
            newPresence.guild.members.cache
              .get(newPresence.userID)
              .roles.add(streamRole);
            console.log("Stream Role Added");
          }
          //Once a user is no longer streaming and the user has the role take the role away
          else if (
            newPresence.activities[0].type !== "STREAMING" &&
            newPresence.guild.members.cache
              .get(newPresence.userID)
              .roles.cache.has(streamRole.id)
          ) {
            newPresence.guild.members.cache
              .get(newPresence.user.id)
              .roles.remove(streamRole);
            console.log("Stream Role removed");
          } else {
          }
        }
        //This is to deal with people who don't show game status so we check the oldPresence since the code block above doesn't take into account blank activities
        else if (
          newPresence.activities.length == 0 &&
          oldPresence != undefined
        ) {
          const streamRole = newPresence.guild.roles.cache.find(
            (role) => role.name === roleName
          );
          console.log(streamRole);
          if (oldPresence.activities.length >= 1) {
            if (oldPresence.activities[0].type === "STREAMING") {
              newPresence.guild.members.cache
                .get(newPresence.user.id)
                .roles.remove(streamRole);
              console.log("Stream Role removed");
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LiveStreamRoleListener;
