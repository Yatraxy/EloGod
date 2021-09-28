const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");
const playerBan = require('../../commands/Administration/banp');
const moment = require('moment');
const Gamedata = require("../../models/gamedata.js");
const mongoose = require("mongoose");


module.exports = {
    name: "join",
    category: "QueueC",
    aliases: ["j"],
    cooldown: 0.5,
    usage: "join",
    description: "TestJoin",
    run: async(client, message, args, user, text, prefix) => {
        try {
            let player = message.author;
            let meChannel = message.channel;
            let dayOfTdy = moment().utc(2)

            abc.findPlayer(player.id).then(playerTF => {
                if (playerTF) {
                    abc.findChannel(meChannel.name).then(channelTF => {

                        if (channelTF) {
                            abc.playerban(player.id).then(playerBana => {
                                //console.log(playerBan)
                                if (dayOfTdy.isAfter(moment(playerBana.ban).utc())) {

                                    abc.channelInfo(meChannel.name).then(chaData => {
                                        abc.playerInfo(player.id).then(plaData => {
                                            let isQueue = chaData.playerIQ.indexOf(plaData.userID);


                                            if (isQueue === -1) {
                                                if (chaData.playerIQN < chaData.playerPT && chaData.picking === false) {
                                                    chaData.playerIQ.push(plaData.userID)
                                                    chaData.playerIQN++;
                                                    /*if (chaData.playerIQN === chaData.playerPT) {
                                                        if (chaData.pickmode === 2) {
                                                            chaData.picking = true
                                                        }
                                                    }*/
                                                    chaData.save()
                                                    message.channel.send(new MessageEmbed()
                                                        .setColor(ee.color)
                                                        .setFooter(ee.footertext, ee.footericon)
                                                        .setDescription(`[${chaData.playerIQN}/${chaData.playerPT}] <@${player.id}> joined the queue!`)
                                                    )

                                                    if (chaData.playerIQN === chaData.playerPT) {
                                                        abc.gameInfo(chaData.channelname, chaData.gamenb).then(gamData => {
                                                            abc.multPlayerInfo(chaData.playerIQ).then(plaIQInfo => {

                                                                /*if (chaData.pickmode === 2) {
                                                                    
                                                                    for (let i = chaData.playerIQ.length; i; i--) {
                                                                        let j = Math.floor(Math.random() * i);
                                                                        [chaData.playerIQ[i - 1], chaData.playerIQ[j]] = [chaData.playerIQ[j], chaData.playerIQ[i - 1]];
                                                                    }

                                                                    gamData.captains.push(chaData.playerIQ[0])
                                                                    gamData.captains.push(chaData.playerIQ[1])
                                                                    gamData.remplayers = chaData.playerIQ.slice(2)
                                                                    gamData.save()

                                                                    message.channel.send(`Captains have been picked. Use the command =p to pick a player!\nCaptain 1: <@${gamData.captains[0]}>\nCaptain 2: <@${gamData.captains[1]}>\n`, { embed: new MessageEmbed()
                                                                        .setColor(ee.color)
                                                                        .setFooter(ee.footertext, ee.footericon)
                                                                        .setTitle(`Game #${gamData.gamenumber} start picking!`)
                                                                        .setDescription(`**Team 1**\nCaptain: <@${gamData.captains[0]}>\n**Team 2**\nCaptain: <@${gamData.captains[1]}>\n\n**Remaining players**\n<@${gamData.remplayers.join('>\n<@')}>\n`)
                                                                    })

                                                                    chaData.playerIQ = []
                                                                    chaData.playerIQN = 0
                                                                    chaData.save()
                                                                } else {*/
                                                                    let playersReact = []
                                                                    let teams = abc.elocheck(plaIQInfo)

                                                                    for (let i = 0; i < teams.length; i++) {
                                                                        for (let j = 0; j < teams[0].length; j++) {
                                                                            if ((i % 2) === 0) {
                                                                                gamData.team1.push(teams[i][j].userID)
                                                                                playersReact.push(teams[i][j].userID)
                                                                            } else {
                                                                                gamData.team2.push(teams[i][j].userID)
                                                                                playersReact.push(teams[i][j].userID)
                                                                            }

                                                                        }

                                                                    }
                                                                    gamData.players.push(teams)
                                                                    gamData.pmap = chaData.maps[Math.floor(Math.random() * chaData.maps.length)]
                                                                    gamData.save()

                                                                    message.channel.send(`<@${gamData.team1.join('><@')}><@${gamData.team2.join('><@')}>`, { embed: new MessageEmbed()
                                                                        .setColor(ee.color)
                                                                        .setFooter(ee.footertext, ee.footericon)
                                                                        .setTitle(`Game: #${gamData.gamenumber} is starting now!`)
                                                                        .setDescription(`**Lobby:** <#${meChannel.id}>\n**Map:** ${gamData.pmap}\n\n**Team 1**\n<@${gamData.team1.join('>\n<@')}>\n\n**Team 2**\n<@${gamData.team2.join('>\n<@')}>\n`)
                                                                    }).then(msgBot => {
                                                                        message.channel.send(new MessageEmbed()
                                                                            .setColor(ee.color)
                                                                            .setFooter(ee.footertext, ee.footericon)
                                                                            .setTitle(`You have 5 minutes from now on to vote for another Map!`)
                                                                        )
                                                                        let mapChange = chaData.maps[Math.floor(Math.random() * chaData.maps.length)]
                                                                        for (let i = 0; i < 1;) {

                                                                            if (mapChange == gamData.pmap) {
                                                                                mapChange = chaData.maps[Math.floor(Math.random() * chaData.maps.length)]
                                                                                i = 0
                                                                            } else {
                                                                                i = 1
                                                                                break
                                                                            }
                                                                        }

                                                                        abc.reactChange(msgBot, playersReact, mapChange, gamData.gamenumber, message)
                                                                    })
                                                                    chaData.gamenb++;
                                                                    chaData.playerIQ = []
                                                                    chaData.playerIQN = 0
                                                                    chaData.save()

                                                                    newGamedata = new Gamedata({
                                                                        _id: mongoose.Types.ObjectId(),
                                                                        gamenumber: chaData.gamenb,
                                                                        channelname: chaData.channelname,
                                                                    });
                                                                    newGamedata.save();
                                                                //}
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
                                        .setColor(ee.color)
                                        .setFooter(ee.footertext, ee.footericon)
                                        .setDescription(`<@${player.id}> You are still banned from matchmaking until: **${moment(playerBana.ban).utc()}**`)
                                    )
                                }

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