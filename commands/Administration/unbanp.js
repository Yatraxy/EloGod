const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions.js")
const ban = require("../../models/ban.js");
const mongoose = require("mongoose");
const moment = require('moment')
module.exports = {
    name: "unban",
    category: "Administration",
    aliases: ["ub"],
    cooldown: 2,
    usage: "unban <Mention>",
    description: "Unban cause you're a good dog",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {

            let player = message.mentions.users.first();
            // DO THE LENGHT IF UNBAN ALONE
            if (player === false) {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | An error occurred`)
                    .setDescription(`\`\`\`${player} doesn't exist\`\`\``));

            } else {
                abc.playerban(player.id).then(playerBan => {
                    playerBan.ban = moment().subtract(1, 'year')
                    playerBan.save()
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`<@${player.id}> unbanned`))

                })
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

// /** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */