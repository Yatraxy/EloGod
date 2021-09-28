const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require('../../handlers/rfunctions.js')
const { findPlayer } = require("../../handlers/rfunctions");
const Userdata = require("../../models/userdata.js");
const mongoose = require("mongoose");
const Clan = require("../../models/ban.js");
const moment = require('moment');

module.exports = {
    name: "regclan",
    category: "Register",
    aliases: ["registerclan"],
    cooldown: 2,
    usage: "regclan",
    description: "Register name @player1 . .",
    run: async(client, message, args, user, text, prefix) => {
        try {
            leader = message.author;

            let msg = message.content.split(' ');
            let playersreg = message.mentions.users.array();
            let clan = msg.splice(1, 1);
            let meChannel = message.channel
            let playerarrayID = []
            console.log(clan);
            playersreg.forEach(element => {
                playerarrayID.push(element.id)
            });
            console.log(playerarrayID)


            if (meChannel.name === "register-here-eu" || meChannel.name === "register-here-latam" || meChannel.name === "only-admin") {
                abc.clanInfo(playerarrayID).then(playerC => {
                    abc.multPlayerInfo(playerarrayID).then(playersName => {
                        console.log('ok1')
                        if (playerC = []) {
                            console.log('ok2')
                            const newClan = new Clan({
                                _id: mongoose.Types.ObjectId(),
                                clanName: clan,
                                players: {
                                    userID: playerarrayID,
                                    name: playersName,
                                }
                            });
                            newClan.save();
                        }
                    })
                })
            } else {
                console.log('ok3')
                message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setDescription(`Wrong Channel!`)
                )
            }

            console.log('ok4')
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}