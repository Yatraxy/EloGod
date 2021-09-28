const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require('../../handlers/rfunctions.js')
const mongoose = require("mongoose");

module.exports = {
    name: "renameuser",
    category: "renameuser",
    aliases: ["ru"],
    cooldown: 2,
    usage: "rename",
    description: "TestRegister",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {

            // renameuser  0 @mention  1 name 2 
            let msg = message.content.split(' ');
            let playerName = msg.splice(2, msg.length)
            let userNick = playerName.join(' ')
            //console.log(msg.length) // =reg 
            let player = message.mentions.users.first();
            let oldname
            //console.log(player)
            //console.log(player.id, 'id')
            let meChannel = message.channel

            if ((meChannel.name === "register-here-eu" || meChannel.name === "register-here-latam" || meChannel.name === "only-admin" || meChannel.name === "test") && !(player === null || userNick === null || playerName[0] === null)) {

                abc.playerInfo(player.id).then(playerRename => {
                    if (playerRename) {
                        
                        oldname = playerRename.nickname
                        playerRename.nickname = userNick
                        playerRename.save()
    
                        message.guild.members.fetch(player.id).then(member => {
                            member.setNickname(`[${playerRename.points}] ${userNick}`)
                                .catch(error => console.log("ok"));
                        }).catch(error => console.log('fetch error'));
    
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`${oldname} **-->** <@${player.id}>!`)
                        )
                    } else {
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`Player ${player.username} is not registered!`)
                        )
                    }

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
            /*return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );*/
        }
    }
}