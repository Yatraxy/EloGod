const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { findPlayer } = require("../../handlers/rfunctions");
const Userdata = require("../../models/userdata.js");
const mongoose = require("mongoose");

module.exports = {
    name: "reg",
    category: "Register",
    aliases: [""],
    cooldown: 2,
    usage: "reg",
    description: "TestRegister",
    run: async (client, message, args, user, text, prefix) => {
    try{
        let player = message.mentions.users.first();

        if (!player) player = message.author;

        findPlayer(player.id).then(playerTF => {
            if(!playerTF){
                const newUserdata = new Userdata({
                    _id: mongoose.Types.ObjectId(),
                    nickname: player.username,
                    userID: player.id,
                    points: 1000,
                    rank: null,
                });
                newUserdata.save();
    
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`You registered as ${player.username}!`)
                )
            }else{
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`You are already registered as ${player.username}!`)
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