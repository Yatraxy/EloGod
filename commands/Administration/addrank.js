const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const abc = require("../../handlers/rfunctions");
const rank = require("../../models/rank.js");
const mongoose = require("mongoose");
module.exports = {
    name: "addrank",
    category: "Administration",
    aliases: ["adr"],
    cooldown: 2,
    usage: "addrank @Role position(1st,2nd... ( lower to highest ), starting points",
    description: "Setting/modify rank",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {
            const rankmsg = message.content.split(' ');
            let rankrole = message.mentions.roles.first()
            let position = parseInt(rankmsg[2])
            let rankpoint = parseInt(rankmsg[3])
            console.log(rankmsg)
            console.log(position, '1')

            abc.rankData(position).then(rankd => {
                console.log(rankd, 'rankd')
                if (rankd === undefined || rankd === null) {
                    console.log(position, '2')
                    newrank = new rank({
                        _id: mongoose.Types.ObjectId(),
                        rolename: rankrole.name,
                        rankpos: position,
                        rolerank: rankrole.id,
                        starting: rankpoint,
                    });
                    newrank.save()
                } else {
                    console.log(position, '3')
                    rankd.rankpos = position
                    rankd.rolerank = rankrole.id
                    rankd.starting = rankpoint
                    rankd.save()
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