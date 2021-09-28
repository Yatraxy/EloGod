const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Userdata = require("../../models/userdata.js");

module.exports = {
    name: "res",
    category: "AdminC",
    aliases: [""],
    cooldown: 2,
    usage: "res",
    description: "Admin Only",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, user, text, prefix) => {
    try{
        let cursor = Userdata.find().cursor();
        let i = 0

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
          doc.rd = 360
          doc.vol = 0.06
          doc.save()
          i++
        }

        

        message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Players changed ${i}`)
        )

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