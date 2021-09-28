const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Userdata = require("../../models/userdata.js");
const abc = require("../../handlers/rfunctions");

module.exports = {
    name: "updateall",
    category: "AdminC",
    aliases: [""],
    cooldown: 2,
    usage: "updateall",
    description: "Admin Only",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, user, text, prefix) => {
    try{
        let cursor = Userdata.find().cursor();
        let i = 0
        let rankroles = ["871487394321412136", "871489471718236190", "871489262514765894", "871487696533606401", "871489838401077318", "871488550200283156", "871489723888197715", "871489942449180722"]
        let prorole = "880114849173098517"

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            setTimeout(function() {
            
            }, 1000);
            //abc.rankDatarespoi(doc.points).then(newRank => {
                //doc.rank = newRank.rankpos
                //doc.save()
                //console.log(newRank.rolerank, doc.nickname, "hello")
            if (doc.rank >= 3) {
                
            
                abc.fetchMember(message, doc.userID).then(member => {
                    //if (member.id === message.guild.ownerID) {
                        //member.roles.remove(rankroles)
                        //member.roles.add(newRank.rolerank)
                        
                        //member.roles.add(newRank.rolerank)
                    //} else {

                        //console.log(newRank.rolerank, doc.nickname, "helloo234")

                        //member.setNickname(`[${doc.points}] ${doc.nickname}`).then(() => {
                            setTimeout(function() {
            
                            }, 500);
                            //member.roles.remove(rankroles).then(() => {
                                //setTimeout(function() {
            
                                //}, 500);
                            member.roles.add(prorole)
                            //})
                            //member.roles.add(newRank.rolerank)
                            
                        //})
                        
                                            
                        
                    //}
                }).catch(error => console.log('fetch error'));

              
            }
            //}).catch(error => console.log(doc.nickname, "errorrrr")) 
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
            //.setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}