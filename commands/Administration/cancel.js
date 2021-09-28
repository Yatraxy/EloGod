const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions.js")
module.exports = {
    name: "cancel",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "cancel GameNumber",
    description: "cancel game",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {

            let meChannel = message.channel

            let gameNumber = message.content.split(' ')
            gameNumber = parseInt(gameNumber[1])

            if (isNaN(gameNumber)) {
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`GameID must be a number`))
            }

            abc.gameInfo(meChannel.name, gameNumber).then(gamData => {
                if (!gamData) {
                    return message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`There is no game!`)
                    )
                }
                if (!gamData.cancel) {
                    gamData.cancel = true
                    gamData.save()

                    message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`Game #${gamData.gamenumber} is cancelled!`)
                    )
                } else {
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`Game #${gamData.gamenumber} is already cancelled or resulted!`)
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

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */