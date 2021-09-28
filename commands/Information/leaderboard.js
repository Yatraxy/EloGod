const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");
const userdata = require("../../models/userdata.js");
const mongoose = require("mongoose");
const { multPlayerInfo } = require("../../handlers/rfunctions");
module.exports = {
    name: "lb",
    category: "Information",
    aliases: ["i"],
    cooldown: 2,
    usage: "say <TEXT>",
    description: "Resends your Text",
    run: async(client, message, args, user, text, prefix) => {
        try {
            let meChannel = message.channel

            if (meChannel.name === "info") {
                abc.leaderBoard().then(playerTop => {

                    message.channel.send(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`Leaderboard of the best server in the world`)
                        .setDescription(`**1** : ${playerTop[0].nickname} : ${playerTop[0].points} points \n
                                    **2** : ${playerTop[1].nickname} : ${playerTop[1].points} points \n
                                    **3** : ${playerTop[2].nickname} : ${playerTop[2].points} points \n
                                    **4** : ${playerTop[3].nickname} : ${playerTop[3].points} points \n
                                    **5** : ${playerTop[4].nickname} : ${playerTop[4].points} points \n
                                    **6** : ${playerTop[5].nickname} : ${playerTop[5].points} points \n
                                    **7** : ${playerTop[6].nickname} : ${playerTop[6].points} points \n
                                    **8** : ${playerTop[7].nickname} : ${playerTop[7].points} points \n
                                    **9** : ${playerTop[8].nickname} : ${playerTop[8].points} points \n
                                    **10** : ${playerTop[9].nickname} : ${playerTop[9].points} points \n`)
                    )
                })
            } else {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setDescription(`Wrong channel`)).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));

            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred `)
                //.setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */