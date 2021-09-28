const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { channelInfo } = require("../../handlers/rfunctions");

module.exports = {
    name: "addmap",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "addmap",
    description: "TestAddmap",
    memberpermissions: ["MANAGE_ROLES"],
    run: async (client, message, args, user, text, prefix) => {
    try{
        let channelN = message.content.split(' ');
        let channelL = message.channel.name;
        let existM = [];
        let addedM = [];

        channelN = channelN.slice(0, 0).concat(channelN.slice(0 + 1, channelN.length))

        channelInfo(channelL).then(foundName => {
            if(foundName){
                channelN.forEach(element => {
                    if (!foundName.maps.includes(element)) {
                        foundName.maps.push(element);
                        addedM.push(element);
                    } else {
                        existM.push(element);
                    }
                });
                foundName.save();
            
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Added: ${addedM.join(" - ")}\n\nAlready added: ${existM.join(" - ")}`)
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
            //.setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}