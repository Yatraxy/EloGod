const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");
const userdata = require("../../models/userdata.js");
const mongoose = require("mongoose");
const { multPlayerInfo } = require("../../handlers/rfunctions");
module.exports = {
    name: "ranks",
    category: "Information",
    aliases: ["rks"],
    cooldown: 2,
    usage: "say <TEXT>",
    description: "Resends your Text",
    run: async(client, message, args, user, text, prefix) => {
        try {
            let meChannel = message.channel

            if (meChannel.name === "info" || meChannel.name === "only-admin") {
                abc.getAllRank().then(ranks => {
                    console.log(ranks[0].starting[0])
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`**Ranks** : `)
                        .setDescription(`<@&${ranks[0].rolerank}> : ${ranks[0].starting} -> ${ranks[1].starting - 1}\n
                                        <@&${ranks[1].rolerank}> : ${ranks[1].starting}  -> ${ranks[2].starting - 1}\n
                                        <@&${ranks[2].rolerank}> : ${ranks[2].starting}  -> ${ranks[3].starting - 1}\n
                                        <@&${ranks[3].rolerank}> : ${ranks[3].starting}  -> ${ranks[4].starting - 1}\n
                                        <@&${ranks[4].rolerank}> : ${ranks[4].starting}  -> ${ranks[5].starting - 1}\n
                                        <@&${ranks[5].rolerank}> : ${ranks[5].starting}  -> ${ranks[6].starting - 1}\n
                                        <@&${ranks[6].rolerank}> : ${ranks[6].starting}  -> ${ranks[7].starting - 1}\n
                                        <@&${ranks[7].rolerank}> : ${ranks[7].starting}\n`)
                    )
                })
            } else {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setDescription(`
                                        Wrong channel `)).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));

            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ERROR | An error occurred `)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */