const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require('../../handlers/rfunctions.js')
const { findPlayer } = require("../../handlers/rfunctions");
const Userdata = require("../../models/userdata.js");
const mongoose = require("mongoose");
const ban = require("../../models/ban.js");
const moment = require('moment');

module.exports = {
    name: "reg",
    category: "Register",
    aliases: ["register"],
    cooldown: 2,
    usage: "reg",
    description: "Register",
    run: async(client, message, args, user, text, prefix) => {
        try {
            player = message.author

            let msg = message.content.split(' ');
            let playerName = msg.splice(1, msg.length)
            let userNick
            let meChannel = message.channel
            let defaultRank = 2;

            if(playerName[0] != null){
                if(playerName[0].length <= 1) {
                    userNick = player.username
                }
                else {
                    userNick = playerName.join(' ')
                } 
            }else {
                userNick = player.username
            } 
            
            

            if (meChannel.name === "register-here-eu" || meChannel.name === "register-here-latam" || meChannel.name === "only-admin") {
                abc.playerInfo(player.id).then(playerTF => {
                    abc.rankData(defaultRank).then(regRank => {
                        if (!playerTF) {
                            const newUserdata = new Userdata({
                                _id: mongoose.Types.ObjectId(),
                                nickname: userNick,
                                userID: player.id,
                                rank: defaultRank,
                            });
                            newUserdata.save();

                            //console.log(regRank, ' regrank ')
                            //console.log(regRank.rolerank, ' regrank.rolerank ')

                            message.member.roles.add(regRank.rolerank);
                            message.member.setNickname(`[1500] ${userNick}`)
                            message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setDescription(`You registered as <@${player.id}>!`)
                            )

                            newBan = new ban({
                                _id: mongoose.Types.ObjectId(),
                                player: player.id,
                                ban: moment().subtract(21, 'year'),
                                reason: 'reg',
        
                            });
                            newBan.save();

                        } else {
                            message.channel.send(new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setFooter(ee.footertext, ee.footericon)
                                .setDescription(`You are already registered as <@${player.id}>!`)
                            )
                        }
                    })
                })
            } else {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setDescription(`Wrong Channel!`)
                )
            }
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