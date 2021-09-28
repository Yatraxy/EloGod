const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");
const mongoose = require("mongoose");
const Userdata = require("../../models/userdata.js");

module.exports = {
    name: "result",
    category: "Information",
    aliases: ["r", "rs", "res"],
    cooldown: 2,
    usage: "result <channel> <gameid> <winningteam>",
    description: "Resulting a game",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {
            let player = message.author
            const cancelmsg = message.content.split(' ')
            let gameID = parseInt(cancelmsg[2])
            let chooseTeam = parseInt(cancelmsg[3])
            let chooselTeam
            let winTeam
            let loseTeam

            let saveTeam = []
                //let allTeams
            let channel = message.mentions.channels.first()

            if(channel === undefined){
                return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Mention a Lobby!`)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
                )
            }

            if(isNaN(gameID)){
                return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`GameID needed!`)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
                )
            }

            if(isNaN(chooseTeam)){
                return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`No points for this lobby!`)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
                )
            }

            if(channel.name == "prolist-queue"){
                return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Mention a Lobby!`)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
                )
            }

            if (channel != null || gameID != null || chooseTeam != null) {

                if (chooseTeam === 1) {
                    chooselTeam = 2
                } else if (chooseTeam === 2) {
                    chooselTeam = 1
                }
    
                let allPlayers = [{ wl: chooseTeam, name: 'abc', players: [] }, { wl: chooselTeam, name: 'abcd', players: [] }]
    
                abc.gameInfo(channel.name, gameID).then(gamData => {
                    if (gamData) {
                        if (!gamData.cancel || gamData.cancel === null) {
                            gamData.cancel = true
                            gamData.save()
                            abc.multPlayerInfos(gamData.team1).then(team1PI => {
    
                                abc.multPlayerInfos(gamData.team2).then(team2PI => {
                                    for (let i = 0; i < team1PI.length; i++) {
                                        team1PI[i].points2 = (team1PI[i].points - 1500) / 173.7178
                                        team1PI[i].rd2 = team1PI[i].rd / 173.7178
                                        team2PI[i].points2 = (team2PI[i].points - 1500) / 173.7178
                                        team2PI[i].rd2 = team2PI[i].rd / 173.7178
                                    }
                                    for (let i = 0; i < team1PI.length; i++) {
                                        allPlayers[0].players.push(team1PI[i])
                                        allPlayers[1].players.push(team2PI[i])
                                    }
                                    //console.log(team1PI[0].points, "igel1")
                                    let abcTeam = abc.teamResult(allPlayers, gamData.gamenumber)
                                        //console.log(abcTeam)
                                        //console.log(team1PI[0].points, "igel2")
                                    if (chooseTeam === 1) {
                                        winTeam = abcTeam.teams[0].players
                                        loseTeam = abcTeam.teams[1].players
    
                                        for (let i = 0; i < winTeam.length; i++) {
                                            team1PI[i].points = Math.floor(winTeam[i].points)
                                            team1PI[i].rd = winTeam[i].rd
                                            team1PI[i].vol = winTeam[i].vol
                                            team1PI[i].wins++
    
                                                //let poi = loseTeam[i].last_result[0].change.points * 2
    
                                            team2PI[i].points = Math.floor(loseTeam[i].points)
                                            team2PI[i].rd = loseTeam[i].rd
                                            team2PI[i].vol = loseTeam[i].vol
                                            team2PI[i].losses++
                                        }
                                    } else if (chooseTeam === 2) {
                                        winTeam = abcTeam.teams[1].players
                                        loseTeam = abcTeam.teams[0].players
    
                                        for (let i = 0; i < winTeam.length; i++) {
                                            team2PI[i].points = Math.floor(winTeam[i].points)
                                            team2PI[i].rd = winTeam[i].rd
                                            team2PI[i].vol = winTeam[i].vol
                                            team2PI[i].wins++
    
                                                //let poi = loseTeam[i].last_result[0].change.points * 2
    
                                            team1PI[i].points = Math.floor(loseTeam[i].points)
                                            team1PI[i].rd = loseTeam[i].rd
                                            team1PI[i].vol = loseTeam[i].vol
                                            team1PI[i].losses++
                                        }
    
                                    }
                                    for (let i = 0; i < team1PI[i].length; i++) {
                                        const element = array[i];
                                        
                                    }
                                    let mesuga = new MessageEmbed()
                                        .setColor(ee.color)
                                        .setTitle(`Result for game #${gamData.gamenumber}\nResulted by the moderator ${player.tag}`)
                                        .setDescription(`<#${channel.id}>`)
                                        .setFooter(ee.footertext, ee.footericon)
    
                                
                                    if (winTeam.length === 2) {
                                        mesuga.addField(`Winning Team: Team ${chooseTeam}`, `${winTeam[0].nickname} **Points:** ${winTeam[0].last_result[0].init.points} + ${Math.floor(winTeam[0].last_result[0].change.points)} 
                                        ${winTeam[1].nickname} **Points:** ${winTeam[1].last_result[0].init.points} + ${Math.floor(winTeam[1].last_result[0].change.points)}`)
    
                                        mesuga.addField(`Losing Team: Team ${chooselTeam}`, `${loseTeam[0].nickname} **Points:** ${loseTeam[0].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[0].last_result[0].change.points))}
                                        ${loseTeam[1].nickname} **Points:** ${loseTeam[1].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[1].last_result[0].change.points))}`)
    
                                    } else if (winTeam.length === 3) {
                                        mesuga.addField(`Winning Team: Team ${chooseTeam}`, `${winTeam[0].nickname} **Points:** ${winTeam[0].last_result[0].init.points} + ${Math.floor(winTeam[0].last_result[0].change.points)} 
                                        ${winTeam[1].nickname} **Points:** ${winTeam[1].last_result[0].init.points} + ${Math.floor(winTeam[1].last_result[0].change.points)}
                                        ${winTeam[2].nickname} **Points:** ${winTeam[2].last_result[0].init.points} + ${Math.floor(winTeam[2].last_result[0].change.points)}`)
    
                                        mesuga.addField(`Losing Team: Team ${chooselTeam}`, `${loseTeam[0].nickname} **Points:** ${loseTeam[0].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[0].last_result[0].change.points))}
                                        ${loseTeam[1].nickname} **Points:** ${loseTeam[1].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[1].last_result[0].change.points))}
                                        ${loseTeam[2].nickname} **Points:** ${loseTeam[2].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[2].last_result[0].change.points))}`)
                                    } else {
                                        mesuga.addField(`Winning Team: Team ${chooseTeam}`, `${winTeam[0].nickname} **Points:** ${winTeam[0].last_result[0].init.points} + ${Math.floor(winTeam[0].last_result[0].change.points)} 
                                        ${winTeam[1].nickname} **Points:** ${winTeam[1].last_result[0].init.points} + ${Math.floor(winTeam[1].last_result[0].change.points)}
                                        ${winTeam[2].nickname} **Points:** ${winTeam[2].last_result[0].init.points} + ${Math.floor(winTeam[2].last_result[0].change.points)}
                                        ${winTeam[3].nickname} **Points:** ${winTeam[3].last_result[0].init.points} + ${Math.floor(winTeam[3].last_result[0].change.points)}`)
    
                                        mesuga.addField(`Losing Team: Team ${chooselTeam}`, `${loseTeam[0].nickname} **Points:** ${loseTeam[0].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[0].last_result[0].change.points))}
                                        ${loseTeam[1].nickname} **Points:** ${loseTeam[1].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[1].last_result[0].change.points))}
                                        ${loseTeam[2].nickname} **Points:** ${loseTeam[2].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[2].last_result[0].change.points))}
                                        ${loseTeam[3].nickname} **Points:** ${loseTeam[3].last_result[0].init.points} - ${Math.abs(Math.floor(loseTeam[3].last_result[0].change.points))}`)
                                    }
                                    message.channel.send(mesuga)
                                    
                                    let rankroles = ["871487394321412136", "871489471718236190", "871489262514765894", "871487696533606401", "871489838401077318", "871488550200283156", "871489723888197715", "871489942449180722"]
                                    let prorole = "880114849173098517"

                                    for (let i = 0; i < team1PI.length; i++) {
                                        abc.rankDatarespoi(team1PI[i].points).then(newRank => {
                                            abc.rankDatarespoi(team2PI[i].points).then(newRank2 => {
                                                if (newRank.rankpos === team1PI[i].rank) {
                                                    abc.fetchMember(message, team1PI[i].userID).then(member => {
                                                        if (member.id != message.guild.ownerID) {
                                                            team1PI[i].save()
                                                            member.setNickname(`[${team1PI[i].points}] ${team1PI[i].nickname}`).then(() => {
                                                                setTimeout(function() {
                
                                                                }, 500);
                                                            })
                                                        } else {
                                                            team1PI[i].save()
                                                        }
                                                    }).catch(error => console.log('fetch error'));
                                                } else {
                                                    abc.fetchMember(message, team1PI[i].userID).then(member => {
                                                        if (member.id != message.guild.ownerID) {
                                                            team1PI[i].rank = newRank.rankpos
                                                            team1PI[i].save()
                                                            member.setNickname(`[${team1PI[i].points}] ${team1PI[i].nickname}`).then(() => {
                                                                setTimeout(function() {
                
                                                                }, 500);
                                                                member.roles.remove(rankroles).then(() => {
                                                                    setTimeout(function() {
                
                                                                    }, 500);
                                                                    member.roles.add(newRank.rolerank).then(() => {
                                                                        setTimeout(function() {
                
                                                                        }, 500);

                                                                        if (newRank.rankpos >= 3) {
                                                                   
                                                                            member.roles.add(prorole)
                                                                            
                                                                        } else {
        
                                                                            member.roles.remove(prorole)
        
                                                                        }
                                                                    })
                                                                })   
                                                            })  
                                                        } else {
                                                            team1PI[i].rank = newRank.rankpos
                                                            team1PI[i].save()
                                                            member.roles.remove(rankroles).then(() => {
                                                                setTimeout(function() {
            
                                                                }, 500);
                                                                member.roles.add(newRank.rolerank)
                                                            })
                                                        }
                                                    }).catch(error => console.log('fetch error'));
                                                }

                                                if (newRank2.rankpos === team2PI[i].rank) {
                                                    abc.fetchMember(message, team2PI[i].userID).then(member => {
                                                        if (member.id != message.guild.ownerID) {
                                                            team2PI[i].save()
                                                            member.setNickname(`[${team2PI[i].points}] ${team2PI[i].nickname}`).then(() => {
                                                                setTimeout(function() {
                                                                }, 500);
                                                            })
                                                        } else {
                                                            team2PI[i].save()
                                                        }
                                                    }).catch(error => console.log('fetch error'));
                                                } else {
                                                    abc.fetchMember(message, team2PI[i].userID).then(member => {
                                                        if (member.id != message.guild.ownerID) {
                                                            team2PI[i].rank = newRank2.rankpos
                                                            team2PI[i].save()
                                                            member.setNickname(`[${team2PI[i].points}] ${team2PI[i].nickname}`).then(() => {
                                                                setTimeout(function() {
                                                                }, 500);
                                                                member.roles.remove(rankroles).then(() => {
                                                                    setTimeout(function() {
                                                                    }, 500);
                                                                    member.roles.add(newRank2.rolerank).then(() => {
                                                                        setTimeout(function() {
                
                                                                        }, 500);

                                                                        if (newRank2.rankpos >= 3) {
                                                                   
                                                                            member.roles.add(prorole)
                                                                            
                                                                        } else {
        
                                                                            member.roles.remove(prorole)
        
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        } else {
                                                            team2PI[i].rank = newRank2.rankpos
                                                            team2PI[i].save()
                                                            member.roles.remove(rankroles).then(() => {
                                                                setTimeout(function() {
                                                                }, 500);
                                                                member.roles.add(newRank2.rolerank)
                                                            })
                                                        }
                                                    }).catch(error => console.log('fetch error'));
                                                }
                                            })
                                        })   
                                    }
                                })
                            })
                        } else {
                            message.channel.send(new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`Game is already progressed or cancelled use undo first!`)
                            )
                        }
                    } else {
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`Game not found!`)
                        )
                    }
                })
            } else {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Channel / Gamenumber / WinningTeam missing!`)
                )
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