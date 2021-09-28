//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
const mongoose = require("mongoose");
const Usereventdata = require("./models/usereventdata.js");
const { findEventPlayer } = require("./handlers/rfunctions.js");

/*mongoose.connect('mongodb://localhost:27017/Ranked', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});*/
//const userData = require ("./models/userdata.js");
//const channelData = require ("./models/channeldata.js");
//const gamedata = require ("./models/gamedata.js");

//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

mongoose.connect(require("./botconfig/config.json").mongodb_srv, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then (() => {
  console.log('Connected to database!');
}).catch((err) => {
  console.log(err);
});

client.on('message', async (msg) => {
  let playEv
  if (msg.channel.id === '877735273356738600') {
    let mesgName = msg.content.split(' ')
    findEventPlayer(msg.author.id).then(pla => {
      playEv = msg.author
      if (!pla) {
        const newUsereventdata = new Usereventdata({
          _id: mongoose.Types.ObjectId(),
          nickname: mesgName.join(" "),
          userID: playEv.id,
          dctag: playEv.tag,
        })
        newUsereventdata.save()
      }
    })
  }
})

client.login(require("./botconfig/config.json").token);