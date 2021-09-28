const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const points = require("../../models/userdata.js");
const abc = require("../../handlers/rfunctions");
const mongoose = require("mongoose");
module.exports = {
    name: "losses",
    category: "Administration",
    aliases: ["ls"],
    cooldown: 2,
    usage: "losses @mention modify|set value",
    description: "Giving losses or modify",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {
            const messageSend = message.content.split(' ');
            let player = message.mentions.users.first();
            let typeChange = messageSend[2] /*.toLowerCase()*/ ;
            let valuePoints = parseInt(messageSend[3]);
            let oldLosses = 0

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
                .setTitle(`Losses must be a number`)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
                )
            }

            abc.playerInfo(player.id).then(playerLosses => {
                //console.log(playerLosses)
                if (playerLosses) {
                    if (typeChange === 'set' || typeChange === 's') {
                        //console.log(playerLosses)
                        oldLosses = playerLosses.losses
                        playerLosses.losses = valuePoints
                        playerLosses.save()

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> ${oldLosses} -> ${playerLosses.losses}`))

                    } else if (typeChange === 'modify' || typeChange === 'm') {
                        let oldLosses = playerLosses.losses
                        playerLosses.losses += valuePoints
                        playerLosses.save()

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> ${oldLosses} -> ${playerLosses.losses}`))
                    } else {
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`❌ ERROR | An error occurred`)
                            .setDescription(`\`\`\`${typeChange} Write set | modify\`\`\``))

                    }
                } else {
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`Player not registered`))

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