const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const ban = require("../../models/ban.js");
const abc = require("../../handlers/rfunctions");
const mongoose = require("mongoose");
const moment = require('moment');
const { playerban } = require("../../handlers/rfunctions");
module.exports = {
    name: "ban",
    category: "Administration",
    aliases: ["b", "fdp", "hrsn"],
    cooldown: 2,
    usage: "ban <duration> [reason]",
    description: "Ban in your ass fdp",
    memberpermissions: ["MANAGE_ROLES"],
    run: async(client, message, args, user, text, prefix) => {
        try {
            const userduration = message.content.split(' ');
            let player = message.mentions.users.first();
            let reasondesc = "";
            // removing the type ban "day hour minutes"
            if (userduration.length > 2) {


                let removeTypeBan = userduration[2].substring(0, userduration[2].length - 1);
                let duration = parseInt(removeTypeBan)
                    // taking the type of the ban 
                let setTypeBan = userduration[2].slice(parseInt(userduration[2].length - 1))

                // console.log(setTypeBan)
                // console.log(removeTypeBan)



                if (isNaN(removeTypeBan) === true) {
                    message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`❌ ERROR | An error occurred`)
                        .setDescription(`\`\`\`${removeTypeBan} is not a number\`\`\``));

                } else {
                    // Taking the reason out of the string
                    reasondesc = userduration.slice(0, 0).concat(userduration.slice(3, userduration.length))
                    if (reasondesc.length === 0) {
                        reasondesc = 'No reason'
                    } else {
                        reasondesc = reasondesc.join(" ")
                    }

                    // calculating the ban
                    if (setTypeBan === "d" || setTypeBan === "D") {
                        var banDate = moment().add(parseInt(duration), 'd');
                        let remainingDate = moment();
                        let difference = banDate.diff(remainingDate, 'd') + 1;

                        //console.log(remainingDate);
                        //console.log(banDate);
                        //console.log(difference);

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> banned from joining games until: ${moment(banDate).format(' DD MMMM YYYY, HH:mm:ss ')}reason: ${reasondesc}`))


                    }
                    if (setTypeBan === "h" || setTypeBan === "H") {
                        var banDate = moment().add(parseInt(duration), 'h');
                        let remainingDate = moment();
                        let difference = banDate.diff(remainingDate, 'h') + 1;

                        //console.log(remainingDate);
                        //console.log(banDate);
                        //console.log(difference);

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> banned from joining games until: ${moment(banDate).format(' DD MMMM YYYY, HH:mm:ss ')}reason :${reasondesc}`))


                    }
                    if (setTypeBan === 'm' || setTypeBan === "M") {
                        var banDate = moment().add(parseInt(duration), 'm');
                        let remainingDate = moment();
                        let difference = banDate.diff(remainingDate, 'm') + 1;

                        //console.log(remainingDate);
                        //console.log(banDate);
                        //console.log(difference);

                        message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setDescription(`<@${player.id}> banned from joining games until: ${moment(banDate).format(' DD MMMM YYYY, HH:mm:ss ')} reason : ${reasondesc}`))

                    };

                    //console.log(userduration)
                        // console.log(reasondesc)

                    abc.playerban(player.id).then(playerBan => {
                        if (playerBan) {
                            playerBan.ban = moment(banDate).utc(2)
                            playerBan.save()
                            console.log('old ban')

                        } else {
                            console.log('new ban')
                            newBan = new ban({
                                _id: mongoose.Types.ObjectId(),
                                player: player.id,
                                ban: moment(banDate).utc(2),
                                reason: reasondesc,

                            });
                            newBan.save();
                        }

                    })
                }
            } else {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setDescription(`You have to set a duration`))

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

// /** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */