const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { channelInfo } = require("../../handlers/rfunctions");

module.exports = {
    name: "queue",
    category: "Administration",
    aliases: ["q"],
    cooldown: 2,
    usage: "queue",
    description: "TestQueue",
    run: async(client, message, args, user, text, prefix) => {
        try {
            let channelL = message.channel.name;
            //let existM = [];
            let players = [];



            channelInfo(channelL).then(foundName => {
                if (foundName) {
                    foundName.playerIQ.forEach(element => {
                        players.push(element)
                    });
                    if (foundName.playerIQN === 0) {
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`No players in queue!`)
                        )
                    } else {
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`Players in queue:\n<@${players.join(">\n<@")}>`)
                        )
                    }
                } else {
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`This is not a lobby!`)
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