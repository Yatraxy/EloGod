const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");

module.exports = {
    name: "leave",
    category: "QueueC",
    aliases: ["l"],
    cooldown: 2,
    usage: "leave",
    description: "TestLeave",
    run: async (client, message, args, user, text, prefix) => {
    try{
        let player = message.author;
        let meChannel = message.channel.name;

        abc.findPlayer(player.id).then(playerTF => {
            if (playerTF) {
                abc.findChannel(meChannel).then(channelTF => {
                    if (channelTF) {
                        abc.channelInfo(meChannel).then(chaData => {
                            abc.playerInfo(player.id).then(plaData => {
                                let isQueue = chaData.playerIQ.indexOf(plaData.userID);

                                if (isQueue != -1) {
                                    if (chaData.playerIQN < chaData.playerPT) {
                                        chaData.playerIQ.pull(plaData.userID)
                                        chaData.playerIQN --;
                                        chaData.save()
                                        message.channel.send(new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter(ee.footertext, ee.footericon)
                                        .setDescription(`[${chaData.playerIQN}/${chaData.playerPT}] <@${player.id}> left the queue!`)
                                        )
                                    } else {
                                        message.channel.send(new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter(ee.footertext, ee.footericon)
                                        .setTitle(`Queue is full! You can't do nothing.`)
                                        )
                                    }
                                } else {
                                    message.channel.send(new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`You are not in queue!`)
                                    )
                                }
                            })
                        })
                    } else {
                        message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`This is not a Lobby!`)
                        )
                    }
                })
            } else {
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
            //.setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}