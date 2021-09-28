const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { channelInfo } = require("../../handlers/rfunctions");

module.exports = {
    name: "clearqueue",
    category: "Administration",
    aliases: ["cq"],
    cooldown: 2,
    usage: "queue",
    description: "TestQueue",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {
            let channelL = message.channel.name;


            channelInfo(channelL).then(foundName => {
                if (foundName) {
                    foundName.playerIQ = []
                    foundName.playerIQN = 0
                    foundName.save()
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`Queue cleared!`)
                    )
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
            /*return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );*/
        }
    }
}