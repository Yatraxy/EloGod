const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { findPlayer, playerInfo } = require("../../handlers/rfunctions");

module.exports = {
    name: "info",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "info",
    description: "TestInfo",
    run: async (client, message, args, user, text, prefix) => {
    try{
        let player;

        if (!player) player = message.mentions.members.first();

        if (!player) player = message.author;

        findPlayer(player.id).then(playerTF => {
            if(playerTF){
                console.log(`awda ${playerTF}`)
                playerInfo(player.id).then(playerStats => {
                    console.log(`ugaw ${playerStats}`)
                    message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${playerStats.nickname} Stats`)
                    .setDescription(`Points: ${playerStats.points} \nRank: ${playerStats.rank} \nWins: ${playerStats.wins} \nLosses: ${playerStats.losses} \nGames: ${playerStats.games}`)
                    )
                })
            }else{
                console.log("awaw")
                message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setDescription(`${player.username} is not registered!`)
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