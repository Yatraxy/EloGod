const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const points = require("../../models/userdata.js");
const abc = require("../../handlers/rfunctions");
const mongoose = require("mongoose");
module.exports = {
    name: "points",
    category: "Administration",
    aliases: ["pts"],
    cooldown: 2,
    usage: "points @mention modify|set value",
    description: "Giving points or modify",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {
            const messageSend = message.content.split(' ');
            let player = message.mentions.users.first();
            let typeChange = messageSend[2] /*.toLowerCase()*/ ;
            let valuePoints = parseInt(messageSend[3]);
            let oldPoints = 0

            if(player === undefined){
                return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Give me a user! fdp`)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
                )
            }
            
            if(isNaN(valuePoints)){
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Points must be a number`)
                    //.setDescription(`\`\`\`${e.stack}\`\`\``)
                )
            }

            abc.playerInfo(player.id).then(playerPoints => {
                //console.log(playerPoints)
                if (playerPoints) {
                    if (typeChange === 'set' || typeChange === 's') {
                        //console.log(playerPoints)
                        oldPoints = playerPoints.points
                        playerPoints.points = valuePoints
                        playerPoints.save()

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> ${oldPoints} -> ${playerPoints.points}`))

                        message.guild.members.fetch(player.id).then(member => {
                            member.setNickname(`[${playerPoints.points}] ${playerPoints.nickname}`)
                                .catch(error => console.log("ok"));
                        }).catch(error => console.log('fetch error'));

                        

                    } else if (typeChange === 'modify' || typeChange === 'm') {
                        let oldPoints = playerPoints.points
                        playerPoints.points += valuePoints
                        playerPoints.save()

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> ${oldPoints} -> ${playerPoints.points} `))

                        message.guild.members.fetch(player.id).then(member => {
                            member.setNickname(`[${playerPoints.points}] ${playerPoints.nickname}`)
                                .catch(error => console.log("ok"));
                        }).catch(error => console.log('fetch error'));
                    } else {
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`❌ ERROR | An error occurred`)
                            .setDescription(`\`\`\`${typeChange} Write set | modify\`\`\``)
                        )
                    }
                } else {
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`Player not registered`)
                    )
                }
             })
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