const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Channeldata = require("../../models/channeldata.js");

module.exports = {
    name: "map",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "map",
    description: "TestMap",
    memberpermissions: ["MANAGE_ROLES"],
    run: async (client, message, args, user, text, prefix) => {
    try{
        let channelL = message.channel.name;

        Channeldata.findOne({
            channelname: channelL
        }, (err, foundName) => {
            if(foundName){
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Map: ${foundName.maps.join(" - ")}`)
                )
            }else{
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`It is not a Lobby`)
                )
            }
        })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}