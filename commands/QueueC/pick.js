const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Userdata = require("../../models/userdata.js");
const mongoose = require("mongoose");
const abc = require("../../handlers/rfunctions");

module.exports = {
    name: "pick",
    category: "QueueC",
    aliases: ["p"],
    cooldown: 2,
    usage: "pick <@mention> / <@mention> <@mention>",
    description: "pick players",
    memberpermissions: ["MANAGE_ROLES"],
    run: async (client, message, args, user, text, prefix) => {
    try{
        let player = message.author;
        let meChannel = message.channel;
        let playermention = message.mentions.members.first(2)

        if(meChannel != "prolist-queue" && meChannel != "proq-v3-td"){
            return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`afk?`)
            //.setDescription(`\`\`\`${e.stack}\`\`\``)
            ).then(msg => msg.delete({ timeout: 1000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));
        }

        if(playermention === undefined){
            return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Mention a player to pick!`)
            //.setDescription(`\`\`\`${e.stack}\`\`\``)
            ).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));
        }

        abc.channelInfo(meChannel.name).then(chaInfo => {
            abc.gameInfo(chaInfo.channelname, chaInfo.gamenb).then(gamInfo => {
                if (chaInfo.picking = true) {
                    if (gamInfo.captainpick === true) {
                        if (gamInfo.captains[0] === player.id) {
                            
                        } else if (gamInfo.captains[1] === player.id && gamInfo.captainpick === false) {

                        }
                    }
                }
            })
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