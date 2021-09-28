const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "size",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "size",
    description: "TestSize",
    memberpermissions: ["MANAGE_ROLES"],
    run: async (client, message, args, user, text, prefix) => {
    try{
        message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(``)
      )
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