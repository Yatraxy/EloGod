const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");

module.exports = {
    name: "forcejoin",
    category: "QueueC",
    aliases: ["fj"],
    cooldown: 2,
    usage: "forcejoin",
    description: "TestForceJoin",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let player;

            if (!player) player = message.mentions.members.first();

            if (!player) player = message.author;

            let meChannel = message.channel.name;

            abc.findPlayer(player.id).then(playerTF => {
                if (playerTF) {
                    abc.findChannel(meChannel).then(channelTF => {
                        if (channelTF) {
                            abc.channelInfo(meChannel).then(chaData => {
                                abc.playerInfo(player.id).then(plaData => {
                                    let isQueue = chaData.playerIQ.indexOf(plaData.userID);

                                    if (isQueue === -1) {
                                        if (chaData.playerIQN < chaData.playerPT) {
                                            chaData.playerIQ.push(plaData.userID)
                                            chaData.playerIQN ++;
                                            chaData.save()
                                            message.channel.send(new MessageEmbed()
                                            .setColor(ee.color)
                                            .setFooter(ee.footertext, ee.footericon)
                                            .setDescription(`[${chaData.playerIQN}/${chaData.playerPT}] <@${player.id}> joined the queue!`)
                                            )

                                            if (chaData.playerIQN === chaData.playerPT) {
                                                abc.gameInfo(chaData.channelname, chaData.gamenb).then(gamData => {
                                                    abc.multPlayerInfo(chaData.playerIQ).then(plaIQInfo => {
                                                        let pool = sum(plaIQInfo.points)

                                                        console.log(pool)
                                                    })
                                                })
                                            }
                                        } else {
                                            message.channel.send(new MessageEmbed()
                                            .setColor(ee.color)
                                            .setFooter(ee.footertext, ee.footericon)
                                            .setTitle(`Queue is full! Wait for game to start and try again!`)
                                            )
                                        }
                                    } else {
                                        message.channel.send(new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setFooter(ee.footertext, ee.footericon)
                                        .setTitle(`You are already in queue!`)
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
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}