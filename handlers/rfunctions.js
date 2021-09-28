const { MessageEmbed, ReactionCollector } = require("discord.js");
const Userdata = require("../models/userdata.js");
const Usereventdata = require("../models/usereventdata.js");
const Channeldata = require("../models/channeldata.js");
const Gamedata = require("../models/gamedata.js");
const ban = require('../models/ban.js');
const Clan = require('../models/clan.js')
const moment = require("moment");
const rank = require('../models/rank.js')
const gamedata = require("../models/gamedata.js");
const ee = require("../botconfig/embed.json");

module.exports = {
    updateNickname: async function(player) {
        try {
            const fPlayer = await Userdata.findOne({ userID: player });

            return fPlayer;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    findPlayer: async function(player) {
        try {
            let pReg;

            const fPlayer = await Userdata.findOne({ userID: player });

            if (fPlayer) {
                pReg = true;
            } else {
                pReg = false;
            }
            return pReg;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    findEventPlayer: async function(player) {
        try {
            let pReg;

            const fPlayer = await Usereventdata.findOne({ userID: player });

            if (fPlayer) {
                pReg = true;
            } else {
                pReg = false;
            }
            return pReg;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    playerInfo: async function(player) {
        try {
            //let pInfo;

            const pStats = await Userdata.findOne({ userID: player });

            return pStats;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    clanInfo: async function(playersID) {
        try {
            const cStats = await Clan.find({ players: { userID: playersID } })

            return cStats
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    multPlayerInfo: async function(players) {
        try {
            const multPlayer = await Userdata.find({ userID: { $in: players } }).select({ "userID": 1, "points": 1, "_id": 0 });

            return multPlayer;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    multPlayerInfos: async function(players) {
        try {
            const multPlayer = await Userdata.find({ userID: { $in: players } });
            //let objmultPlayer = multPlayer.map(function(doc) {return doc.toObject();})
            return multPlayer;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    findChannel: async function(channel) {
        try {
            let chFound;

            const fChannel = await Channeldata.findOne({ channelname: channel });

            if (fChannel) {
                chFound = true;
            } else {
                chFound = false;
            }
            return chFound;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    channelInfo: async function(channel) {
        try {
            //let chFound;

            const fChannel = await Channeldata.findOne({ channelname: channel });

            return fChannel;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    findGame: async function(channel, gamenr) {
        try {
            let gaFound;

            const fGame = await Gamedata.findOne({ channelname: channel, gamenumber: gamenr });

            if (fGame) {
                gaFound = true;
            } else {
                gaFound = false;
            }
            return gaFound;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    gameInfo: async function(channel, gamenr) {
        try {
            //let gaFound;

            const fGame = await Gamedata.findOne({ channelname: channel, gamenumber: gamenr });

            return fGame;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    elocheck: function(playerStat, playerIQ) {
        try {
            //let te1 = []
            //let te2 = []            
            let pairs = []
            let teamArr = []
            let finalTeam = []
            let check = false
            let nb1 = 0;
            let nb2 = 0;
            let finalNumber1 = null;
            let finalNumber2 = null;
            let diffbeTeams;
            let loopforteam = 0;

            if (playerStat.length === 4) {
                for (var i = 0; i < playerStat.length - 1; i++) {
                    for (let j = i + 1; j < playerStat.length; j++) {
                        pairs.push([playerStat[i], playerStat[j]]);
                    }
                }
                for (let i = 0; i < pairs.length - 1; i++) {
                    for (let k = i + 1; k < pairs.length; k++) {
                        for (let j = 0; j < pairs[0].length; j++) {
                            if (pairs[i][j].userID === pairs[k][0].userID | pairs[i][j].userID === pairs[k][1].userID) {
                                //console.log(pairs[k])
                                check = false
                                break;
                            } else {
                                check = true
                            }

                        }
                        if (check) {
                            teamArr.push(pairs[i], pairs[k])
                        }
                    }
                }
            } else if (playerStat.length === 6) {
                for (var i = 0; i < playerStat.length - 2; i++) {
                    for (let j = i + 1; j < playerStat.length - 1; j++) {
                        for (let k = j + 1; k < playerStat.length; k++) {
                            pairs.push([playerStat[i], playerStat[j], playerStat[k]]);
                        }
                    }
                }
                //console.log(pairs.length, " aaaaaaa")
                for (let i = 0; i < pairs.length - 1; i++) {
                    for (let k = i + 1; k < pairs.length; k++) {

                        for (let j = 0; j < pairs[0].length; j++) {
                            if (pairs[i][j].userID === pairs[k][0].userID | pairs[i][j].userID === pairs[k][1].userID | pairs[i][j].userID === pairs[k][2].userID) {
                                //console.log(pairs)
                                check = false
                                break;
                            } else {
                                check = true
                            }
                        }
                        if (check) {
                            teamArr.push(pairs[i], pairs[k])
                        }
                    }
                }
            } else if (playerStat.length === 8) {
                for (var i = 0; i < playerStat.length - 3; i++) {
                    for (let j = i + 1; j < playerStat.length - 2; j++) {
                        for (let k = j + 1; k < playerStat.length - 1; k++) {
                            for (let h = k + 1; h < playerStat.length; h++) {
                                pairs.push([playerStat[i], playerStat[j], playerStat[k], playerStat[h]]);
                            }
                        }
                    }
                }
                for (let i = 0; i < pairs.length - 1; i++) {
                    for (let k = i + 1; k < pairs.length; k++) {

                        for (let j = 0; j < pairs[0].length; j++) {
                            if (pairs[i][j].userID === pairs[k][0].userID | pairs[i][j].userID === pairs[k][1].userID | pairs[i][j].userID === pairs[k][2].userID | pairs[i][j].userID === pairs[k][3].userID) {
                                check = false
                                break;
                            } else {
                                check = true
                            }
                        }
                        if (check) {
                            teamArr.push(pairs[i], pairs[k])

                        }
                    }
                }
            }

            let team1Points = 0;
            let team2Points = 0;
            let teamDiff = []
            let count = 0;
            //console.log(teamArr.length);
            for (let i = 0; i < teamArr.length; i += 2) {
                for (let k = 0; k < teamArr[0].length; k++) {
                    team1Points += teamArr[i][k].points;
                    team2Points += teamArr[i + 1][k].points;
                    /*if ((i % 2) === 0) {
                        // console.log(teamArr)
                        nb1 += teamArr[i][k].points
                    } else {
                        nb2 += teamArr[i][k].points
                    }*/
                }
                diffbeTeams = Math.abs(team1Points - team2Points);
                teamDiff.push([diffbeTeams, i, i + 1]);
                //console.log(teamDiff[count])
                count++;
                //loopforteam +=2;
                team1Points = 0;
                team2Points = 0;
                /*if ((i % 2) === 1) {
                    if (finalNumber1 === null) {
                        finalNumber1 = [{ pointdiff: Math.abs(nb1 - nb2), team1: loopforteam, team2: loopforteam + 1 }]
                        nb1 = 0;
                        nb2 = 0;
                        // console.log(finalNumber1, 'number1')

                        loopforteam += 2
                    } else if (finalNumber2 === null) {
                        finalNumber2 = [{ pointdiff: Math.abs(nb1 - nb2), team1: loopforteam, team2: loopforteam + 1 }]
                        nb1 = 0;
                        nb2 = 0;
                        // console.log(finalNumber2, 'number2')

                        loopforteam += 2
                    }
                    if (finalNumber1 != null && finalNumber2 != null) {
                        diffbeTeams = Math.min(finalNumber1[0].pointdiff, finalNumber2[0].pointdiff)

                        if (diffbeTeams === finalNumber1[0].pointdiff) {
                            finalTeam.length = 0
                            finalTeam.push(teamArr[finalNumber1[0].team1], teamArr[finalNumber1[0].team2])
                            finalNumber1 = null;
                        } else if (diffbeTeams === finalNumber2[0].pointdiff) {
                            finalTeam.length = 0
                            finalTeam.push(teamArr[finalNumber2[0].team1], teamArr[finalNumber2[0].team2])
                            finalNumber2 = null;
                        }
                    }
                }*/
            }
            let minDiff = 999999;
            let team1idx = 0;
            let team2idx = 0;
            for (let i = 0; i < teamDiff.length; i++) {
                if (minDiff > teamDiff[i][0]) {
                    minDiff = teamDiff[i][0];
                    team1idx = teamDiff[i][1];
                    team2idx = teamDiff[i][2];
                }
            }
            //console.log(minDiff)
            finalTeam.push(teamArr[team1idx], teamArr[team2idx]);
            //console.log(teamArr)
            //console.log(finalTeam, 'last team picked')
            return finalTeam;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },

    playerban: async function(playerID) {
        try {
            let pbann;

            const playerIsBan = await ban.findOne({ player: playerID });

            // if (playerIsBan) {
            //     pbann = true;
            // } else {
            //     pbann = false;
            // }
            return playerIsBan;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    leaderBoard: async function() {
        try {
            const playerdata = await Userdata.find({}).sort({ points: 'desc' });

            return playerdata;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    getAllRank: async function() {
        try {
            const allrank = await rank.find({}).sort({});

            return allrank;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },

    reactChange: async function(gameRdyMsg, playersIG, mapYE, gnb, msg) {
        try {
            let tf = false
            let ft = true
            let removecol = false
            let usersReacted = []
            let mapchange
            gameRdyMsg.react('🔥')
                //console.log(playersIG, " a")

            const filter = async(reaction, user) => {
                for (let i = 0; i < playersIG.length; i++) {
                    if (reaction.emoji.name === '🔥' && user.id === playersIG[i]) {
                        //console.log(usersReacted, " usersRe2")

                        let inde = usersReacted.indexOf(playersIG[i])
                        if (inde > -1) {
                            //console.log(usersReacted, " usersRe11551")
                            usersReacted.splice(inde, 1)
                            break
                        }

                        //console.log(user.id, " user.id")
                        //console.log(playersIG[i], " playerIG")
                        usersReacted.push(playersIG[i])
                        ft = true
                        removecol = false
                        return true
                    } else if (user.id === '844486638931542018') {
                        return true
                    } else {
                        ft = false
                        removecol = true
                    }
                }
                if (!ft) {
                    reaction.users.remove(user.id)
                    removecol = true
                    return false
                }

            };

            const collector = gameRdyMsg.createReactionCollector(filter, { time: 300000 });

            collector.on('collect', async(reaction, user) => {

                //if (collected.find(user.id)) {
                //removecol = true
                //}
                //if (removecol) {
                //collection.delete(user.id);
                //console.log('deleted')
                //}

                //collector.stop(playersIG.length)
                // console.log(usersReacted, " usersRe")
                if (usersReacted.length >= 6) {
                    tf = true
                    collector.stop('yes')
                } else if (usersReacted.length === (playersIG.length - 1)) {
                    tf = true
                    collector.stop('yes')
                }

                //console.log("w")
                //console.log(collector, " asdwqwdqwd")
                //console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                //console.log('size')
            })


            collector.on('end', async(collected, reason) => {
                if (reason && reason === 'yes') {
                    msg.channel.send(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`New Map for Game **#${gnb}** is **${mapYE}**`)
                    )
                } else {
                    tf = false
                        //console.log(`Collected ${collected.size} items adsasdadad`);
                        //console.log("fml")
                }

            })


        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    },
    cancelGame: async function(channel, gamenr) {
        try {
            let gaFound;

            const fGame = await Gamedata.findOne({ channelname: channel, gamenumber: gamenr });

            return fGame;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    teamResult: function(teams, gamenb, rating_period, system_constant) {
        try {
            var players = [];


            Array.prototype.each = function(callback) {
                var arr = this;
                for (var i = 0; i < arr.length; i++) {
                    var el = arr[i];
                    if (typeof(el) != 'function')
                        callback(el, i);
                }
            }

            Object.prototype.each = function(callback) {
                var obj = this;
                for (var key in obj) {
                    var el = obj[key];
                    if (typeof(el) != 'function')
                        callback(el, key);
                }
            }

            teams.each(function(team, t1) {
                team.players.each(function(p) {
                    players.push(p);
                    var num_players = team.players.length;


                    //have the player play against all other teams
                    var opponents = [];
                    //round up opponents
                    teams.each(function(team2, t2) {
                        if (t2 == t1)
                            return; //same team as player p
                        if ((!team2.players) || (!(team2.players.length > 0)))
                            return; //no players on team

                        //console.log(team, " t1", team2, " t2")
                        var team_as_player = { rd: 0, points: 0, vol: 0, rd2: 0, points2: 0, s: 0 };
                        team2.players.each(function(p2) {
                            team_as_player.each(function(val, key) {
                                team_as_player[key] += p2[key];
                            });
                        });
                        //team as player has the sum of all players, now 
                        //need to devide to average it all out.
                        team_as_player.each(function(val, key) {
                            team_as_player[key] = val / team2.players.length;
                        });
                        team_as_player.s = sFromRank(team, team2);
                        opponents.push(team_as_player);
                    });
                    //
                    var result = calcResult(p, opponents, null, null, null, gamenb);
                    //console.log(result, " result")
                    if (!p.result_history)
                        p.result_history = [];
                    p.result_history.push(result);
                    p.last_result = result;

                    //console.log(p.result_history, "result1")
                    //console.log(p.last_result, "result")
                });
            });

            players.each(function(p) {
                //console.log(p.last_result[0].update, "asdwasdsaaaaaaaaaaaa")
                var update = p.last_result[0].update;
                update.each(function(val, key) {
                    p[key] = val;
                });
            });

            return { teams: teams, players: players };
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    rankData: async function(place) {
        try {
            const rrank = await rank.findOne({ rankpos: place });

            return rrank;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    rankPoints: async function(points) {
        try {
            const rrank = await Rank.findOne({ starting: points })
            return rrank;
        } catch (e) {
            console.log(String(e.stack).bgRed)

        }
    },
    rankDatarespoi: async function(points) {
        try {
            let rrank;
            if (points <= 1499) {
                rrank = await rank.findOne({ starting: 0 });
            } else if (points >= 1500 && points <= 1999) {
                rrank = await rank.findOne({ starting: 1500 });
            } else if (points >= 2000 && points <= 2499) {
                rrank = await rank.findOne({ starting: 2000 });
            } else if (points >= 2500 && points <= 2999) {
                rrank = await rank.findOne({ starting: 2500 });
            } else if (points >= 3000 && points <= 3499) {
                rrank = await rank.findOne({ starting: 3000 });
            } else if (points >= 3500 && points <= 6999) {
                rrank = await rank.findOne({ starting: 3500 });
            } else if (points >= 7000 && points <= 9999) {
                rrank = await rank.findOne({ starting: 7000 });
            } else if (points >= 10000) {
                rrank = await rank.findOne({ starting: 10000 });
            }

            return rrank;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
    fetchMember: async function(message, userid) {
        try {
            const memba = await message.guild.members.fetch(userid)

            return memba;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    },
}

function calcResult(player, opponents, rating_period, system_constant, factor, gamenb) {
    try {
        //console.log(player, " player", opponents, "opppooo")
        var pow = Math.pow;
        var pi = Math.PI;

        var debug = function(v) {
            console.log(JSON.stringify(v));
        }


        Array.prototype.each = function(callback) {
            var arr = this;
            for (var i = 0; i < arr.length; i++) {
                var el = arr[i];
                if (typeof(el) != 'function')
                    callback(el, i);
            }
        }

        Object.prototype.each = function(callback) {
            var obj = this;
            for (var key in obj) {
                var el = obj[key];
                if (typeof(el) != 'function')
                    callback(el, key);
            }
        }

        //set defaults
        let min = 60;
        let hour = 60 * min;
        let day = 24 * hour;
        if (!rating_period)
            rating_period = day * 30;
        let t = system_constant;
        let lfactor;
        if (player.rank === 1 | player.rank === 2 | player.rank === 3) {
            factor = 0.3;
            lfactor = 2;
        } else if (player.rank === 4) {
            factor = 0.26;
            lfactor = 1.8;
        } else if (player.rank === 5) {
            factor = 0.22;
            lfactor = 1.6;
        } else if (player.rank === 6) {
            factor = 0.18;
            lfactor = 1.4;
        } else if (player.rank === 7) {
            factor = 0.14;
            lfactor = 1.2;
        } else if (player.rank === 8) {
            factor = 0.1;
            lfactor = 1;
        }
        //step 1
        //initialize
        if (!t)
            t = 0.2;

        //p will be the returned object with the updated values for the player
        let p = {};
        p.points = player.points;
        p.rd = player.rd;
        p.vol = player.vol;
        p.rd2 = player.rd2;
        p.points2 = player.points2;

        let out = { update: {}, change: {}, init: { points: p.points, rd: p.rd, vol: p.vol } };

        //step 3
        let g = function(rd) {
            return 1 / (
                Math.sqrt(
                    1 + (
                        (3 * pow(rd, 2)) /
                        (pow(pi, 2))
                    )
                )
            );
        };
        //console.log(" 3")
        //the paper has three values comming in for the two players, this just takes the player objects
        var E = function(p1, p2) {
                if (!p1.rd2)
                    console.log("Missing player 1");
                if (!p2.rd2)
                    console.log("Missing player 2" + p2.rd2);

                return 1 / (1 + Math.exp((-g(p2.rd2) * (p1.points2 - p2.points2))));
            }
            //console.log(" 4")
            //iterate over all opponents he played against to calculate variance
        var v_sum = 0;
        opponents.each(function(opp) {
            var this_v = (pow(g(opp.rd2), 2)) * E(p, opp) * (1 - E(p, opp));
            v_sum += this_v;
        });
        var v = pow(v_sum, -1);
        //console.log(" asasdasd5555")
        //step 4
        var part_delta_sum = 0;
        opponents.each(function(opp) {
            var this_delta_part = g(opp.rd2) * (opp.s - E(p, opp))
            part_delta_sum += this_delta_part;
        });
        //console.log(" 5")
        //delta is the change in rating
        var delta = v * part_delta_sum;

        //step 5
        //5.1
        var a = ln(pow(p.vol, 2));
        var f = function(x) {
            return (
                (Math.exp(x) * (pow(delta, 2) - pow(p.rd2, 2) - v - Math.exp(x))) /
                (
                    2 * pow(
                        (pow(p.rd2, 2) + v + Math.exp(x)),
                        2)
                )
            ) - (
                (x - a) / (pow(t, 2))
            )
        }
        var e = 0.000001; //convergence tolerance
        //console.log(" 6")
        //5.2
        var A = a;
        if (pow(delta, 2) > (pow(p.rd2, 2) + v)) {
            var B = ln(pow(delta, 2) - pow(p.rd2, 2) - v);
        } else {
            var k = 1;
            while (f(a - (k * Math.abs(t))) < 0) {
                k = k + 1;
            }
            var B = a - k * Math.abs(t);
        }
        //console.log(" 7")
        //5.3
        fa = f(A);
        fb = f(B);

        //5.4
        while ((Math.abs(B - A) > e)) {
            var C = A + (A - B) * fa / (fb - fa);
            fc = f(C);
            if ((fc * fb) < 0) {
                A = B;
                fa = fb;
            } else {
                fa = fa / 2;
            }
            B = C;
            fb = fc;
        }
        var vol_prime = Math.exp(A / 2);

        //Step 6
        var rd2_star = Math.sqrt(Math.pow(p.rd2, 2) + Math.pow(vol_prime, 2));
        //Step 7
        var rd2_prime = 1 / (
            Math.sqrt(
                ((1 / (Math.pow(rd2_star, 2))) + 1 / v)
            ));

        var points2_prime_sum = 0;
        opponents.each(function(opp) {
            var sum_el = g(opp.rd2) * (opp.s - E(p, opp));
            points2_prime_sum += sum_el;
        });
        var points2_prime = p.points2 + pow(rd2_prime, 2) * points2_prime_sum;
        //console.log(" 10")
        //lets track changes to player
        p.points2 = points2_prime;
        p.rd2 = rd2_prime;
        p.vol = vol_prime;
        //console.log(" 11")
        //step 8 convert back to original scale
        p.points = p.points2 * 173.7178 + 1500;
        p.rd = p.rd2 * 173.7178;

        if (Math.sign(p.points - out.init.points) === 1) {
            if ((p.points - out.init.points) * factor <= 15) {
                out.change.points = 15;
            } else if ((p.points - out.init.points) * factor >= 40) {
                out.change.points = 40;
            } else {
                out.change.points = Math.floor((p.points - out.init.points) * factor);
            }

        } else {
            if (((p.points - out.init.points) * factor) / lfactor <= -40) {
                out.change.points = -40;
            } else if (((p.points - out.init.points) * factor) / lfactor >= -15) {
                out.change.points = -15;
            } else {
                out.change.points = Math.floor(((p.points - out.init.points) * factor) / lfactor);
            }

        }

        out.change.rd = (p.rd - out.init.rd) * factor;
        out.change.vol = (out.init.vol - p.vol) //*factor;
            //console.log(" 9")
        out.update.points = out.change.points + out.init.points;
        out.update.rd = out.change.rd + out.init.rd;
        out.update.vol = (out.init.vol - p.vol);
        out.playedgame = gamenb;
        //console.log(out, " aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        return out;

    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
}

function sFromRank(p, p2) {
    try {
        if (p2.wl < p.wl)
            return 0;
        if (p2.wl == p.wl)
            return .5;
        return 1;
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
}

function ln(val) {
    return Math.log(val) / Math.LOG10E;
}