const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const points = require("../../models/userdata.js");
const abc = require("../../handlers/rfunctions");
const mongoose = require("mongoose");
module.exports = {
    name: "wins",
    category: "Administration",
    aliases: ["ws"],
    cooldown: 2,
    usage: "wins @mention modify|set value",
    description: "Giving wins or modify",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {
            const messageSend = message.content.split(' ');
            let player = message.mentions.users.first();
            let typeChange = messageSend[2] /*.toLowerCase()*/ ;
            let valuePoints = parseInt(messageSend[3]);
            let oldWins = 0

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
                .setTitle(`Wins must be a number`)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
                )
            }

            abc.playerInfo(player.id).then(playerWins => {
                //console.log(playerWins)
                if (playerWins) {
                    if (typeChange === 'set' || typeChange === 's') {
                        //console.log(playerWins)
                        oldWins = playerLosses.wins
                        playerWins.wins = valuePoints
                        playerWins.save()

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> ${oldWins} -> ${playerWins.wins}`))

                    } else if (typeChange === 'modify' || typeChange === 'm') {
                        let oldWins = playerWins.wins
                        playerWins.wins += valuePoints
                        playerWins.save()

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> ${oldWins} -> ${playerWins.wins}`))
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