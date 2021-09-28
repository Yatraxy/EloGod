const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Userdata = require("../../models/userdata.js");
const Channeldata = require("../../models/channeldata.js");
const Gamedata = require("../../models/gamedata.js");

module.exports = {
    name: "forceleave",
    category: "QueueC",
    aliases: ["fr"],
    cooldown: 2,
    usage: "forceleave",
    description: "TestForceLeave",
    memberpermissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args, user, text, prefix) => {
    try{
        let user = message.mentions.members.first();
        let channelP = message.channel.name;

        Channeldata.findOne({
            channelname: channelP
        }, (errr, foundChannel) => {
            if (foundChannel) {
                Userdata.findOne({
                    userID: user.id
                }, (err, foundUser) => {
                    if(foundUser){
                        let isQueue = foundChannel.playerIQ.indexOf(foundUser.userID);
                        if (isQueue != -1) {
                            if (foundChannel.playerIQN <= foundChannel.playerPT) {
                                foundChannel.playerIQ.pull(foundUser.userID)
                                foundChannel.playerIQN --;
                                foundChannel.save()
                                let userM = message.guild.members.cache.find(member => member.id == `${foundUser.userID}`)
                                message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setDescription(`[${foundChannel.playerIQN}/${foundChannel.playerPT}] ${userM} left the queue!`)
                                )
                            } else {
                                message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`There's nothing to leave....`)
                                )
                            }
                        } else {
                            message.channel.send(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`You are not in queue!`)
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