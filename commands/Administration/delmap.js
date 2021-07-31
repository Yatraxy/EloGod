const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Channeldata = require("../../models/channeldata.js");

module.exports = {
    name: "delmap",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "delmap",
    description: "TestDelmap",
    run: async (client, message, args, user, text, prefix) => {
    try{
        let channelN = message.content.split(' ');
        let channelL = message.channel.name;
        let existM = [];
        let nFoundM = [];

        channelN = channelN.slice(0, 0).concat(channelN.slice(0 + 1, channelN.length))

        Channeldata.findOne({
            channelname: channelL
        }, (err, foundName) => {
            if(foundName){
                channelN.forEach(element => {
                    if (foundName.maps.includes(element)) {
                        foundName.maps.pull(element);
                        existM.push(element);
                    } else {
                        nFoundM.push(element);
                    }
                });
                foundName.save();
                //foundName.maps.set({
                    //$each: [channelN]
                //});
            
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Removed: ${existM.join(" - ")}\n\nNot found: ${nFoundM.join(" - ")}`)
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