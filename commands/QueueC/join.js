const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");

module.exports = {
    name: "join",
    category: "QueueC",
    aliases: ["j"],
    cooldown: 2,
    usage: "join",
    description: "TestJoin",
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
                                                    //abc.compute(plaIQInfo, chaData.playerIQN).then(avgSc => {
                                                        console.log(abc.compute(plaIQInfo, chaData.playerIQN))
                                                    //})
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
        /*Channeldata.findOne({
            channelname: channelP
        }, (errr, foundChannel) => {
            if (foundChannel) {
                Userdata.findOne({
                    userID: user.id
                }, (err, foundUser) => {
                    if(foundUser){
                        let isQueue = foundChannel.playerIQ.indexOf(foundUser.userID);
                        //if (isQueue === -1) {
                            if (foundChannel.playerIQN < foundChannel.playerPT) {
                                foundChannel.playerIQ.push(foundUser.userID)
                                foundChannel.playerIQN ++;
                                foundChannel.save()
                                let userM = message.guild.members.cache.find(member => member.id == `${foundUser.userID}`)
                                message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setDescription(`[${foundChannel.playerIQN}/${foundChannel.playerPT}] ${userM} joined the queue!`)
                                )
                                Gamedata.findOne({
                                    channelname: foundChannel.channelname,
                                    gamenumber: foundChannel.gamenb
                                }, (er, foundGame) => {
                                    //foundGame.players.push(foundUser.userID)
                                    if (foundChannel.playerIQN === foundChannel.playerPT) {
                                        //let arrCaptains = (createPickPh(msg, foundChannel, foundGame))
                                        let abc = Userdata.find({ userID: {$in: foundChannel.playerIQ}}).select({ "userID": 1, "points": 1, "_id": 0 }).sort({points: -1});

                                        abc.exec(function (err, results){
                                            foundGame.team1.set(0,results[0].userID);
                                            foundGame.team2.set(0,results[1].userID);
                                            for (let index = 2; index < results.length; index++) {
                                                const element = results[index].userID;
                                                foundGame.players.push(element);
                                            }
                                            foundGame.save();
                                            console.log(results.length);

                                            if (foundChannel.playerIQN === 2) {
                                                message.channel.send(new MessageEmbed()
                                                .setColor(ee.color)
                                                .setFooter(ee.footertext, ee.footericon)
                                                .setTitle(`Game #${foundGame.gamenumber} pick players!`)
                                                .setDescription(`<@${foundGame.team1[0]}> vs <@${foundGame.team2[0]}>!`)
                                            )
                                            } else {
                                                message.channel.send(new MessageEmbed()
                                                .setColor(ee.color)
                                                .setFooter(ee.footertext, ee.footericon)
                                                .setTitle(`Game #${foundGame.gamenumber} pick players!`)
                                                .setDescription(`<@${foundGame.team1[0]}> picks first then <@${foundGame.team2[0]}> can pick!\n\nPlayers to pick:\n\n<@${foundGame.players.join('>\n<@')}>`)
                                            )}
                                        });

                                        //foundGame.save();
                                        //console.log(foundGame.team1[0]);
                                    } else {
                                        foundGame.save();    
                                    }
                                })
                            } else {
                                message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`Queue is full! Wait for game to start....`)
                                )
                            }
                        /*} else {
                            message.channel.send(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`You are already in queue!`)
                        )}
                    }else{
                        message.channel.send(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`You are not registered!`)
                    )}
                })
            } else {
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`This is not a Lobby!`)
                )
            }
        })*/
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