const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Userdata = require("../../models/userdata.js");
const mongoose = require("mongoose");
const { findPlayer } = require("../../handlers/rfunctions");

module.exports = {
    name: "test",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "test",
    description: "Test",
    run: async (client, message, args, user, text, prefix) => {
    try{
        let player;
        if (!player) player = message.mentions.members.first();

        if (!player) player = message.author;

        await findPlayer(player.id).then(playerTF => {
            if(playerTF){
                console.log(`awda ${playerTF}`)
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`hi`)
                )
            }else{
                console.log("awaw")
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`bye`)
                )
            }
        })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}