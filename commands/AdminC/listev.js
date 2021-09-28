const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const fs = require('fs')
const Json2csvParser = require('json2csv').Parser
const Usereventdata = require('../../models/usereventdata.js')

module.exports = {
    name: "listev",
    category: "AdminC",
    aliases: [""],
    cooldown: 2,
    usage: "listeV",
    description: "Admin Only",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, user, text, prefix) => {
    try{
        let cursor = Usereventdata.find().cursor();
        let i = 0
        let allMembers = []

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
          let member = {
                Name: doc.nickname,
                Tag: doc.dctag,
                UserID: doc.userID,
            }
            allMembers.push(member)
            i++
        }

        const json2csvParser = new Json2csvParser()
        const csv = json2csvParser.parse(allMembers)
        fs.writeFileSync(`./UserEventList_audit.csv`, csv, {flag: 'w'}, function(err){
            if (err) consoleLog('Error saving CSV file:' + err.message, "ERR")
        })

        const attachment = new MessageAttachment('./UserEventList_audit.csv')
        message.channel.send(`Participants ${i}`, attachment)
        
        
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