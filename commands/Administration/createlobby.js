const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Channeldata = require("../../models/channeldata.js");
const Gamedata = require("../../models/gamedata.js");
const mongoose = require("mongoose");

module.exports = {
    name: "createlobby",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "crl",
    description: "TestCreatelobby",
    memberpermissions: ["ADMINISTRATOR"],
    run: async(client, message, args, user, text, prefix) => {
        try {
            let channelN = message.content.split(' ');
            let channelC = message.guild;

            Channeldata.findOne({
                channelname: channelN[1]
            }, (err, foundName) => {
                if (!foundName) {
                    channelC.channels.create(channelN[1]).then(channel => {
                            let category = channelC.channels.cache.find(c => c.name == "RANKED TOUCHDOWN" && c.type == "category");
                            channel.setParent(category.id);
                        })
                        //error for playernumber
                    const newChanneldata = new Channeldata({
                        _id: mongoose.Types.ObjectId(),
                        channelname: channelN[1],
                        teamyes: false,
                        multiplier: 1,
                        pickmode: 1,
                        playerPT: parseInt(channelN[2]),
                        captainPO: 1,
                        gamenb: 1,
                    });
                    newChanneldata.save();

                    newGamedata = new Gamedata({
                        _id: mongoose.Types.ObjectId(),
                        gamenumber: 1,
                        channelname: channelN[1],
                        players: undefined,
                        team1: undefined,
                        team2: undefined,
                        cancel: false,
                    });
                    newGamedata.save();

                    message.channel.send(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`Created Channel and Lobby ${channelN[1]} with ${channelN[2]} Players!`)
                    )
                    user = null;
                } else {
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`Wrong Wrong Wrong!`)
                    )
                    user = null;
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