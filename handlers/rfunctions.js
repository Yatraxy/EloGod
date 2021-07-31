const { MessageEmbed } = require("discord.js");
const Userdata = require("../models/userdata.js");
const Channeldata = require("../models/channeldata.js");
const Gamedata = require("../models/gamedata.js");

module.exports = {
    findPlayer: async function(player) {
        try {
            let pReg;
            
            const fPlayer = await Userdata.findOne({userID: player});

            if (fPlayer) {
                pReg = true;
            } else {
                pReg = false;
            }
            return pReg;
        } catch (e){
            console.log(String(e.stack).bgRed)
        }
    },
    playerInfo: async function(player) {
        try {
            //let pInfo;
            
            const pStats = await Userdata.findOne({userID: player});

            return pStats; 
        } catch (e){
            console.log(String(e.stack).bgRed)
        }
    },
    multPlayerInfo: async function(players) {
        try {
            const multPlayer = await Userdata.find({userID: {$in: players}}).select({"userID": 1, "points": 1, "_id": 0}).sort({points: -1});

            return multPlayer; 
        } catch (e){
            console.log(String(e.stack).bgRed)
        }
    },
    findChannel: async function(channel) {
        try {
            let chFound;

            const fChannel = await Channeldata.findOne({channelname: channel});

            if (fChannel) {
                chFound = true;
            } else {
                chFound = false;
            }
            return chFound;
        } catch (e){
            console.log(String(e.stack).bgRed)
        }
    },
    channelInfo: async function(channel) {
        try {
            //let chFound;

            const fChannel = await Channeldata.findOne({channelname: channel});

            return fChannel;
        } catch (e){
            console.log(String(e.stack).bgRed)
        }
    },
    findGame: async function(channel, gamenr) {
        try {
            let gaFound;

            const fGame = await Gamedata.findOne({channelname: channel, gamenumber: gamenr});

            if (fGame) {
                gaFound = true;
            } else {
                gaFound = false;
            }
            return gaFound;
        } catch (e){
            console.log(String(e.stack).bgRed)
        }
    },
    gameInfo: async function(channel, gamenr) {
        try {
            //let gaFound;

            const fGame = await Gamedata.findOne({channelname: channel, gamenumber: gamenr});

            return fGame;
        } catch (e){
            console.log(String(e.stack).bgRed)
        }
    },
    compute: function(playerStat, playerIQ){
        try {
            //let te1 = []
            //let te2 = []            
            let pairs = []
            let teamArr = []
            let drArr = []

            //te2 = te1.splice(0, playerIQ/2)

            for (var i = 0; i < playerStat.length - 1; i++) {
                for (let j = i + 1; j < playerStat.length; j++) {
                    pairs.push([playerStat[i], playerStat[j]]);
                }          
            }
            return pairs;
        } catch (e){
            console.log(String(e.stack).bgRed)
        }
    },
}