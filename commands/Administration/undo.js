const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");

module.exports = {
    name: "undo",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "undo <channel> <gameid>",
    description: "Undo a played/cancelled game",
    memberpermissions: ["MANAGE_ROLES"],
    run: async (client, message, args, user, text, prefix) => {
    try{
      let player = message.author
      const cancelmsg = message.content.split(' ')
      let gameID = parseInt(cancelmsg[2])
      let saveplayers = []
      let channel = message.mentions.channels.first()
      let rankroles = ["871487394321412136", "871489471718236190", "871489262514765894", "871487696533606401", "871489838401077318", "871488550200283156", "871489723888197715", "871489942449180722"]
      let prorole = "880114849173098517"
      //console.log(channel)
      if(channel === undefined){
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Channel required!`)
        )
      }

      if(isNaN(gameID)){
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`GameID required!`)
        )
      }

      abc.gameInfo(channel.name, gameID).then(gamData => {
        if (gamData) {
          if (gamData.cancel) {
            gamData.cancel = false
            
            for (let i = 0; i < gamData.team1.length; i++) {
              saveplayers.push(gamData.team1[i])
              saveplayers.push(gamData.team2[i])
            }

            abc.multPlayerInfos(saveplayers).then(allPlayers => {
              for (let i = 0; i < allPlayers.length; i++) {
                for (let k = 0; k < allPlayers[i].result_history.length; k++) {
                  if (typeof allPlayers[i].result_history[k].playedgame != undefined && allPlayers[i].result_history[k].playedgame === gameID) {
                    //console.log(allPlayers[i].userID)
                    if (Math.sign(allPlayers[i].result_history[k].change.points) === 1) {
                      allPlayers[i].wins--
                    } else {
                      allPlayers[i].losses--
                    }
                    allPlayers[i].points -= allPlayers[i].result_history[k].change.points
                    allPlayers[i].rd += Math.abs(allPlayers[i].result_history[k].change.rd)
                    delete allPlayers[i].result_history[k]

                    abc.rankDatarespoi(allPlayers[i].points).then(newRank => {

                      if (newRank.rankpos === allPlayers[i].rank) {

                        abc.fetchMember(message, allPlayers[i].userID).then(member => {
                          if (member.id != message.guild.ownerID) {
                            allPlayers[i].save()
                            member.setNickname(`[${allPlayers[i].points}] ${allPlayers[i].nickname}`).then(() => {
                              setTimeout(function() {

                              }, 500);
                            })
                          } else {
                            allPlayers[i].save()
                          }
                        }).catch(error => console.log('fetch error'));
                      } else {

                        abc.fetchMember(message, allPlayers[i].userID).then(member => {
                          if (member.id != message.guild.ownerID) {

                            allPlayers[i].rank = newRank.rankpos
                            allPlayers[i].save()

                            member.setNickname(`[${allPlayers[i].points}] ${allPlayers[i].nickname}`).then(() => {
                              setTimeout(function() {

                              }, 500);
                              member.roles.remove(rankroles).then(() => {
                                setTimeout(function() {

                                }, 500);
                                member.roles.add(newRank.rolerank)

                                if (allPlayers[i].rank >= 3) {
                                                                   
                                  member.roles.add(prorole).then(() => {

                                  }).catch(error => console.log('prorole error'))
                                  
                                } else {

                                  member.roles.remove(prorole).then(() => {

                                  }).catch(error => console.log('prorole error'))

                                }
                              })
                            })
                          } else {
                            allPlayers[i].rank = newRank.rankpos
                            allPlayers[i].save()

                            member.roles.remove(rankroles).then(() => {
                              setTimeout(function() {

                              }, 500);
                              member.roles.add(newRank.rolerank)
                            })
                          }
                        }).catch(error => console.log('fetch error'));
                      }
                    })
                  } 
                }
              }
              message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Game #${gamData.gamenumber} reverted!`)
              )
            }).then(() => {
              gamData.save()
            })
          } else {
            message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`Game is not resulted or cancelled!`)
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
    } catch (e) {
      console.log(String(e.stack).bgRed)   
    }
  }
}
